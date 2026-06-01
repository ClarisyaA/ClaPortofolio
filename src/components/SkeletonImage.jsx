import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const SkeletonImage = ({
  src,
  alt,
  className,
  skeletonClassName,
  eager = false,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
  }, [src]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", skeletonClassName)}>
      {!isLoaded && <div className="image-skeleton absolute inset-0" aria-hidden="true" />}
      <img
        src={currentSrc}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={(event) => {
          setIsLoaded(true);
          if (onError) {
            const nextSrc = onError(event);
            if (nextSrc && nextSrc !== currentSrc) {
              setIsLoaded(false);
              setCurrentSrc(nextSrc);
            }
          }
        }}
        className={cn(
          className,
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        {...props}
      />
    </div>
  );
};
