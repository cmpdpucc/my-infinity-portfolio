"use client";

import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

// ⚠️ Base Swiper CSS — required for the slideX transitions to work
import "swiper/css";

import { BlurSliderItem, BlurSliderProps } from "./types";

/**
 * BlurSlider — Agnostic horizontal carousel with a cinematic blur/scale transition effect.
 *
 * - Locks vertical page scroll while swiping; releases when reaching the edges
 *   via Swiper's `mousewheel.releaseOnEdges`.
 * - Accepts any data shape via the generic T extends BlurSliderItem.
 * - Renders slide content via the `renderItem` render prop, keeping this component
 *   fully decoupled from PixelCard or any specific UI.
 * - Styling is provided by the global BEM stylesheet `_blur-slider.scss`
 *   (imported via main.scss — consistent with the rest of the portfolio).
 *
 * @template T - Must satisfy BlurSliderItem { id, imageUrl }.
 *
 * @example
 * <BlurSlider
 *   items={PROJECTS}
 *   renderItem={(p) => <PixelCard image={p.imageUrl} title={p.title} description={p.description} />}
 * />
 */
function BlurSlider<T extends BlurSliderItem>({
  items,
  renderItem,
  className = "",
}: BlurSliderProps<T>) {
  const swiperModules = useMemo(() => [Mousewheel], []);

  const swiperParams = useMemo(
    () => ({
      modules: swiperModules,
      loop: true,
      speed: 1500,
      spaceBetween: 0,
      centeredSlides: true,
      mousewheel: {
        // Vertical scroll is captured and drives horizontal swipe.
        // On first/last slide, vertical scroll is released back to the page.
        releaseOnEdges: true,
        sensitivity: 1,
        forceToAxis: false, // Explicitly false so both vertical/horizontal mouse wheel events work
        thresholdDelta: 50,
      },
      // Responsive breakpoints
      breakpoints: {
        0: {
          slidesPerView: 1.2,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        },
      },
    }),
    [swiperModules]
  );

  const rootClass = ["blur-slider", className].filter(Boolean).join(" ");

  return (
    <div className={rootClass} aria-label="Projects carousel — scroll horizontally">
      <Swiper
        {...swiperParams}
        className="blur-slider__swiper"
      >
        {items.map((item) => (
          <SwiperSlide
            key={item.id}
            className="blur-slider__slide"
          >
            {/*
              Background halo: a blurred duplicate of the image that glows
              behind the active slide. Purely decorative.
            */}
            <div className="blur-slider__slide-image-halo-container" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt=""
                className="blur-slider__slide-image-halo"
              />
            </div>

            {/*
              Main image thumbnail — this element is the one that
              scales and blurs via Swiper's class hooks in the SCSS.
            */}
            <div className="blur-slider__slide-image-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt=""
                className="blur-slider__slide-image"
              />
            </div>

            {/*
              Polymorphic content panel — receives the output of renderItem().
              For ProjectsSection this is a <PixelCard />.
              The panel is hidden by default and revealed on swiper-slide-next.
            */}
            <div className="blur-slider__slide-content">
              {renderItem(item)}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BlurSlider;
