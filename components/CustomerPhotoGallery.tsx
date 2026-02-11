"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type CustomerGalleryPhoto = {
  imageUrl: string;
  authorName: string | null;
  authorUrl: string | null;
};

type CustomerPhotoGalleryProps = {
  photos: CustomerGalleryPhoto[];
  tagline?: string;
  displayLimit?: number; // How many photos to randomly select and display
};

// Default number of photos to display (randomly selected from available)
const DEFAULT_DISPLAY_LIMIT = 12;

// Speed settings by screen size
const SPEED_DESKTOP = 75; // pixels per second (screens >= 1024px)
const SPEED_TABLET = 55; // pixels per second (screens >= 640px)
const SPEED_MOBILE = 35; // pixels per second (screens < 640px)

const PAUSE_DURATION = 1500; // ms to pause after interaction
const RAMP_UP_DURATION = 1200; // ms to ramp back up to full speed
const MAX_FRAME_DELTA_MS = 64; // clamp large frame gaps to prevent jumpy catch-up

// Get speed based on screen width
function getSpeedForScreenWidth(width: number): number {
  if (width >= 1024) return SPEED_DESKTOP;
  if (width >= 640) return SPEED_TABLET;
  return SPEED_MOBILE;
}

function easeOutCubic(value: number): number {
  return 1 - Math.pow(1 - value, 3);
}

function snapToDevicePixels(value: number, devicePixelRatio: number): number {
  if (devicePixelRatio <= 0) {
    return Math.round(value);
  }

  return Math.round(value * devicePixelRatio) / devicePixelRatio;
}

function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createDeterministicRandom(seed: number) {
  let state = seed || 1;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let output = Math.imul(state ^ (state >>> 15), state | 1);
    output ^= output + Math.imul(output ^ (output >>> 7), output | 61);
    return ((output ^ (output >>> 14)) >>> 0) / 4294967296;
  };
}

// Fisher-Yates shuffle using a deterministic PRNG so SSR and hydration match.
function shuffleArrayWithSeed<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  const random = createDeterministicRandom(seed);

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default function CustomerPhotoGallery({
  photos,
  tagline = "We take pride in every tank we service.",
  displayLimit = DEFAULT_DISPLAY_LIMIT,
}: CustomerPhotoGalleryProps) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const loopWidthRef = useRef(0);
  const scrollOffsetRef = useRef(0);
  const devicePixelRatioRef = useRef(
    typeof window !== "undefined" && window.devicePixelRatio > 0
      ? window.devicePixelRatio
      : 1,
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Keep "randomized" order stable across server and client for hydration safety.
  const displayPhotos = useMemo(() => {
    if (photos.length === 0) return [];
    const seedSource = `${displayLimit}:${photos
      .map((photo) => photo.imageUrl.trim())
      .join("|")}`;
    const seed = hashString(seedSource);

    return shuffleArrayWithSeed(photos, seed).slice(0, displayLimit);
  }, [photos, displayLimit]);

  const carouselPhotos = useMemo(
    () => [...displayPhotos, ...displayPhotos],
    [displayPhotos],
  );

  // Track base speed based on screen size
  const baseSpeedRef = useRef(
    typeof window !== "undefined"
      ? getSpeedForScreenWidth(window.innerWidth)
      : SPEED_DESKTOP,
  );

  // Track interaction state for pause/resume
  const interactionRef = useRef({
    isPointerDown: false,
    pauseEndTime: 0,
  });

  const activePhoto = useMemo(() => {
    if (activeIndex === null) {
      return null;
    }
    return displayPhotos[activeIndex] ?? null;
  }, [activeIndex, displayPhotos]);

  const setPauseWindow = useCallback(() => {
    const now = performance.now();
    interactionRef.current.pauseEndTime = now + PAUSE_DURATION;
  }, []);

  const startPointerInteraction = useCallback(() => {
    interactionRef.current.isPointerDown = true;
    setPauseWindow();
  }, [setPauseWindow]);

  const endPointerInteraction = useCallback(() => {
    if (!interactionRef.current.isPointerDown) {
      return;
    }

    interactionRef.current.isPointerDown = false;
    setPauseWindow();
  }, [setPauseWindow]);

  // Update base speed on window resize
  useEffect(() => {
    const handleResize = () => {
      baseSpeedRef.current = getSpeedForScreenWidth(window.innerWidth);
      devicePixelRatioRef.current =
        window.devicePixelRatio > 0 ? window.devicePixelRatio : 1;
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((previous) => {
          if (previous === null) {
            return null;
          }
          return previous === 0 ? displayPhotos.length - 1 : previous - 1;
        });
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((previous) => {
          if (previous === null) {
            return null;
          }
          return previous === displayPhotos.length - 1 ? 0 : previous + 1;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, displayPhotos.length]);

  // Set up interaction event listeners
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const syncOffsetFromRail = () => {
      const loopWidth = loopWidthRef.current;
      const rawLeft = rail.scrollLeft;
      if (loopWidth > 0) {
        const normalized = ((rawLeft % loopWidth) + loopWidth) % loopWidth;
        scrollOffsetRef.current = normalized;
      } else {
        scrollOffsetRef.current = rawLeft;
      }
    };

    const onWheel = () => {
      setPauseWindow();
      window.requestAnimationFrame(syncOffsetFromRail);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary) {
        return;
      }

      syncOffsetFromRail();
      startPointerInteraction();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!event.isPrimary) {
        return;
      }

      syncOffsetFromRail();
      endPointerInteraction();
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        endPointerInteraction();
      }
    };

    const onWindowBlur = () => {
      syncOffsetFromRail();
      interactionRef.current.isPointerDown = false;
      setPauseWindow();
    };

    syncOffsetFromRail();

    rail.addEventListener("wheel", onWheel, { passive: true });
    rail.addEventListener("pointerdown", onPointerDown, { passive: true });
    rail.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("blur", onWindowBlur);

    return () => {
      rail.removeEventListener("wheel", onWheel);
      rail.removeEventListener("pointerdown", onPointerDown);
      rail.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [endPointerInteraction, setPauseWindow, startPointerInteraction]);

  // Measure the duplicated track width once and keep it updated on resize/content changes.
  useEffect(() => {
    const rail = railRef.current;
    const track = rail?.firstElementChild as HTMLDivElement | null;
    if (!rail || !track) {
      return;
    }

    const updateLoopWidth = () => {
      const nextWidth = track.scrollWidth / 2;
      loopWidthRef.current = nextWidth;
      if (nextWidth > 0) {
        scrollOffsetRef.current =
          ((scrollOffsetRef.current % nextWidth) + nextWidth) % nextWidth;
      } else {
        scrollOffsetRef.current = 0;
      }
    };

    updateLoopWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateLoopWidth);
      return () => {
        window.removeEventListener("resize", updateLoopWidth);
      };
    }

    const resizeObserver = new ResizeObserver(updateLoopWidth);
    resizeObserver.observe(track);
    resizeObserver.observe(rail);

    return () => {
      resizeObserver.disconnect();
    };
  }, [displayPhotos.length]);

  // Auto-scroll animation with pause and ramp-up
  useEffect(() => {
    if (activeIndex !== null || displayPhotos.length < 2) {
      return;
    }

    const rail = railRef.current;
    if (!rail) {
      return;
    }

    let frame = 0;
    let lastTime = performance.now();

    const step = (now: number) => {
      const delta = Math.min(Math.max(now - lastTime, 0), MAX_FRAME_DELTA_MS);
      lastTime = now;

      const { isPointerDown, pauseEndTime } = interactionRef.current;
      const baseSpeed = baseSpeedRef.current;

      // Calculate current speed based on interaction state
      let currentSpeed = baseSpeed;

      if (isPointerDown) {
        // User is actively dragging/pressing - no auto-scroll
        currentSpeed = 0;
      } else if (now < pauseEndTime) {
        // In pause period after interaction ended
        currentSpeed = 0;
      } else if (now < pauseEndTime + RAMP_UP_DURATION) {
        // Ramping back up to full speed after interaction
        const rampProgress = Math.min((now - pauseEndTime) / RAMP_UP_DURATION, 1);
        currentSpeed = baseSpeed * easeOutCubic(rampProgress);
      }

      // Apply scroll and loop when crossing the duplicated boundary.
      if (currentSpeed > 0) {
        const loopWidth = loopWidthRef.current;
        if (loopWidth > 0) {
          scrollOffsetRef.current += (currentSpeed * delta) / 1000;
          if (scrollOffsetRef.current >= loopWidth) {
            scrollOffsetRef.current %= loopWidth;
          }
          rail.scrollLeft = snapToDevicePixels(
            scrollOffsetRef.current,
            devicePixelRatioRef.current,
          );
        }
      }

      frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [activeIndex, displayPhotos.length]);

  if (!displayPhotos.length) {
    return null;
  }

  return (
    <section className="overflow-hidden py-2">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
          Customer Gallery
        </p>
        <h3 className="text-2xl font-semibold">{tagline}</h3>
      </div>

      <div className="relative left-1/2 mt-5 h-[380px] w-screen -translate-x-1/2 overflow-hidden sm:left-0 sm:h-[410px] sm:w-full sm:translate-x-0 lg:h-[430px] sm:[mask-image:linear-gradient(to_right,transparent,black_56px,black_calc(100%-56px),transparent)]">
        <div
          ref={railRef}
          className="h-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex h-full items-start px-2 py-2">
            {carouselPhotos.map((photo, index) => {
              const isHigh = index % 2 === 0;

              return (
                <button
                  type="button"
                  key={`${photo.imageUrl}-${index}`}
                  aria-label={`Open customer tank photo ${index + 1}`}
                  className="group relative shrink-0 overflow-hidden rounded-2xl text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    width: "clamp(190px, 68vw, 300px)",
                    height: "clamp(190px, 68vw, 300px)",
                    marginTop: isHigh
                      ? "clamp(12px, 3vw, 18px)"
                      : "clamp(74px, 16vw, 96px)",
                    marginLeft: index === 0 ? "0px" : "clamp(-34px, -6vw, -20px)",
                    zIndex: carouselPhotos.length - index,
                  }}
                  onClick={() => setActiveIndex(index % displayPhotos.length)}
                >
                  <div className="relative h-full w-full overflow-hidden">
                    {/* Google customer photos are external URLs. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.imageUrl}
                      alt={`Customer tank photo ${index + 1}`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      draggable={false}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {activePhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 rounded-full border border-white/30 bg-black/50 px-3 py-1 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            Close
          </button>

          {displayPhotos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((previous) =>
                    previous === null
                      ? null
                      : previous === 0
                        ? displayPhotos.length - 1
                        : previous - 1,
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/50 px-3 py-1 text-sm font-semibold text-white transition hover:bg-black/80"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((previous) =>
                    previous === null
                      ? null
                      : previous === displayPhotos.length - 1
                        ? 0
                        : previous + 1,
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/50 px-3 py-1 text-sm font-semibold text-white transition hover:bg-black/80"
              >
                Next
              </button>
            </>
          ) : null}

          <div className="w-full max-w-5xl rounded-2xl border border-white/15 bg-[#030b12] p-3 shadow-2xl">
            <div className="flex max-h-[78vh] items-center justify-center overflow-hidden rounded-xl bg-black">
              {/* Google customer photos are external URLs. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePhoto.imageUrl}
                alt="Expanded customer tank photo"
                className="max-h-[78vh] w-auto max-w-full object-contain"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-3 flex items-center justify-end gap-3 text-xs text-slate-300">
              {activePhoto.authorUrl ? (
                <a
                  href={activePhoto.authorUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-cyan-200"
                >
                  Author
                </a>
              ) : null}
              <span>
                {(activeIndex ?? 0) + 1}/{displayPhotos.length}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
