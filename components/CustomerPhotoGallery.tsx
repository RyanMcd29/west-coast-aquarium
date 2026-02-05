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
const HOVER_SPEED_RATIO = 0.2; // hover speed as ratio of current speed
const HOVER_RAMP_DURATION = 400; // ms to slow down / speed up on hover

// Get speed based on screen width
function getSpeedForScreenWidth(width: number): number {
  if (width >= 1024) return SPEED_DESKTOP;
  if (width >= 640) return SPEED_TABLET;
  return SPEED_MOBILE;
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Shuffle and select a random subset of photos
  // This runs when photos changes (typically just once when data loads)
  const displayPhotos = useMemo(() => {
    if (photos.length === 0) return [];
    return shuffleArray(photos).slice(0, displayLimit);
  }, [photos, displayLimit]);

  // Track base speed based on screen size
  const baseSpeedRef = useRef(
    typeof window !== "undefined"
      ? getSpeedForScreenWidth(window.innerWidth)
      : SPEED_DESKTOP,
  );

  // Track interaction state for pause/resume
  const interactionRef = useRef({
    isInteracting: false,
    pauseEndTime: 0,
    rampStartTime: 0,
  });

  // Track hover state for gradual slowdown
  const hoverRef = useRef({
    isHovering: false,
    transitionStartTime: 0,
    startSpeed: SPEED_DESKTOP, // Will be updated dynamically when hover starts
  });

  // Update base speed on window resize
  useEffect(() => {
    const handleResize = () => {
      baseSpeedRef.current = getSpeedForScreenWidth(window.innerWidth);
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track if user is interacting for smooth scroll toggle
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const activePhoto = useMemo(() => {
    if (activeIndex === null) {
      return null;
    }
    return displayPhotos[activeIndex] ?? null;
  }, [activeIndex, displayPhotos]);

  // Handler to trigger pause on user interaction
  const handleUserInteraction = useCallback(() => {
    const now = performance.now();
    interactionRef.current.isInteracting = true;
    interactionRef.current.pauseEndTime = now + PAUSE_DURATION;
    interactionRef.current.rampStartTime = now + PAUSE_DURATION;
    setIsUserScrolling(true);
  }, []);

  // Handler when interaction ends (mouse up, touch end)
  const handleInteractionEnd = useCallback(() => {
    const now = performance.now();
    interactionRef.current.isInteracting = false;
    interactionRef.current.pauseEndTime = now + PAUSE_DURATION;
    interactionRef.current.rampStartTime = now + PAUSE_DURATION;
    // Disable smooth scroll after pause + ramp finishes
    setTimeout(() => {
      setIsUserScrolling(false);
    }, PAUSE_DURATION + RAMP_UP_DURATION);
  }, []);

  // Handler for hover start - gradually slow down
  const handleImageHoverStart = useCallback(() => {
    const now = performance.now();
    hoverRef.current.isHovering = true;
    hoverRef.current.transitionStartTime = now;
    hoverRef.current.startSpeed = baseSpeedRef.current;
  }, []);

  // Handler for hover end - gradually speed back up
  const handleImageHoverEnd = useCallback(() => {
    const now = performance.now();
    hoverRef.current.isHovering = false;
    hoverRef.current.transitionStartTime = now;
    hoverRef.current.startSpeed = baseSpeedRef.current * HOVER_SPEED_RATIO;
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

    const onWheel = () => {
      handleUserInteraction();
      // Wheel events are instantaneous, so immediately end interaction
      handleInteractionEnd();
    };

    const onMouseDown = () => {
      handleUserInteraction();
    };

    const onMouseUp = () => {
      handleInteractionEnd();
    };

    const onMouseLeave = () => {
      if (interactionRef.current.isInteracting) {
        handleInteractionEnd();
      }
    };

    const onTouchStart = () => {
      handleUserInteraction();
    };

    const onTouchEnd = () => {
      handleInteractionEnd();
    };

    rail.addEventListener("wheel", onWheel, { passive: true });
    rail.addEventListener("mousedown", onMouseDown);
    rail.addEventListener("mouseup", onMouseUp);
    rail.addEventListener("mouseleave", onMouseLeave);
    rail.addEventListener("touchstart", onTouchStart, { passive: true });
    rail.addEventListener("touchend", onTouchEnd);

    return () => {
      rail.removeEventListener("wheel", onWheel);
      rail.removeEventListener("mousedown", onMouseDown);
      rail.removeEventListener("mouseup", onMouseUp);
      rail.removeEventListener("mouseleave", onMouseLeave);
      rail.removeEventListener("touchstart", onTouchStart);
      rail.removeEventListener("touchend", onTouchEnd);
    };
  }, [handleUserInteraction, handleInteractionEnd]);

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
      const delta = now - lastTime;
      lastTime = now;

      const { isInteracting, pauseEndTime, rampStartTime } =
        interactionRef.current;
      const { isHovering, transitionStartTime, startSpeed } = hoverRef.current;
      const baseSpeed = baseSpeedRef.current;
      const hoverSpeed = baseSpeed * HOVER_SPEED_RATIO;

      // Calculate current speed based on interaction state
      let currentSpeed = baseSpeed;

      if (isInteracting) {
        // Actively interacting - no auto-scroll
        currentSpeed = 0;
      } else if (now < pauseEndTime) {
        // In pause period after interaction ended
        currentSpeed = 0;
      } else if (now < rampStartTime + RAMP_UP_DURATION) {
        // Ramping back up to full speed after interaction
        const rampProgress = (now - rampStartTime) / RAMP_UP_DURATION;
        // Use ease-out curve for smooth acceleration
        const eased = 1 - Math.pow(1 - rampProgress, 3);
        currentSpeed = baseSpeed * eased;
      }

      // Apply hover speed modulation (only if not in interaction pause)
      if (currentSpeed > 0) {
        const hoverElapsed = now - transitionStartTime;
        const hoverProgress = Math.min(hoverElapsed / HOVER_RAMP_DURATION, 1);
        // Use ease-in-out for smooth hover transitions
        const hoverEased =
          hoverProgress < 0.5
            ? 2 * hoverProgress * hoverProgress
            : 1 - Math.pow(-2 * hoverProgress + 2, 2) / 2;

        if (isHovering) {
          // Transitioning from startSpeed down to hover speed
          currentSpeed = startSpeed - (startSpeed - hoverSpeed) * hoverEased;
        } else if (hoverElapsed < HOVER_RAMP_DURATION) {
          // Transitioning from startSpeed back up to current target speed
          const targetSpeed = currentSpeed;
          currentSpeed = startSpeed + (targetSpeed - startSpeed) * hoverEased;
        }
      }

      // Apply scroll
      if (currentSpeed > 0) {
        rail.scrollLeft += (currentSpeed * delta) / 1000;
      }

      // Handle loop - reset to start when past halfway
      const loopWidth = rail.scrollWidth / 2;
      if (rail.scrollLeft >= loopWidth) {
        rail.scrollLeft -= loopWidth;
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

  const carouselPhotos = [...displayPhotos, ...displayPhotos];

  return (
    <section className="overflow-hidden py-2">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
          Customer Gallery
        </p>
        <h3 className="text-2xl font-semibold">{tagline}</h3>
      </div>

      <div className="relative left-1/2 mt-5 h-[430px] w-screen -translate-x-1/2 overflow-hidden sm:left-0 sm:w-full sm:translate-x-0 sm:[mask-image:linear-gradient(to_right,transparent,black_56px,black_calc(100%-56px),transparent)]">
        <div
          ref={railRef}
          className={`h-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [will-change:scroll-position] [&::-webkit-scrollbar]:hidden ${isUserScrolling ? "scroll-smooth" : ""}`}
        >
          <div className="flex h-full transform-gpu items-start px-2 py-2">
            {carouselPhotos.map((photo, index) => {
              const isHigh = index % 2 === 0;

              return (
            <button
              type="button"
              key={`${photo.imageUrl}-${index}`}
              aria-label={`Open customer tank photo ${index + 1}`}
              className="group relative shrink-0 overflow-hidden rounded-2xl text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              style={{
                width: "300px",
                height: "300px",
                marginTop: isHigh ? "18px" : "96px",
                marginLeft: index === 0 ? "0px" : "-34px",
                zIndex: carouselPhotos.length - index,
              }}
              onClick={() => setActiveIndex(index % displayPhotos.length)}
              onMouseEnter={handleImageHoverStart}
              onMouseLeave={handleImageHoverEnd}
            >
              <div className="relative h-full w-full overflow-hidden">
                {/* Google customer photos are external URLs. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.imageUrl}
                  alt={`Customer tank photo ${index + 1}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
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
