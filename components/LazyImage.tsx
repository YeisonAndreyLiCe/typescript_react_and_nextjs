import { useRef, useState, useEffect } from "react";
import type { ImgHTMLAttributes } from "react";

type LazyImageProps = {
  src: string,
  onLazyLoad?: (node: HTMLImageElement) => void,
};

type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImageProps & ImageNative;

export function LazyImage({ src, onLazyLoad, ...imgProps }: Props): JSX.Element {
  const node = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string>(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );

  useEffect(() => {
    if (isLoaded) return;
    // create an observer instance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSrc(src);
          observer.disconnect();
          setIsLoaded(true);
          if (typeof onLazyLoad == "function" && node.current) {
            onLazyLoad(node.current);
          }
        }
      });
    });
    // start observing
    if (node.current) {
      observer.observe(node.current);
    }
    // clean up
    return () => {
      observer.disconnect();
    };
  }, [src, onLazyLoad, isLoaded]);

  return (
    <img
      ref={node}
      src={currentSrc}
      className="rounded"
      {...imgProps}
    />
  );
}

// TODO: Add onLazyLoad prop (callback function)
// Arguments: node of the DOM 
// Return: void