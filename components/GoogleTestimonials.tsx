"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { withBasePath } from "@/lib/paths";
import CustomerPhotoGallery, {
  type CustomerGalleryPhoto,
} from "./CustomerPhotoGallery";
import Container from "./Container";

type GoogleTestimonialsProps = {
  apiKey: string;
  placeQuery: string;
  placeId?: string;
  reviewLimit?: number;
};

type TestimonialReview = {
  authorName: string;
  authorUrl: string | null;
  profilePhotoUrl: string | null;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  time: number | null;
};

type TestimonialsPayload = {
  placeName: string;
  placeUrl: string | null;
  rating: number;
  userRatingsTotal: number;
  fetchedAt: number;
  reviews: TestimonialReview[];
  photos: CustomerGalleryPhoto[];
};

type CacheEnvelope = {
  version: number;
  payload: TestimonialsPayload;
};

type GooglePlaceFindResult = {
  place_id?: string;
};

type GooglePlaceReview = {
  author_name?: string;
  author_url?: string;
  profile_photo_url?: string;
  rating?: number;
  text?: string;
  relative_time_description?: string;
  time?: number;
};

type GooglePlacePhoto = {
  getUrl: (options: { maxWidth?: number; maxHeight?: number }) => string;
};

type GooglePlaceDetails = {
  name?: string;
  url?: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: GooglePlaceReview[];
  photos?: GooglePlacePhoto[];
};

type GooglePlaceV1Review = {
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  text?: {
    text?: string;
  };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

type GooglePlaceV1Details = {
  displayName?: {
    text?: string;
  };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GooglePlaceV1Review[];
  photos?: Array<{
    name?: string;
    authorAttributions?: Array<{
      displayName?: string;
      uri?: string;
    }>;
  }>;
};

type GooglePlaceV1SearchResponse = {
  places?: Array<{
    id?: string;
  }>;
};

type GooglePlacesStatus = {
  OK: string;
};

type GooglePlacesService = {
  findPlaceFromQuery: (
    request: { query: string; fields: string[] },
    callback: (results: GooglePlaceFindResult[] | null, status: string) => void,
  ) => void;
  getDetails: (
    request: { placeId: string; fields: string[] },
    callback: (result: GooglePlaceDetails | null, status: string) => void,
  ) => void;
};

type GooglePlacesNamespace = {
  PlacesServiceStatus: GooglePlacesStatus;
  PlacesService: new (attrContainer: HTMLDivElement) => GooglePlacesService;
};

type GoogleMapsNamespace = {
  places: GooglePlacesNamespace;
};

type GoogleMapsWindow = Window & {
  google?: {
    maps?: GoogleMapsNamespace;
  };
};

const CACHE_VERSION = 2;
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const DEFAULT_REVIEW_LIMIT = 6;
const DEFAULT_PHOTO_LIMIT = 12;
const PHOTO_MAX_WIDTH = 1280;
const PHOTO_MAX_HEIGHT = 960;

let googleMapsScriptPromise: Promise<void> | null = null;

function normalizeReviewText(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim();
}

function sanitizeReviewRating(value: unknown) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, Math.min(5, Math.round(value)));
}

function sanitizeAverageRating(value: unknown) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, Math.min(5, value));
}

function summarizeRating(rating: number) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));
  return { rounded, empty: 5 - rounded };
}

function getCacheValue(cacheKey: string) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(cacheKey);
    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue) as CacheEnvelope;
    if (
      parsedValue.version !== CACHE_VERSION ||
      typeof parsedValue.payload?.fetchedAt !== "number" ||
      !Array.isArray(parsedValue.payload?.reviews)
    ) {
      return null;
    }

    return parsedValue.payload;
  } catch {
    return null;
  }
}

function setCacheValue(cacheKey: string, payload: TestimonialsPayload) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const value: CacheEnvelope = {
      version: CACHE_VERSION,
      payload,
    };
    window.localStorage.setItem(cacheKey, JSON.stringify(value));
  } catch {
    // Ignore write failures (private mode/quota limits).
  }
}

function warmImageCache(reviews: TestimonialReview[], photos: CustomerGalleryPhoto[]) {
  if (typeof window === "undefined") {
    return;
  }

  for (const review of reviews) {
    if (!review.profilePhotoUrl) {
      continue;
    }

    const image = new window.Image();
    image.decoding = "async";
    image.src = review.profilePhotoUrl;
  }

  for (const photo of photos) {
    if (!photo.imageUrl) {
      continue;
    }

    const image = new window.Image();
    image.decoding = "async";
    image.src = photo.imageUrl;
  }
}

function getMapsWindow() {
  if (typeof window === "undefined") {
    return null;
  }

  return window as GoogleMapsWindow;
}

function loadGoogleMapsPlaces(apiKey: string) {
  const mapsWindow = getMapsWindow();
  if (!mapsWindow) {
    return Promise.reject(
      new Error("Google Maps can only load in a browser environment."),
    );
  }

  if (mapsWindow.google?.maps?.places) {
    return Promise.resolve();
  }

  if (googleMapsScriptPromise) {
    return googleMapsScriptPromise;
  }

  googleMapsScriptPromise = new Promise<void>((resolve, reject) => {
    const callbackName = `__wcasGoogleMapsInit_${Math.random()
      .toString(36)
      .slice(2)}`;
    const callbackScope = window as unknown as Record<string, (() => void) | undefined>;
    const existingScript = document.querySelector<HTMLScriptElement>(
      "script[data-google-maps-loader='places']",
    );

    let settled = false;
    const timeout = window.setTimeout(() => {
      handleReject();
    }, 12000);

    const cleanup = () => {
      window.clearTimeout(timeout);
      delete callbackScope[callbackName];
    };

    const handleReject = () => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      googleMapsScriptPromise = null;
      reject(new Error("Failed to load the Google Maps Places library."));
    };

    callbackScope[callbackName] = () => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      resolve();
    };

    if (existingScript) {
      if (mapsWindow.google?.maps?.places) {
        cleanup();
        resolve();
        return;
      }

      existingScript.addEventListener("load", () => {
        existingScript.dataset.loaded = "true";
        const loadedMapsWindow = getMapsWindow();
        if (loadedMapsWindow?.google?.maps?.places) {
          cleanup();
          resolve();
          return;
        }
        handleReject();
      }, { once: true });
      existingScript.addEventListener("error", handleReject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.dataset.googleMapsLoader = "places";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey,
    )}&libraries=places&v=quarterly&callback=${callbackName}`;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
      },
      { once: true },
    );
    script.addEventListener("error", handleReject, { once: true });
    document.head.append(script);
  });

  return googleMapsScriptPromise;
}

const PLACES_V1_FIELD_MASK = [
  "displayName",
  "googleMapsUri",
  "rating",
  "reviews",
  "userRatingCount",
  "photos",
].join(",");

function toEncodedResourcePath(resourceName: string) {
  return resourceName
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");
}

function buildPhotoMediaUrl(photoName: string, apiKey: string) {
  const encodedPath = toEncodedResourcePath(photoName);
  const query = new URLSearchParams({
    key: apiKey,
    maxWidthPx: String(PHOTO_MAX_WIDTH),
    maxHeightPx: String(PHOTO_MAX_HEIGHT),
  });

  return `https://places.googleapis.com/v1/${encodedPath}/media?${query.toString()}`;
}

function parsePlacesApiErrorBody(value: unknown) {
  if (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof value.error === "object" &&
    value.error !== null &&
    "message" in value.error &&
    typeof value.error.message === "string"
  ) {
    return value.error.message;
  }

  return null;
}

async function searchPlaceIdV1(apiKey: string, query: string) {
  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({
      textQuery: query,
      regionCode: "AU",
      languageCode: "en",
    }),
  });

  const responseBody = (await response.json()) as unknown;
  if (!response.ok) {
    const message =
      parsePlacesApiErrorBody(responseBody) ??
      "Google Places search failed. Check your API key and referrer restrictions.";
    throw new Error(message);
  }

  const result = responseBody as GooglePlaceV1SearchResponse;
  const resolvedPlaceId = result.places?.[0]?.id;
  if (typeof resolvedPlaceId === "string" && resolvedPlaceId.trim()) {
    return resolvedPlaceId.trim();
  }

  return null;
}

async function fetchPlaceDetailsV1(apiKey: string, placeId: string) {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": PLACES_V1_FIELD_MASK,
      },
    },
  );

  const responseBody = (await response.json()) as unknown;
  if (!response.ok) {
    const message =
      parsePlacesApiErrorBody(responseBody) ??
      "Unable to load Google reviews from Places API.";
    throw new Error(message);
  }

  return responseBody as GooglePlaceV1Details;
}

function buildPayloadFromV1(
  details: GooglePlaceV1Details,
  reviewLimit: number,
  apiKey: string,
) {
  const reviews = Array.isArray(details.reviews) ? details.reviews : [];
  const photos = Array.isArray(details.photos) ? details.photos : [];

  const normalizedReviews: TestimonialReview[] = reviews
    .map((review) => {
      const rawText = normalizeReviewText(review.text?.text);
      const parsedTime = review.publishTime
        ? Date.parse(review.publishTime)
        : Number.NaN;

      return {
        authorName:
          typeof review.authorAttribution?.displayName === "string" &&
          review.authorAttribution.displayName.trim()
            ? review.authorAttribution.displayName.trim()
            : "Google reviewer",
        authorUrl:
          typeof review.authorAttribution?.uri === "string"
            ? review.authorAttribution.uri
            : null,
        profilePhotoUrl:
          typeof review.authorAttribution?.photoUri === "string"
            ? review.authorAttribution.photoUri
            : null,
        rating: sanitizeReviewRating(review.rating),
        text: rawText || "Rated this service highly on Google.",
        relativeTimeDescription:
          typeof review.relativePublishTimeDescription === "string"
            ? review.relativePublishTimeDescription
            : "Recent review",
        time: Number.isNaN(parsedTime)
          ? null
          : Math.floor(parsedTime / 1000),
      };
    })
    .sort((first, second) => {
      if (second.rating !== first.rating) {
        return second.rating - first.rating;
      }

      return (second.time ?? 0) - (first.time ?? 0);
    })
    .slice(0, reviewLimit);

  const normalizedPhotos: CustomerGalleryPhoto[] = photos
    .map((photo) => {
      if (typeof photo.name !== "string" || !photo.name.trim()) {
        return null;
      }

      const attribution = Array.isArray(photo.authorAttributions)
        ? photo.authorAttributions[0]
        : undefined;

      return {
        imageUrl: buildPhotoMediaUrl(photo.name, apiKey),
        authorName:
          typeof attribution?.displayName === "string"
            ? attribution.displayName
            : null,
        authorUrl:
          typeof attribution?.uri === "string" ? attribution.uri : null,
      } satisfies CustomerGalleryPhoto;
    })
    .filter((photo): photo is CustomerGalleryPhoto => photo !== null)
    .slice(0, DEFAULT_PHOTO_LIMIT);

  return {
    placeName:
      typeof details.displayName?.text === "string" &&
      details.displayName.text.trim()
        ? details.displayName.text.trim()
        : "Google Reviews",
    placeUrl:
      typeof details.googleMapsUri === "string" ? details.googleMapsUri : null,
    rating: sanitizeAverageRating(details.rating),
    userRatingsTotal:
      typeof details.userRatingCount === "number" ? details.userRatingCount : 0,
    fetchedAt: Date.now(),
    reviews: normalizedReviews,
    photos: normalizedPhotos,
  } satisfies TestimonialsPayload;
}

async function resolvePlaceDetails(
  apiKey: string,
  placeQuery: string,
  placeId?: string,
) {
  await loadGoogleMapsPlaces(apiKey);

  const mapsWindow = getMapsWindow();
  const maps = mapsWindow?.google?.maps;
  if (!maps?.places) {
    throw new Error("Google Places is unavailable.");
  }

  const placeService = new maps.places.PlacesService(document.createElement("div"));
  const okStatus = maps.places.PlacesServiceStatus.OK;

  const resolvedPlaceId = placeId?.trim()
    ? placeId.trim()
    : await new Promise<string>((resolve, reject) => {
        placeService.findPlaceFromQuery(
          {
            query: placeQuery,
            fields: ["place_id"],
          },
          (results, status) => {
            if (status !== okStatus || !results?.length || !results[0]?.place_id) {
              reject(new Error("Could not find a Google Maps listing."));
              return;
            }

            resolve(results[0].place_id);
          },
        );
      });

  return new Promise<GooglePlaceDetails>((resolve, reject) => {
    placeService.getDetails(
      {
        placeId: resolvedPlaceId,
        fields: ["name", "rating", "reviews", "url", "user_ratings_total"],
      },
      (result, status) => {
        if (status !== okStatus || !result) {
          reject(new Error("Unable to load Google reviews."));
          return;
        }

        resolve(result);
      },
    );
  });
}

function buildPayload(details: GooglePlaceDetails, reviewLimit: number) {
  const reviews = Array.isArray(details.reviews) ? details.reviews : [];
  const photos = Array.isArray(details.photos) ? details.photos : [];

  const normalizedReviews: TestimonialReview[] = reviews
    .map((review) => {
      const rawText = normalizeReviewText(review.text);
      const text = rawText || "Rated this service highly on Google.";

      return {
        authorName:
          typeof review.author_name === "string" && review.author_name.trim()
            ? review.author_name.trim()
            : "Google reviewer",
        authorUrl:
          typeof review.author_url === "string" ? review.author_url : null,
        profilePhotoUrl:
          typeof review.profile_photo_url === "string"
            ? review.profile_photo_url
            : null,
        rating: sanitizeReviewRating(review.rating),
        text,
        relativeTimeDescription:
          typeof review.relative_time_description === "string"
            ? review.relative_time_description
            : "Recent review",
        time: typeof review.time === "number" ? review.time : null,
      };
    })
    .sort((first, second) => {
      if (second.rating !== first.rating) {
        return second.rating - first.rating;
      }

      return (second.time ?? 0) - (first.time ?? 0);
    })
    .slice(0, reviewLimit);

  const normalizedPhotos: CustomerGalleryPhoto[] = photos
    .flatMap((photo) => {
      try {
        const imageUrl = photo.getUrl({
          maxWidth: PHOTO_MAX_WIDTH,
          maxHeight: PHOTO_MAX_HEIGHT,
        });

        return [
          {
            imageUrl,
            authorName: null,
            authorUrl: null,
          } satisfies CustomerGalleryPhoto,
        ];
      } catch {
        return [];
      }
    })
    .slice(0, DEFAULT_PHOTO_LIMIT);

  return {
    placeName:
      typeof details.name === "string" && details.name.trim()
        ? details.name.trim()
        : "Google Reviews",
    placeUrl: typeof details.url === "string" ? details.url : null,
    rating: sanitizeAverageRating(details.rating),
    userRatingsTotal:
      typeof details.user_ratings_total === "number"
        ? details.user_ratings_total
        : 0,
    fetchedAt: Date.now(),
    reviews: normalizedReviews,
    photos: normalizedPhotos,
  } satisfies TestimonialsPayload;
}

export default function GoogleTestimonials({
  apiKey,
  placeQuery,
  placeId,
  reviewLimit = DEFAULT_REVIEW_LIMIT,
}: GoogleTestimonialsProps) {
  const cacheKey = useMemo(() => {
    const identity = placeId?.trim()
      ? `id:${placeId.trim()}`
      : `query:${placeQuery.trim().toLowerCase()}`;
    return `wcas-google-testimonials:v${CACHE_VERSION}:${identity}`;
  }, [placeId, placeQuery]);

  const [payload, setPayload] = useState<TestimonialsPayload | null>(null);
  const [loadState, setLoadState] = useState<
    "loading" | "refreshing" | "ready" | "error"
  >("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const run = async () => {
      const cachedPayload = getCacheValue(cacheKey);
      const cacheIsFresh =
        cachedPayload !== null &&
        Date.now() - cachedPayload.fetchedAt < CACHE_TTL_MS;

      if (cachedPayload) {
        if (isCancelled) {
          return;
        }

        setPayload(cachedPayload);
        setLoadState("ready");
        warmImageCache(cachedPayload.reviews, cachedPayload.photos);
      }

      if (!apiKey) {
        if (!cachedPayload && !isCancelled) {
          setLoadState("error");
          setErrorMessage(
            "Google reviews are unavailable. Add your maps_api_key environment variable.",
          );
        }
        return;
      }

      if (cacheIsFresh) {
        return;
      }

      if (!isCancelled) {
        setLoadState(cachedPayload ? "refreshing" : "loading");
      }

      try {
        let nextPayload: TestimonialsPayload;
        const providedPlaceId =
          typeof placeId === "string" ? placeId.trim() : "";

        if (providedPlaceId) {
          try {
            const detailsV1 = await fetchPlaceDetailsV1(apiKey, providedPlaceId);
            nextPayload = buildPayloadFromV1(detailsV1, reviewLimit, apiKey);
          } catch {
            const placeDetails = await resolvePlaceDetails(
              apiKey,
              placeQuery,
              providedPlaceId,
            );
            nextPayload = buildPayload(placeDetails, reviewLimit);
          }
        } else {
          let searchedPlaceId: string | null = null;

          try {
            searchedPlaceId = await searchPlaceIdV1(apiKey, placeQuery);
          } catch {
            searchedPlaceId = null;
          }

          if (searchedPlaceId) {
            const detailsV1 = await fetchPlaceDetailsV1(apiKey, searchedPlaceId);
            nextPayload = buildPayloadFromV1(detailsV1, reviewLimit, apiKey);
          } else {
            const placeDetails = await resolvePlaceDetails(apiKey, placeQuery);
            nextPayload = buildPayload(placeDetails, reviewLimit);
          }
        }

        if (isCancelled) {
          return;
        }

        setPayload(nextPayload);
        setLoadState("ready");
        setErrorMessage(null);
        setCacheValue(cacheKey, nextPayload);
        warmImageCache(nextPayload.reviews, nextPayload.photos);
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setLoadState(cachedPayload ? "ready" : "error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load Google reviews right now.",
        );
      }
    };

    void run();

    return () => {
      isCancelled = true;
    };
  }, [apiKey, cacheKey, placeId, placeQuery, reviewLimit]);

  return (
    <section className="bg-surface-elevated py-16">
      <Container className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
            Testimonials
          </p>
          <h2 className="text-3xl font-semibold">Google Reviews</h2>
        </div>

        {loadState === "error" && !payload ? (
          <div className="flat-panel p-5 text-sm text-muted">
            {errorMessage ?? "Unable to load Google reviews right now."}
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <aside className="flat-panel flex h-[340px] flex-col gap-4 p-5">
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-28 w-[80%] overflow-hidden rounded-2xl bg-surface">
                <Image
                  src={withBasePath("/images/wcas logo.svg")}
                  alt="West Coast Aquarium Services logo"
                  fill
                  className="object-contain p-2"
                  sizes="(min-width: 1024px) 256px, 80vw"
                />
              </div>
              <div className="min-w-0 text-center">
                <p className="text-sm font-semibold text-foreground">
                  {payload?.placeName ?? "West Coast Aquarium Services"}
                </p>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <div className="text-sm tracking-wide text-[#f5c518]">
                    {`${"★".repeat(
                      summarizeRating(payload?.rating ?? 0).rounded,
                    )}${"☆".repeat(summarizeRating(payload?.rating ?? 0).empty)}`}
                  </div>
                  <span className="text-xs text-muted">
                    {(payload?.rating ?? 0).toFixed(1)}/5
                  </span>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-muted">
              {payload
                ? `${payload.userRatingsTotal} Google ratings`
                : "Loading Google rating..."}
            </p>
            {payload?.placeUrl ? (
              <a
                href={payload.placeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-full border border-outline/80 bg-surface px-5 py-2 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                View on Google
              </a>
            ) : (
              <div className="rounded-full border border-outline/80 bg-surface px-5 py-2 text-center text-sm font-semibold text-muted">
                Loading Google link...
              </div>
            )}
          </aside>

          <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {payload?.reviews.length ? (
              <div className="flex h-[340px] items-stretch gap-4">
                {payload.reviews.map((review, index) => {
                  const stars = summarizeRating(review.rating);

                  return (
                    <article
                      key={`${review.authorName}-${review.time ?? index}`}
                      className="flat-panel flex h-full w-[300px] shrink-0 flex-col gap-4 p-5"
                    >
                      <div className="flex items-center gap-3">
                        {review.profilePhotoUrl ? (
                          // Google profile photos are external URLs from reviews.
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={review.profilePhotoUrl}
                            alt={`${review.authorName} profile photo`}
                            className="h-11 w-11 rounded-full object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            {review.authorName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {review.authorName}
                          </p>
                          <p className="text-xs tracking-wide text-[#f5c518]">
                            {`${"★".repeat(stars.rounded)}${"☆".repeat(
                              stars.empty,
                            )}`}
                          </p>
                        </div>
                      </div>
                      <p className="grow overflow-y-auto pr-1 text-sm text-muted">
                        {review.text}
                      </p>
                      <div className="mt-auto flex items-center justify-between text-xs text-muted">
                        <span>{review.relativeTimeDescription}</span>
                        {review.authorUrl ? (
                          <a
                            href={review.authorUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="font-semibold text-primary"
                          >
                            View
                          </a>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : loadState !== "error" ? (
              <div className="flat-panel p-5 text-sm text-muted">
                {loadState === "refreshing" || loadState === "loading"
                  ? "Loading Google reviews..."
                  : "No Google reviews found yet."}
              </div>
            ) : null}
          </div>
        </div>

        <CustomerPhotoGallery photos={payload?.photos ?? []} />
      </Container>
    </section>
  );
}
