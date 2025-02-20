import { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

function useSelectedSnapDisplay(emblaApi: EmblaCarouselType | undefined) {
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const updateScrollSnapState = useCallback((carouselApi: EmblaCarouselType) => {
    setSnapCount(carouselApi.scrollSnapList().length);
    setSelectedSnap(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateScrollSnapState(emblaApi);
    emblaApi.on('select', updateScrollSnapState);
    emblaApi.on('reInit', updateScrollSnapState);
  }, [emblaApi, updateScrollSnapState]);

  return {
    selectedSnap,
    snapCount,
  };
}

export default useSelectedSnapDisplay;
