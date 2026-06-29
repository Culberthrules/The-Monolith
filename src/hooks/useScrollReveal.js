import { useEffect, useRef } from 'react';

/**
 * Hook to apply scroll-triggered reveal animations
 * @param {Object} options - Intersection Observer options
 * @returns {React.RefObject} - Ref to attach to the container element
 */
const useScrollReveal = (options = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elementsToReveal = container.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Optional: Stop observing once revealed if you only want it to happen once
          // observer.unobserve(entry.target);
        }
      });
    }, options);

    elementsToReveal.forEach((el) => observer.observe(el));

    return () => {
      elementsToReveal.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return containerRef;
};

export default useScrollReveal;
