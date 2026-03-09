"use client";

import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";

// ⚠️ Base Swiper CSS — required for the slideX transitions to work
import "swiper/css";
import "swiper/css/pagination";

import { BlurSliderItem, BlurSliderProps } from "./types";

/**
 * BlurSlider — Agnostic horizontal carousel with a cinematic blur/scale transition effect.
 *
 * - Locks vertical page scroll while swiping; releases when reaching the edges
 *   via Swiper's `mousewheel.releaseOnEdges`.
 * - Accepts any data shape via the generic T extends BlurSliderItem.
 * - Renders slide content via the `renderItem` render prop, keeping this component
 *   fully decoupled from ProjectCard or any specific UI.
 * - Styling is provided by the global BEM stylesheet `_blur-slider.scss`
 *   (imported via main.scss — consistent with the rest of the portfolio).
 *
 * @template T - Must satisfy BlurSliderItem { id, imageUrl }.
 *
 * @example
 * <BlurSlider
 *   items={PROJECTS}
 *   renderItem={(p) => <ProjectCard title={p.title} description={p.description} ... />}
 * />
 */
function BlurSlider<T extends BlurSliderItem>({
  items,
  renderItem,
  className = "",
}: BlurSliderProps<T>) {
  const swiperModules = useMemo(() => [Mousewheel, Pagination], []);

  const swiperParams = useMemo(
    () => ({
      modules: swiperModules,
      loop: false, // Disabled — only 5 slides, loop requires 2× slidesPerView
      grabCursor: true, // Visual drag affordance
      speed: 800,
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
      pagination: {
        clickable: true,
      },
      // Responsive breakpoints — refined for better card sizing
      breakpoints: {
        0: {
          slidesPerView: 1.2,
        },
        640: {
          slidesPerView: 1.8,
        },
        1024: {
          slidesPerView: 3,
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
              Polymorphic content panel — receives the output of renderItem().
              For ProjectsSection this is a <ProjectCard />.
              The panel is hidden by default and revealed on swiper-slide-next.
            */}
            <div className="blur-slider__slide-content">
              {/*
                Project icon — clickable link to the project.
                Visible only on the active slide (controlled via SCSS).
                Will be replaced with actual .ico files in the future.
              */}
              <a
                href={item.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="blur-slider__slide-icon"
                aria-label={`Visit project`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.iconUrl}
                  alt=""
                  width={64}
                  height={64}
                  className="blur-slider__slide-icon-img"
                />
              </a>

              {renderItem(item)}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BlurSlider;

