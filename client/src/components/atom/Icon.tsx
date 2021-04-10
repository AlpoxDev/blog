import React from 'react';
import styled from '@emotion/styled';

export const SVG = styled.svg``;

export interface IconProps {
  className?: string;
}

export const RightArrowIcon = ({ className }: IconProps) => (
  <SVG className={className} width="65" height="44" viewBox="0 0 65 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M64.22 19.7211L45.5 0.785762C44.9963 0.299133 44.3236 0.0305423 43.6259 0.0374848C42.9281 0.0444273 42.2608 0.326351 41.7667 0.822908C41.2727 1.31947 40.9912 1.9912 40.9824 2.69431C40.9737 3.39743 41.2384 4.07605 41.72 4.58492L55.79 18.8141H3.66999C3.30629 18.7917 2.94187 18.8445 2.59918 18.9693C2.25649 19.0941 1.94277 19.2882 1.67735 19.5398C1.41193 19.7914 1.20041 20.0951 1.05583 20.4321C0.911256 20.7692 0.83667 21.1325 0.83667 21.4997C0.83667 21.8669 0.911256 22.2303 1.05583 22.5673C1.20041 22.9044 1.41193 23.208 1.67735 23.4596C1.94277 23.7112 2.25649 23.9054 2.59918 24.0302C2.94187 24.155 3.30629 24.2078 3.66999 24.1853H56L41.73 38.4045C41.4585 38.6477 41.2391 38.9441 41.0853 39.2757C40.9314 39.6073 40.8463 39.967 40.8351 40.3329C40.824 40.6987 40.887 41.0631 41.0204 41.4035C41.1538 41.744 41.3547 42.0535 41.6109 42.313C41.8671 42.5725 42.1731 42.7766 42.5102 42.9128C42.8474 43.0491 43.2086 43.1145 43.5717 43.1052C43.9348 43.0959 44.2922 43.0121 44.622 42.8588C44.9519 42.7055 45.2472 42.486 45.49 42.2137L64.21 23.5303C64.4585 23.2804 64.6557 22.9835 64.7903 22.6567C64.9248 22.3299 64.994 21.9795 64.994 21.6257C64.994 21.2719 64.9248 20.9215 64.7903 20.5947C64.6557 20.2679 64.4585 19.971 64.21 19.7211H64.22Z"
      fill="#111"
    />
  </SVG>
);
