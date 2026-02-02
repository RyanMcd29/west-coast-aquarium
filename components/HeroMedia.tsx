import Image from "next/image";
import { withBasePath } from "@/lib/paths";

type HeroMediaProps = {
  imageSrc: string;
  imageAlt: string;
  videoSrc?: string;
};

export default function HeroMedia({ imageSrc, imageAlt, videoSrc }: HeroMediaProps) {
  const hasVideo = Boolean(videoSrc);
  const resolvedImageSrc = withBasePath(imageSrc);
  const resolvedVideoSrc = videoSrc ? withBasePath(videoSrc) : undefined;

  return (
    <div className="absolute inset-0 -z-10">
      {hasVideo && (
        <video
          className="h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          poster={resolvedImageSrc}
        >
          <source src={resolvedVideoSrc} type="video/mp4" />
        </video>
      )}
      <Image
        src={resolvedImageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className={hasVideo ? "object-cover motion-safe:hidden" : "object-cover"}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/60 to-background/30" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/90 to-transparent" />
    </div>
  );
}
