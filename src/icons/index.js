/*
 *
 *   Copyright (C) 2017-2019 HERE Europe B.V.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 *   SPDX-License-Identifier: Apache-2.0
 *   License-Filename: LICENSE
 *
 *
 */

import React from 'react';

export const Logo = ({ className, fill = '#2DD5c9' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      className={className}
    >
      <path
        fill="#fff"
        d="M20.998 9.095c-.43-.497-.443-1.072 0-1.532.43-.434.987-.447 1.52 0l-1.52 1.532zm-7 7.064c-.43-.498-.443-1.085 0-1.533.43-.434.988-.447 1.532 0l-1.531 1.533zm5.595-.127l1.57-1.584-1.695-1.712c-1.38-1.392-.975-2.133-.658-2.452.202-.205.405-.358.545-.434.19.37.443.728.759 1.034 1.644 1.673 3.442 1.443 4.822.04.823-.832 1.216-1.598 1.316-1.981l-1.355-.754a5.56 5.56 0 0 1-.973 1.405c-.748.766-1.458.766-1.937.37l2.824-2.835-.354-.358c-1.66-1.686-3.203-1.775-4.596-.37-.924.932-1.05 2.082-.646 3.129l-1.038-1.238c-.101.038-.29.19-.481.383-.544.562-.67 1.43-.531 2.005l-.697-.6-1.38 1.392 1.898 1.916c-1.506-1.252-2.86-1.188-4.112.076-1.266 1.277-1.19 2.836-.14 4.138l-.177-.178c-1.127-1.137-2.215-1.381-3.292-.282-.632.626-.733 1.239-.67 1.789l-2.658-2.67-1.546 1.558 5.138 5.2h3.14l-2.164-2.185c-.76-.754-.988-1.278-.52-1.75.342-.357.735-.346 1.216.14l2.608 2.644 1.569-1.583-1.95-1.967c1.545 1.29 3.229.971 4.507-.331.671-.665 1.037-1.278 1.216-1.7l-1.38-.777a6.155 6.155 0 0 1-.835 1.149c-.76.766-1.469.765-1.949.37l2.798-2.823 1.808 1.826z"
      />
      <path fill={fill} d="M3.425 22.987l3.15 3.18 3.152-3.18z" />
    </svg>
  );
};

export const Table = ({ className }) => {
  return (
    <svg
      width="25px"
      height="17px"
      viewBox="0 0 25 17"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g
        id="Screens"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M22.8654971,0 L1.34502924,0 C0.603380117,0 0,0.555541796 0,1.23839009 L0,15.6037152 C0,16.2865635 0.603380117,16.8421053 1.34502924,16.8421053 L22.8654971,16.8421053 C23.6071462,16.8421053 24.2105263,16.2865635 24.2105263,15.6037152 L24.2105263,1.23839009 C24.2105263,0.555541796 23.6071462,0 22.8654971,0 Z M1.34502924,0.990712074 L22.8654971,0.990712074 C23.0139883,0.990712074 23.1345029,1.1019195 23.1345029,1.23839009 L23.1345029,3.9628483 L1.07602339,3.9628483 L1.07602339,1.23839009 C1.07602339,1.1019195 1.19653801,0.990712074 1.34502924,0.990712074 Z M8.33918129,11.8885449 L8.33918129,8.91640867 L15.871345,8.91640867 L15.871345,11.8885449 L8.33918129,11.8885449 Z M15.871345,12.879257 L15.871345,15.8513932 L8.33918129,15.8513932 L8.33918129,12.879257 L15.871345,12.879257 Z M15.871345,4.95356037 L15.871345,7.92569659 L8.33918129,7.92569659 L8.33918129,4.95356037 L15.871345,4.95356037 Z M7.26315789,7.92569659 L1.07602339,7.92569659 L1.07602339,4.95356037 L7.26315789,4.95356037 L7.26315789,7.92569659 Z M7.26315789,8.91640867 L7.26315789,11.8885449 L1.07602339,11.8885449 L1.07602339,8.91640867 L7.26315789,8.91640867 Z M16.9473684,8.91640867 L23.1345029,8.91640867 L23.1345029,11.8885449 L16.9473684,11.8885449 L16.9473684,8.91640867 Z M16.9473684,7.92569659 L16.9473684,4.95356037 L23.1345029,4.95356037 L23.1345029,7.92569659 L16.9473684,7.92569659 Z M1.07602339,15.6037152 L1.07602339,12.879257 L7.26315789,12.879257 L7.26315789,15.8513932 L1.34502924,15.8513932 C1.19653801,15.8513932 1.07602339,15.7401858 1.07602339,15.6037152 Z M22.8654971,15.8513932 L16.9473684,15.8513932 L16.9473684,12.879257 L23.1345029,12.879257 L23.1345029,15.6037152 C23.1345029,15.7401858 23.0139883,15.8513932 22.8654971,15.8513932 Z"
          id="Shape"
          fill="#FFFFFF"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};

export const CollapseRect = ({ className }) => {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g
        id="collapse"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Group-8">
          <rect
            id="Rectangle"
            stroke="var(--color-green)"
            x="0.5"
            y="0.5"
            width="15"
            height="15"
          />
          <rect
            id="Rectangle"
            fill="var(--color-green)"
            x="4"
            y="8"
            width="8"
            height="1"
          />
        </g>
      </g>
    </svg>
  );
};

export const ExpandRect = ({ className }) => {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g
        id="expand"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Group-2">
          <rect
            id="Rectangle"
            stroke="var(--color-green)"
            x="0.5"
            y="0.5"
            width="15"
            height="15"
          />
          <g
            id="noun_expand_1369805"
            transform="translate(8.000000, 8.000000) scale(-1, 1) translate(-8.000000, -8.000000) translate(3.000000, 3.000000)"
            fill="var(--color-green)"
            fillRule="nonzero"
          >
            <g id="Group">
              <g id="Shape">
                <path d="M1.42253222,0.833300083 L4.59999986,4.01076772 L4.01076772,4.59999986 L0.833300083,1.42253222 L0.833300083,3.61096706 L0,3.61096706 L0,0 L3.61096706,0 L3.61096706,0.833300083 L1.42253222,0.833300083 Z M8.57746725,9.16669939 L5.39999961,5.98923175 L5.98923175,5.39999961 L9.16669939,8.57746725 L9.16669939,6.38903242 L9.99999947,6.38903242 L9.99999947,9.99999947 L6.38903242,9.99999947 L6.38903242,9.16669939 L8.57746725,9.16669939 Z" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const Arrow = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 6 9"
      width="6px"
      height="9px"
      className={className}
    >
      <path
        fill="var(--color-green)"
        d="M5.4,7.5c0.1-0.2,0.1-0.4,0-0.6L3.3,4.5l2.1-2.4c0.1-0.2,0.1-0.4,0-0.6L4.5,0.6C4.3,0.5,4,0.5,3.9,0.6L0.6,4.4
        c-0.1,0.1-0.1,0.2,0,0.3l3.3,3.7c0.2,0.2,0.4,0.2,0.6,0L5.4,7.5z"
      />
    </svg>
  );
};

export const Grid = ({ className, fill }) => {
  return (
    <svg
      data-testid="grid-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"
      />
    </svg>
  );
};

export const List = ({ className, fill }) => {
  return (
    <svg
      data-testid="list-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
      />
    </svg>
  );
};

export const Plus = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="16px"
      height="16px"
      className={className}
    >
      <path
        fill={fill}
        d="M11,9 L11,2.4 C11,2.179 10.821,2 10.6,2 L9.4,2 C9.179,2 9,2.179 9,2.4 L9,9 L2.4,9 C2.179,9 2,9.179 2,9.4 L2,10.6 C2,10.821 2.179,11 2.4,11 L9,11 L9,17.6 C9,17.821 9.179,18 9.4,18 L10.6,18 C10.821,18 11,17.821 11,17.6 L11,11 L17.6,11 C17.821,11 18,10.821 18,10.6 L18,9.4 C18,9.179 17.821,9 17.6,9 L11,9 Z"
        transform="translate(-2 -2)"
      />
    </svg>
  );
};

export const PlusCircle = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <path
        fill={fill}
        fillRule="evenodd"
        d="M27.003 19.77a.845.845 0 0 0-.837-.838h-5.559l.02-5.54a.845.845 0 0 0-.838-.837.845.845 0 0 0-.838.838l-.019 5.54-5.54-.02a.845.845 0 0 0-.837.838c0 .228.095.438.248.59a.835.835 0 0 0 .59.247l5.54.02-.02 5.539c0 .228.095.437.248.59a.835.835 0 0 0 .59.247c.457 0 .837-.38.837-.837l.02-5.54 5.539.02a.878.878 0 0 0 .856-.857zM20 37.54c-9.65 0-17.5-7.89-17.5-17.54 0-9.65 7.85-17.5 17.5-17.5S37.5 10.35 37.5 20 29.65 37.54 20 37.54M20 0C8.955 0 0 8.955 0 20c0 11.046 8.955 20 20 20 11.046 0 20-8.954 20-20C40 8.955 31.046 0 20 0"
      />
    </svg>
  );
};

export const Minus = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="16px"
      height="16px"
      className={className}
    >
      <path
        fill={fill}
        d="M9,9h6.6C15.8,9,16,8.8,16,8.6V7.4C16,7.2,15.8,7,15.6,7H9H7H0.4C0.2,7,0,7.2,0,7.4v1.2C0,8.8,0.2,9,0.4,9H7H9z"
      />
    </svg>
  );
};

export const Search = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      className={className}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke={fill}
        strokeLinejoin="bevel"
        strokeMiterlimit="10"
        strokeWidth="2"
        clipRule="evenodd"
      />
      <path
        fill="none"
        stroke={fill}
        strokeMiterlimit="10"
        strokeWidth="3"
        d="M24.846 24.763l-5.913-5.913"
      />
    </svg>
  );
};

export const Star = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
      />
    </svg>
  );
};

export const Starred = ({ className, fill }) => {
  return (
    <svg
      data-testid="star-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
};

export const BookmarkOff = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
    </svg>
  );
};

export const BookmarkOn = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"
      />
    </svg>
  );
};

export const Triangle = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="10"
      viewBox="0 0 8 10"
      className={className}
    >
      <polygon fill={fill} points="7.4,0 8,10 0,8.3 " />
    </svg>
  );
};

export const Trash = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      className={className}
    >
      <g fill={fill}>
        <path d="M5.28 9l2.04 14.57C7.5 24.91 8.81 26 10.23 26h7.54c1.43 0 2.73-1.09 2.92-2.43L22.72 9H5.28zM24 5v2h-7V5h-6v2H4V5h6V3h8v2z" />
      </g>
    </svg>
  );
};

export const EyeOn = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
    >
      <g fill={fill}>
        <path d="M28.05 18.54a6.607 6.607 0 0 0-3.95-1.32c-.32 0-.64.03-.96.07a6.6 6.6 0 0 0-4.34 2.59 6.606 6.606 0 0 0 1.33 9.25 6.629 6.629 0 0 0 9.26-1.34 6.593 6.593 0 0 0 1.31-3.95c0-2.01-.91-4-2.65-5.3zm-3.96 8.93a3.636 3.636 0 0 1-3.629-3.641A3.634 3.634 0 0 1 24.09 20.2a3.634 3.634 0 0 1 3.629 3.629 3.637 3.637 0 0 1-3.63 3.64z" />
        <path d="M44.34 23.17c-.09-.1-9.44-10.51-20.63-10.51-11 0-19.53 9.97-19.88 10.39l-.54.66.55.64c.91 1.09 9.25 10.66 19.88 10.66 11.24 0 20.24-10.09 20.62-10.51l.58-.67-.58-.66zm-12.55 6.42a9.612 9.612 0 0 1-7.71 3.85c-2 0-4.02-.62-5.74-1.9-4.25-3.18-5.12-9.21-1.95-13.46 3.17-4.24 9.2-5.12 13.45-1.94 4.25 3.17 5.12 9.2 1.95 13.45z" />
      </g>
    </svg>
  );
};
export const EyeOff = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
    >
      <g fill={fill}>
        <path d="M29.05 21.34l-7.49 7.49c2.38 1.35 5.45.74 7.12-1.5a5.474 5.474 0 0 0 .37-5.99zm15.25 2.41c-.06-.07-4.16-4.57-10.06-7.6l-3.01 3.01c2.06 2.93 2.11 6.96-.15 9.97-1.36 1.82-3.34 3-5.59 3.33-.41.05-.82.08-1.23.08-1.74 0-3.43-.53-4.86-1.55l-2.38 2.38c2.17.85 4.54 1.39 7.04 1.39 11.02 0 19.87-9.92 20.24-10.34l.3-.34-.3-.33zM37.8 6.19l-8.1 8.1c-1.8-.55-3.7-.88-5.65-.88-10.77 0-19.15 9.8-19.51 10.22l-.25.33.26.32c.53.64 3.61 4.18 8.19 6.97l-6.72 6.72 1.61 1.62 10.12-10.11 2.13-2.14 7.7-7.69L39.42 7.81 37.8 6.19zM15.86 25.26a8.49 8.49 0 0 1 1.6-6.3 8.511 8.511 0 0 1 10.26-2.69l-2.38 2.38c-.35-.08-.7-.11-1.05-.11-.27 0-.54.02-.8.06a5.497 5.497 0 0 0-4.61 6.51l-2.37 2.37c-.32-.7-.54-1.44-.65-2.22z" />
      </g>
    </svg>
  );
};

export const Edit = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
    >
      <path
        fill={fill}
        d="M39.86 11.443l-3.306-3.304a1.953 1.953 0 0 0-2.752 0l-1.38 1.379 6.058 6.055 1.38-1.378a1.95 1.95 0 0 0 0-2.752zM9.021 32.92l-1.966 7.334c-.136.518.172.828.69.689l7.332-1.966 21.476-21.476-6.056-6.058L9.022 32.92z"
      />
    </svg>
  );
};

export const Map = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="76"
      height="69"
      viewBox="0 0 76 69"
      className={className}
    >
      <path
        fill={fill}
        d="M25.38.1l-24 8A2.06 2.06 0 0 0 0 10v56a2.1 2.1 0 0 0 2.62 1.88L26 60.13l23.38 7.78a2 2 0 0 0 1.25 0l24-8A2.05 2.05 0 0 0 76 58V2A2.1 2.1 0 0 0 73.38.1L50 7.89 26.63.1a2 2 0 0 0-1.25 0zM24 4.76v51.83L4 63.25V11.42l20-6.66zm4 0l20 6.66v51.83l-20-6.66V4.76zm44 0v51.83l-20 6.66V11.42l20-6.66z"
      />
    </svg>
  );
};

export const ExternalLink = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="68"
      height="68"
      viewBox="0 0 68 68"
      className={className}
    >
      <g fill={fill}>
        <path d="M67.64 25.15V1.74a.46.46 0 0 0-.13-.37l-.13-.12a.43.43 0 0 0-.11-.25 2.12 2.12 0 0 0-.75-.75.46.46 0 0 0-.38-.13L65.77 0H42.25a2.5 2.5 0 1 0 0 5h16.88L22.48 41.21a2.4 2.4 0 0 0 0 3.49 2.43 2.43 0 0 0 3.5 0L62.64 8.34v16.81a2.5 2.5 0 0 0 5 0z" />
        <path d="M63.14 42.95v20.19H4.5V4.5h19.88a2.34 2.34 0 0 0 2.37-2A2.25 2.25 0 0 0 24.51 0H2.81A2.81 2.81 0 0 0 0 2.81v62a2.82 2.82 0 0 0 2.82 2.82h62a2.81 2.81 0 0 0 2.81-2.81V42.95a2.25 2.25 0 0 0-2.25-2.25 2.25 2.25 0 0 0-2.24 2.25z" />
      </g>
    </svg>
  );
};

export const Close = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      />
    </svg>
  );
};

export const CloseRect = ({ className }) => {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g
        id="close"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Group-9">
          <rect
            id="Rectangle-Copy"
            stroke="var(--color-green)"
            x="0.5"
            y="0.5"
            width="15"
            height="15"
          />
          <polygon
            id="Path"
            fill="var(--color-green)"
            fillRule="nonzero"
            points="11.2168884 4 8 7.21688843 4.7829235 4 4 4.7829235 7.21688843 8 4 11.2168884 4.7829235 12 8 8.78273544 11.2168884 12 12 11.2168884 8.78273544 8 12 4.7829235"
          />
        </g>
      </g>
    </svg>
  );
};

export const Fit = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        d="M2.4,0.1C1,0.1,0,1.2,0,2.6v7.6h4v-6h6v-4C10,0.1,2.4,0.1,2.4,0.1z M14,0.1v4h6v6h4V2.6c0-1.3-1.1-2.5-2.4-2.5L14,0.1L14,0.1z M0,14.1v7.6c0,1.3,1.1,2.5,2.4,2.5H10v-4H4v-6H0z M20,14.1v6h-6v4h7.6c1.3,0,2.4-1.1,2.4-2.5v-7.6H20z"
      />
    </svg>
  );
};

export const Pin = ({ className, fill }) => {
  return (
    <svg
      data-testid="pin-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 48 48"
      className={className}
    >
      <path
        fill={fill}
        d="M24,2C13.8708,2,5.6667,10.1584,5.6667,20.2233
        c0,5.0325,2.0533,9.5884,5.3717,12.8883L24,46l12.9617-12.8883c3.3183-3.3,5.3717-7.8558,5.3717-12.8883
        C42.3333,10.1584,34.1292,2,24,2z M24,25c-2.765,0-5-2.235-5-5s2.235-5,5-5s5,2.235,5,5S26.765,25,24,25z"
      />
    </svg>
  );
};

export const Dialogue = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"
      />
    </svg>
  );
};

export const Save = ({ className, fill }) => {
  return (
    <svg
      data-testid="save"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <rect fill={fill} x="9" y="3.5" width="5.6" height="3" />
      <path
        fill={fill}
        d="M20.4,6.6l-2.8-2.8c-0.2-0.2-0.5-0.3-0.8-0.3h-0.2v4.7H6.9V3.5H3.3v17h17.5V7.4C20.7,7.1,20.6,6.9,20.4,6.6z M18.3,19.1H6
  V14c0-1.3,1.1-2.4,2.4-2.4H16c1.3,0,2.3,1,2.3,2.3L18.3,19.1L18.3,19.1z"
      />
    </svg>
  );
};

export const Undo = ({ className, fill }) => {
  return (
    <svg
      data-testid="undo"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        d="M4.9,11.8c2.3-4,7.3-5.7,11.5-3.9c2.2,0.9,4,2.8,4.9,5.1l0.1,0.2L19,14.5l-0.1-0.3c-0.5-1.7-1.8-3.1-3.5-3.8
  c-2.9-1.2-6.3-0.2-7.9,2.5l2.2,0.9L4.1,17l-1.5-6.2L4.9,11.8z"
      />
    </svg>
  );
};

export const Redo = ({ className, fill }) => {
  return (
    <svg
      data-testid="redo"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        d="M19.1,11.8c-2.3-4-7.3-5.7-11.5-3.9c-2.2,0.9-4,2.8-4.9,5.1l-0.1,0.2L5,14.5l0.1-0.3c0.5-1.7,1.8-3.1,3.5-3.8
  c2.9-1.2,6.3-0.2,7.9,2.5l-2.2,0.9l5.5,3.2l1.5-6.2L19.1,11.8z"
      />
    </svg>
  );
};

export const Reset = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        d="M17.5,15.7l1.4,1.8c-1.6,2-4.1,3.3-7,3.3c-4.9,0-8.9-4-8.9-8.9c0-0.2,0-0.5,0.1-0.7H0.9l3.3-4.4l3.3,4.4H5.4
  c-0.1,0.2-0.1,0.5-0.1,0.7c0,3.7,3,6.7,6.7,6.7C14.3,18.7,16.4,17.5,17.5,15.7L17.5,15.7z M20.8,11.3c-0.4-4.5-4.1-8.1-8.8-8.1
  c-2.4,0-4.7,1-6.4,2.7L7,7.6c1.2-1.4,3-2.2,5-2.2c3.4,0,6.2,2.6,6.6,5.9h-2.1l3.3,4.4l3.3-4.4H20.8z"
      />
    </svg>
  );
};

export const Add = ({ className, fill }) => {
  return (
    <svg
      data-testid="add-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        d="M13.2,10.8V3.1c0-0.3-0.2-0.5-0.5-0.5h-1.4c-0.3,0-0.5,0.2-0.5,0.5v7.7H3.1c-0.3,0-0.5,0.2-0.5,0.5v1.4
  c0,0.3,0.2,0.5,0.5,0.5h7.7v7.7c0,0.3,0.2,0.5,0.5,0.5h1.4c0.3,0,0.5-0.2,0.5-0.5v-7.7h7.7c0.3,0,0.5-0.2,0.5-0.5v-1.4
  c0-0.3-0.2-0.5-0.5-0.5H13.2z"
      />
    </svg>
  );
};

export const Polygon = ({ className, fill }) => {
  return (
    <svg
      data-testid="polygon-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <polygon fill={fill} points="12,3.3 2.6,10 6.2,21 17.8,21 21.4,10 " />
    </svg>
  );
};

export const Line = ({ className, fill }) => {
  return (
    <svg
      data-testid="line-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <polygon
        fill={fill}
        points="18.5,3.7 3.9,19.2 3.5,19.6 4.9,20.9 19.9,5 "
      />
    </svg>
  );
};

export const RectCircle = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      version="1.1"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g className={className}>
          <rect stroke={fill} x="0.5" y="0.5" />
          <circle fill={fill} cx="10" cy="10" r="4" />
        </g>
      </g>
    </svg>
  );
};

export const RectLine = ({ className, fill }) => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g className={className}>
          <rect stroke={fill} x="0.5" y="0.5" />
          <path
            stroke={fill}
            d="M14,6 L7,15"
            strokeWidth="2"
            strokeLinecap="square"
          />
        </g>
      </g>
    </svg>
  );
};

export const RectPolygon = ({ className, fill }) => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g className={className}>
          <polygon
            fill={fill}
            points="10 5 14.7552826 8.45491503 12.9389263 14.045085 7.06107374 14.045085 5.24471742 8.45491503"
          />
          <rect stroke={fill} x="0.5" y="0.5" />
        </g>
      </g>
    </svg>
  );
};

export const Transform = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <polygon
        fill={fill}
        points="20.2,10.4 17.4,8.7 17.4,11 13,11 13,6.6 15.3,6.6 13.6,3.8 12,1 10.4,3.8 8.7,6.6 11,6.6 11,11 6.6,11 6.6,8.7
  3.8,10.4 1,12 3.8,13.6 6.6,15.3 6.6,13 11,13 11,17.4 8.7,17.4 10.4,20.2 12,23 13.6,20.2 15.3,17.4 13,17.4 13,13 17.4,13
  17.4,15.3 20.2,13.6 23,12 "
      />
    </svg>
  );
};

export const Reshape = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        d="M22.5,7.2V1.7h-5.5v2H6.9v-2H1.5v5.5h2.2v9.7H1.5v5.5h5.5v-1.7h10.2v1.7h5.5v-5.5h-2V7.2H22.5z M17.1,16.8v2.2H6.9v-2.2H5.2V7.2h1.7v-2h10.2v2h2v9.7H17.1z"
      />
    </svg>
  );
};

export const QuestionMark = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 400 400"
      className={className}
    >
      <path
        fill={fill}
        d="M200.6,0C89.8,0,0,89.8,0,200.6s89.8,200.6,200.6,200.6s200.6-89.8,200.6-200.6S311.3,0,200.6,0z M218.3,306.3h-41v-41h41
        V306.3z M266.8,164.9c-4.9,8.8-14,19-27.8,31.2c-8.6,7.6-14.3,13.3-16.8,16.7c-2.4,3.3-4.1,7.1-5.3,11.3c-1.2,4.4-1.9,11.9-2.1,22.4
        l-0.1,4.7h-35.8l-0.1-4.6c-0.1-3.7-0.2-6.4-0.2-8.3c0-11.3,1.7-21.2,4.9-29.6c2.4-6.3,6.3-12.7,11.6-19.1c3.9-4.6,10.5-11,20.2-19.6
        c9-8,14.9-14.3,17.4-18.7c2.4-4.2,3.6-8.9,3.6-13.9c0-9.4-3.6-17.4-11-24.6c-7.4-7.2-16.3-10.7-27.2-10.7c-10.5,0-18.9,3.2-25.9,9.6
        c-7,6.5-11.6,17.1-13.9,31.4l-0.7,4.6l-37.6-4.5l0.6-4.8c2.7-21.9,10.8-39,24.2-50.8C158.3,76,176.1,70,197.8,70
        c23,0,41.6,6.4,55.4,19.1c14,12.8,21,28.5,21,46.6C274.3,146.2,271.7,156,266.8,164.9z"
      />
    </svg>
  );
};

export const ExclamationPoint = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 400 400"
      className={className}
    >
      <path
        fill={fill}
        d="M200.6,0C89.8,0,0,89.8,0,200.6s89.8,200.6,200.6,200.6s200.6-89.8,200.6-200.6S311.3,0,200.6,0z M223.3,330.3h-1h-40v-37
  v-1h41V330.3z M224.3,124.2l-9.7,141.1h-0.5h-22.5h-0.5l0-0.5l-10.8-140.6v0v0V66.3l0,0v-1h44V124.2z"
      />
    </svg>
  );
};

export const Checkmark = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 48 48"
      className={className}
    >
      <path
        fill="none"
        stroke={fill}
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="3"
        d="M42 7L20 39 7 27"
      />
    </svg>
  );
};

export const Cancel = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 48 48"
      className={className}
    >
      <g fill="none" stroke={fill} strokeMiterlimit="10" strokeWidth="3">
        <path d="M10.5 10.5l27 27M10.5 37.5l27-27" />
      </g>
    </svg>
  );
};

export const Exit = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <polygon
        fill={fill}
        points="14,20 4,20 4,4 14,4 14,8 16,8 16,2 2,2 2,22 16,22 16,16 14,16  "
      />
      <polygon
        fill={fill}
        points="18.4,8.4 17,9.8 18.2,11 9,11 9,13 18.2,13 17,14.2 18.4,15.6 22,12  "
      />
    </svg>
  );
};

export const Upload = ({ className, fill = '#000' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 48 48"
      className={className}
    >
      <g fill="none" strokeMiterlimit="10" strokeWidth="2">
        <path stroke="#2DD5C9" d="M23.5 42.166v-22" />
        <path
          stroke={fill}
          d="M28.5 32h9.747c3.453 0 6.253-2.546 6.253-6s-2.8-6.582-6.253-6.582a6.27 6.27 0 0 0-1.356.151c.002-.483-.02-.97-.076-1.463-.773-6.863-6.965-11.8-13.828-11.026a12.488 12.488 0 0 0-9.594 6.47 9.412 9.412 0 0 0-1.513-.133C6.7 13.417 2.5 17.819 2.5 23s4.2 9 9.38 9h6.62"
        />
        <path stroke="#2DD5C9" d="M29.5 26l-6-6-6 6" />
      </g>
    </svg>
  );
};

export const Gear = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className={className}
    >
      <path
        fill={fill}
        d="M25.7,15.5v-2.9l-3.3-1.1c-0.2-0.5-0.4-1.1-0.6-1.6l1.6-3.1l-2.1-2.1l-3.1,1.6c-0.5-0.3-1-0.5-1.6-0.6l-1.1-3.3h-2.9
          l-1.1,3.3C10.9,5.8,10.4,6,9.9,6.2L6.7,4.7L4.7,6.8l1.6,3.1c-0.3,0.5-0.5,1-0.6,1.6l-3.3,1.1v2.9l3.3,1.1c0.2,0.5,0.4,1.1,0.6,1.6
          l-1.6,3.1l2.1,2.1l3.1-1.6c0.5,0.3,1,0.5,1.6,0.6l1.1,3.3h2.9l1.1-3.3c0.5-0.2,1.1-0.4,1.6-0.6l3.1,1.6l2.1-2.1l-1.6-3.1
          c0.3-0.5,0.5-1,0.6-1.6L25.7,15.5z M14,18.4c-2.4,0-4.4-2-4.4-4.4s2-4.4,4.4-4.4s4.4,2,4.4,4.4v0C18.4,16.4,16.4,18.4,14,18.4z"
      />
    </svg>
  );
};

export const Brush = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 48 48"
      className={className}
    >
      <path
        fill={fill}
        d="M36.2,8.4C44,9.1,44.5,21.2,34.8,22c-3.2,0.3-12.6-0.6-12.6,3.2v1c1.3,0.5,2.4,1.6,2.4,3.3v11c0,1.9-1.6,3.5-3.5,3.5l0,0
    c-1.9,0-3.5-1.6-3.5-3.5v-11c0-1.9,1.1-3,2.6-3.3v-1c0-6.4,10.7-4.9,14.5-5.3c6.9-0.6,6.9-8.8,1.6-9.4v1c0,1.8-1.4,3.2-3.3,3.2H9.1
    c-1.8,0-3.2-1.4-3.2-3.2V7.2C5.9,5.4,7.4,4,9.1,4h23.8c1.9,0,3.3,1.4,3.3,3.2V8.4z"
      />
    </svg>
  );
};

export const LegendPoint = ({ className, fill, outline, outlineWidth }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className={className}
    >
      <circle
        cx="14"
        cy="14"
        r="12.5"
        fill={fill}
        stroke={outline}
        strokeWidth={outlineWidth}
      />
    </svg>
  );
};

export const LegendLine = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 28 28"
      className={className}
    >
      <path
        fill={fill}
        d="M21 24.556l-3.444 1.556L7 3.444l3.444-1.556L21 24.556z"
      />
    </svg>
  );
};

export const LegendPolygon = ({ className, fill, outline, outlineWidth }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 28 28"
      className={className}
    >
      <path
        fill={fill}
        stroke={outline}
        strokeWidth={outlineWidth}
        d="M14,2.165l12.5,9.043l-4.787,14.627H6.288L1.5,11.207L14,2.165z"
      />
    </svg>
  );
};

export const LegendMultiple = ({ className }) => {
  return (
    <svg width="18px" height="18px" viewBox="0 0 20 20" className={className}>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Group-2" fillRule="nonzero">
          <g id="Group">
            <path
              d="M5.76,10.24 C3.04,10.24 0.88,8.08 0.88,5.36 C0.88,2.64 3.04,0.48 5.76,0.48 C8.48,0.48 10.64,2.64 10.64,5.36 C10.64,8.08 8.48,10.24 5.76,10.24 Z M5.76,2.32 C4.08,2.32 2.64,3.68 2.64,5.44 C2.64,7.2 4,8.56 5.76,8.56 C7.52,8.56 8.88,7.2 8.88,5.44 C8.88,3.68 7.52,2.32 5.76,2.32 Z"
              id="Shape"
              fill="#06B87C"
            />
            <path
              d="M8,19.12 L0.08,19.12 L0.08,11.2 L8,11.2 L8,19.12 Z M1.84,17.28 L6.24,17.28 L6.24,12.88 L1.84,12.88 L1.84,17.28 Z"
              id="Shape"
              fill="#EC610E"
            />
            <path
              d="M17.28,17.28 L10.32,17.28 L8.16,10.64 L13.84,6.56 L19.52,10.64 L17.28,17.28 Z M11.52,15.52 L16,15.52 L17.36,11.28 L13.76,8.64 L10.16,11.28 L11.52,15.52 Z"
              id="Shape"
              fill="#52A3DB"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const LegendPointRect = ({ className, fill, outline, outlineWidth }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      className={className}
    >
      <path
        fill={fill}
        stroke={outline}
        strokeWidth={outlineWidth}
        d="M1.5,1.5h25v25h-25V1.5z"
        shapeRendering="crispEdges"
      />
    </svg>
  );
};

export const Home = ({ className, fill }) => {
  return (
    <svg
      data-testid="home-btn"
      xmlns="http://www.w3.org/2000/svg"
      height="18"
      width="18"
      className={className}
      viewBox="0 0 48 48"
    >
      <path
        fill={fill}
        d="M24,1.3412c-0.5992,0-1.1984,0.2437-1.6584,0.732L1,25h7v21h12V34h8v12h12V25h7L25.6584,2.0732
		        C25.1984,1.5849,24.5992,1.3412,24,1.3412L24,1.3412z"
      />
    </svg>
  );
};

export const NewEmptyLayer = ({ className, color = '#000' }) => {
  return (
    <svg
      width="64"
      height="64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <g>
        <g id="svg_1">
          <path
            fill={color}
            stroke={color}
            d="m54,12l-28,0c-1.104,0 -2,0.896 -2,2l0,6l-6,0c-1.104,0 -2,0.896 -2,2l0,6l-6,0c-1.104,0 -2,0.896 -2,2l0,20c0,1.104 0.896,2 2,2l28,0c1.104,0 2,-0.896 2,-2l0,-6l6,0c1.104,0 2,-0.896 2,-2l0,-6l6,0c1.104,0 2,-0.896 2,-2l0,-20c0,-1.104 -0.896,-2 -2,-2zm-18,36l-24,0l0,-16l24,0l0,16zm8,-8l-4,0l0,-10c0,-1.104 -0.896,-2 -2,-2l-18,0l0,-4l24,0l0,16zm8,-8l-4,0l0,-10c0,-1.104 -0.896,-2 -2,-2l-18,0l0,-4l24,0l0,16z"
            id="svg_2"
          />
          <path
            fill={color}
            stroke={color}
            d="m20,40l-2,0c-1.104,0 -2,0.896 -2,2s0.896,2 2,2l2,0c1.104,0 2,-0.896 2,-2s-0.896,-2 -2,-2z"
            id="svg_3"
          />
        </g>
      </g>
    </svg>
  );
};

export const Filter = ({ fill = 'var(--color-green)' }) => {
  return (
    <svg
      width="68px"
      height="61px"
      viewBox="0 0 68 61"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="noun_filter_837939" fill={fill} fillRule="nonzero">
          <path
            d="M28,58.3 L28,32 L40,32 L40,52.9 C40,53.6 39.7,54.2 39.1,54.6 L31.1,59.9 C29.8,60.8 28,59.9 28,58.3 Z M40,30 L28,30 L1.4,3.4 C0.2,2.2 1,0 2.8,0 L65.1,0 C66.9,0 67.8,2.2 66.5,3.4 L40,30 Z"
            id="Shape"
          />
        </g>
      </g>
    </svg>
  );
};

export const UploadNew = ({ className, fill = '#2dd5c9' }) => {
  return (
    <svg
      height="512pt"
      viewBox="0 0 512 512"
      width="512pt"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill={fill}
        d="m130.5 182.066406-28.285156-28.28125 153.785156-153.785156 153.785156 153.785156-28.285156 28.28125-105.5-105.5v355.71875h-40v-355.71875zm-130.5 289.21875v40h512v-40zm0 0"
      />
    </svg>
  );
};

export const Copy = ({ className, fill }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g
        id="Icons-24-/-Outline-/-Map-+-View-/-layers_"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <rect
          id="Rectangle"
          x="4.9999926e-08"
          y="-1.13686838e-13"
          width="24"
          height="24"
        />
        <path
          d="M18,17 L18,3 C18,2.44771525 17.5522848,2 17,2 L3.00000005,2 C2.4477153,2 2.00000005,2.44771525 2.00000005,3 L2.00000005,17 C2.00000005,17.5522847 2.4477153,18 3.00000005,18 L17,18 C17.5522848,18 18,17.5522847 18,17 Z M16,16 L4.00000005,16 L4.00000005,4 L16,4 L16,16 Z M20,8 L20,20 L8.00000005,20 L8.00000005,22 L20,22 C21.1045695,22 22,21.1045695 22,20 L22,8 L20,8 Z"
          id="---↳-🌈-Color"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export const Smiley = () => {
  return (
    <svg width="57px" height="57px" viewBox="0 0 57 57" version="1.1">
      <defs>
        <polygon
          id="path-1"
          points="0.0066796875 0 57 0 57 57 0.0066796875 57"
        />
      </defs>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Publish-_link-copied"
          transform="translate(-779.000000, -247.000000)"
        >
          <g id="Group-4" transform="translate(407.000000, 196.000000)">
            <g id="smile" transform="translate(372.000000, 51.000000)">
              <g id="Group-3">
                <mask id="mask-2" fill="white">
                  <use href="#path-1" />
                </mask>
                <g id="Clip-2" />
                <path
                  d="M28.5,0 C44.240127,0 57,12.759873 57,28.5 C57,44.240127 44.240127,57 28.5,57 C12.759873,57 0,44.240127 0,28.5 C0,12.759873 12.759873,0 28.5,0"
                  id="Fill-1"
                  fill="#F8C642"
                  mask="url(#mask-2)"
                />
              </g>
              <path
                d="M28.5008808,47 C20.2585369,47 13.0766528,41.4322352 11.0367652,33.462724 C10.8764631,32.8354939 11.2551987,32.1977222 11.884076,32.03784 C12.5094301,31.874444 13.1506383,32.2557014 13.3109404,32.8829315 C15.0865939,39.815844 21.3313276,44.6579898 28.4991192,44.6579898 C35.6669109,44.6579898 41.9134061,39.815844 43.687298,32.8829315 C43.8458385,32.2557014 44.4852852,31.874444 45.115924,32.03784 C45.7448013,32.1977222 46.1235369,32.8354939 45.9632348,33.462724 C43.9251088,41.4322352 36.7432246,47 28.5008808,47"
                id="Fill-4"
                fill="#353A3F"
              />
              <path
                d="M19.5,16 C21.9852544,16 24,18.4624013 24,21.5 C24,24.5375987 21.9852544,27 19.5,27 C17.0147456,27 15,24.5375987 15,21.5 C15,18.4624013 17.0147456,16 19.5,16"
                id="Fill-6"
                fill="#353A3F"
              />
              <path
                d="M43,21.5 C43,24.5375987 40.9852544,27 38.5,27 C36.0147456,27 34,24.5375987 34,21.5 C34,18.4624013 36.0147456,16 38.5,16 C40.9852544,16 43,18.4624013 43,21.5 Z"
                id="Fill-8"
                fill="#353A3F"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const ShareIcon = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" version="1.1">
      <g
        id="Icons-24-/-Outline-/-Discovery-+-Sharing-/-share-Android_"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <rect
          id="Rectangle"
          x="4.9999926e-08"
          y="-1.13686838e-13"
          width="24"
          height="24"
        />
        <path
          d="M20,19 C20,20.6568542 18.6568543,22 17,22 C15.3431458,22 14,20.6568542 14,19 C14.0023758,18.7534204 14.0359765,18.5081347 14.1,18.27 L7.82000005,14.87 C7.29906195,15.2743205 6.65941904,15.4957354 6.00000005,15.5 C4.3431458,15.5 3.00000005,14.1568542 3.00000005,12.5 C3.00000005,10.8431458 4.3431458,9.5 6.00000005,9.5 C6.58996383,9.50315661 7.16643696,9.6767931 7.66000005,10 L14.16,5.94 C14.0607422,5.63623705 14.0068288,5.31949555 14,5 C13.9964753,3.63060469 14.9207036,2.4326252 16.2461676,2.08853037 C17.5716315,1.74443555 18.9618773,2.34156992 19.6249052,3.53975604 C20.2879331,4.73794215 20.0554411,6.23303421 19.0598759,7.17330332 C18.0643108,8.11357242 16.5583853,8.26034205 15.4,7.53 L8.85000005,11.62 C8.94591458,11.903633 8.9965354,12.2006085 9.00000005,12.5 C9.00088464,12.7296934 8.97060864,12.9584454 8.91000005,13.18 L15.22,16.6 C16.1289191,15.9300148 17.3370526,15.827143 18.3461628,16.3338093 C19.355273,16.8404755 19.9944131,17.8708486 20,19 Z"
          id="---↳-🌈-Color"
          fillOpacity="0.8"
          fill="var(--color-green)"
        />
      </g>
    </svg>
  );
};

export const Facebook = () => {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="var(--color-green)"
        d="m75 512h167v-182h-60v-60h60v-75c0-41.355469 33.644531-75 75-75h75v60h-60c-16.542969 0-30 13.457031-30 30v60h87.292969l-10 60h-77.292969v182h135c41.355469 0 75-33.644531 75-75v-362c0-41.355469-33.644531-75-75-75h-362c-41.355469 0-75 33.644531-75 75v362c0 41.355469 33.644531 75 75 75zm-45-437c0-24.8125 20.1875-45 45-45h362c24.8125 0 45 20.1875 45 45v362c0 24.8125-20.1875 45-45 45h-105v-122h72.707031l20-120h-92.707031v-30h90v-120h-105c-57.898438 0-105 47.101562-105 105v45h-60v120h60v122h-137c-24.8125 0-45-20.1875-45-45zm0 0"
      />
    </svg>
  );
};

export const Linkedin = () => {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="var(--color-green)"
        d="m437 0h-362c-41.355469 0-75 33.644531-75 75v362c0 41.355469 33.644531 75 75 75h362c41.355469 0 75-33.644531 75-75v-362c0-41.355469-33.644531-75-75-75zm45 437c0 24.8125-20.1875 45-45 45h-362c-24.8125 0-45-20.1875-45-45v-362c0-24.8125 20.1875-45 45-45h362c24.8125 0 45 20.1875 45 45zm0 0"
      />
      <path
        fill="var(--color-green)"
        d="m91 422h90v-212h-90zm30-182h30v152h-30zm0 0"
      />
      <path
        fill="var(--color-green)"
        d="m331.085938 210c-.027344 0-.058594 0-.085938 0-10.371094 0-20.472656 1.734375-30 5.101562v-5.101562h-90v212h90v-107c0-8.269531 6.730469-15 15-15s15 6.730469 15 15v107h90v-117.3125c0-48.546875-39.382812-94.640625-89.914062-94.6875zm59.914062 182h-30v-77c0-24.8125-20.1875-45-45-45s-44.996094 20.1875-45 44.996094v77.003906h-30v-152h30v30.019531l24.007812-18.03125c10.441407-7.84375 22.886719-11.988281 35.992188-11.988281h.058594c31.929687.03125 59.941406 30.257812 59.941406 64.6875zm0 0"
      />
      <path
        fill="var(--color-green)"
        d="m91 180h90v-90h-90zm30-60h30v30h-30zm0 0"
      />
    </svg>
  );
};

export const Twitter = () => {
  return (
    <svg viewBox="0 -47 512.00004 512" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="var(--color-green)"
        d="m512 55.964844c-32.207031 1.484375-31.503906 1.363281-35.144531 1.667968l19.074219-54.472656s-59.539063 21.902344-74.632813 25.820313c-39.640625-35.628907-98.5625-37.203125-140.6875-11.3125-34.496094 21.207031-53.011719 57.625-46.835937 100.191406-67.136719-9.316406-123.703126-41.140625-168.363282-94.789063l-14.125-16.964843-10.554687 19.382812c-13.339844 24.492188-17.769531 52.496094-12.476563 78.851563 2.171875 10.8125 5.863282 21.125 10.976563 30.78125l-12.117188-4.695313-1.4375 20.246094c-1.457031 20.566406 5.390625 44.574219 18.320313 64.214844 3.640625 5.53125 8.328125 11.605469 14.269531 17.597656l-6.261719-.960937 7.640625 23.199218c10.042969 30.480469 30.902344 54.0625 57.972657 67.171875-27.035157 11.472657-48.875 18.792969-84.773438 30.601563l-32.84375 10.796875 30.335938 16.585937c11.566406 6.324219 52.4375 27.445313 92.820312 33.78125 89.765625 14.078125 190.832031 2.613282 258.871094-58.664062 57.308594-51.613282 76.113281-125.03125 72.207031-201.433594-.589844-11.566406 2.578125-22.605469 8.921875-31.078125 12.707031-16.964844 48.765625-66.40625 48.84375-66.519531zm-72.832031 48.550781c-10.535157 14.066406-15.8125 32.03125-14.867188 50.578125 3.941407 77.066406-17.027343 136.832031-62.328125 177.628906-52.917968 47.660156-138.273437 66.367188-234.171875 51.324219-17.367187-2.722656-35.316406-8.820313-50.171875-14.910156 30.097656-10.355469 53.339844-19.585938 90.875-37.351563l52.398438-24.800781-57.851563-3.703125c-27.710937-1.773438-50.785156-15.203125-64.96875-37.007812 7.53125-.4375 14.792969-1.65625 22.023438-3.671876l55.175781-15.367187-55.636719-13.625c-27.035156-6.621094-42.445312-22.796875-50.613281-35.203125-5.363281-8.152344-8.867188-16.503906-10.96875-24.203125 5.578125 1.496094 12.082031 2.5625 22.570312 3.601563l51.496094 5.09375-40.800781-31.828126c-29.398437-22.929687-41.179687-57.378906-32.542969-90.496093 91.75 95.164062 199.476563 88.011719 210.320313 90.527343-2.386719-23.183593-2.449219-23.238281-3.074219-25.445312-13.886719-49.089844 16.546875-74.015625 30.273438-82.453125 28.671874-17.621094 74.183593-20.277344 105.707031 8.753906 6.808593 6.265625 16.015625 8.730469 24.632812 6.589844 7.734375-1.921875 14.082031-3.957031 20.296875-6.171875l-12.9375 36.945312 16.515625.011719c-3.117187 4.179688-6.855469 9.183594-11.351562 15.183594zm0 0"
      />
    </svg>
  );
};

export const Setting = () => {
  return (
    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
      <g
        id="Icons-24-/-Outline-/-Core-UI-/-settings_"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <rect
          id="Rectangle"
          x="4.9999926e-08"
          y="-5.68434189e-14"
          width="24"
          height="24"
        />
        <path
          d="M20.27,12 C20.2706808,11.6890114 20.2506364,11.378323 20.21,11.07 L22.1,9.48 L19.1,4.33 L16.85,5.18 C16.3646323,4.81807365 15.8416004,4.5096189 15.29,4.26 L14.77,2 L9.18000005,2 L8.64000005,4.26 C8.08525394,4.50960363 7.55890518,4.8180373 7.07000005,5.18 L4.86000005,4.34 L1.86000005,9.48 L3.70000005,11.05 C3.66288193,11.3585616 3.64617893,11.6692374 3.65000005,11.98 C3.64643759,12.2907572 3.66313968,12.6014161 3.70000005,12.91 L1.90000005,14.48 L4.90000005,19.62 L7.12000005,18.78 C7.60536777,19.1419263 8.12839973,19.4503811 8.68000005,19.7 L9.18000005,22 L14.77,22 L15.32,19.72 C15.8704226,19.4681186 16.3932223,19.1598009 16.88,18.8 L19.13,19.65 L22.13,14.52 L20.25,12.93 C20.2768748,12.6207643 20.2835557,12.3101052 20.27,12 Z M18.27,11.29 C18.27,11.52 18.27,11.76 18.27,12 C18.27,12.24 18.27,12.48 18.27,12.71 L18.15,13.77 L18.97,14.46 L19.56,14.97 L18.29,17.18 L17.63,16.93 L16.63,16.53 L15.75,17.19 C15.3841475,17.4668246 14.9883275,17.7016331 14.57,17.89 L13.67,18.29 L13.44,19.29 L13.26,20.04 L10.76,20.04 L10.58,19.29 L10.36,18.29 L9.46000005,17.89 C9.04167259,17.7016331 8.64585257,17.4668246 8.28000005,17.19 L7.40000005,16.53 L6.40000005,16.93 L5.77000005,17.16 L4.46000005,14.92 L5.00000005,14.44 L5.82000005,13.75 L5.70000005,12.69 C5.6466561,12.2181696 5.6466561,11.7418304 5.70000005,11.27 L5.82000005,10.21 L5.00000005,9.52 L4.46000005,9 L5.74000005,6.82 L6.36000005,7.05 L7.36000005,7.44 L8.24000005,6.79 C8.60932297,6.51302208 9.00847171,6.2782287 9.43000005,6.09 L10.33,5.68 L10.55,4.68 L10.76,4 L13.2,4 L13.37,4.75 L13.6,5.75 L14.5,6.15 C14.9192569,6.33862631 15.3180184,6.56984096 15.69,6.84 L16.57,7.5 L17.57,7.11 L18.23,6.86 L19.53,9 L18.94,9.49 L18.11,10.18 L18.27,11.29 Z M12,7.48 C9.51471868,7.48 7.50000005,9.49471863 7.50000005,11.98 C7.50000005,14.4652814 9.51471868,16.48 12,16.48 C14.4852814,16.48 16.5,14.4652814 16.5,11.98 C16.4945006,9.49700015 14.4829999,7.48549947 12,7.48 Z M12,14.48 C10.6192882,14.48 9.50000005,13.3607119 9.50000005,11.98 C9.50000005,10.5992881 10.6192882,9.48 12,9.48 C13.3807119,9.48 14.5,10.5992881 14.5,11.98 C14.5,13.3607119 13.3807119,14.48 12,14.48 Z"
          id="---↳-🌈-Color"
          fill="var(--color-green)"
        />
      </g>
    </svg>
  );
};

export const CardsIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="22px"
      height="16px"
      viewBox="0 0 22 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Page-2"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Group-5" stroke="#D8D8D8">
          <g id="Group-4">
            <path
              d="M19.3568355,3.26120747 L17.9761597,11.7913958 L16.4670335,12.0146396 L16.3361866,12.0166842 L6.56661778,10.8814905 L3.24222389,10.6633566 C3.22370487,10.6621415 3.20513255,10.6619584 3.18659317,10.6628081 C2.9107404,10.6754516 2.69736711,10.909324 2.7100106,11.1851768 L2.82131508,13.6135927 C2.833551,13.8805532 3.05354993,14.0906997 3.32079071,14.0906997 L20.3655751,14.0906997 C20.6417175,14.0906997 20.8655751,13.8668421 20.8655751,13.5906997 L20.8655751,3.67822821 C20.8652823,3.65727585 20.8652823,3.65727585 20.8638201,3.63637252 C20.8407038,3.3611994 20.5988925,3.15686693 20.3237194,3.17998319 L19.3568355,3.26120747 Z"
              id="Rectangle"
              transform="translate(11.787521, 8.634436) rotate(-6.000000) translate(-11.787521, -8.634436) "
            />
            <rect
              id="Rectangle"
              x="0.5"
              y="0.5"
              width="18"
              height="11"
              rx="1"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const AttributeIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="17px"
      height="19px"
      viewBox="0 0 17 19"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Page-2"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Group-2" transform="translate(0.000000, 1.000000)">
          <path
            d="M9.5,0.577350269 L14.8612159,3.67264973 C15.4800181,4.02991532 15.8612159,4.69016936 15.8612159,5.40470054 L15.8612159,11.5952995 C15.8612159,12.3098306 15.4800181,12.9700847 14.8612159,13.3273503 L9.5,16.4226497 C8.88119785,16.7799153 8.11880215,16.7799153 7.5,16.4226497 L2.13878407,13.3273503 C1.51998191,12.9700847 1.13878407,12.3098306 1.13878407,11.5952995 L1.13878407,5.40470054 C1.13878407,4.69016936 1.51998191,4.02991532 2.13878407,3.67264973 L7.5,0.577350269 C8.11880215,0.220084679 8.88119785,0.220084679 9.5,0.577350269 Z"
            id="Polygon"
            stroke="#D8D8D8"
          />
          <text
            id="c"
            fontFamily="FiraGO-Book, FiraGO"
            fontSize="13"
            fontWeight="300"
            fill="#D8D8D8"
          >
            <tspan x="5" y="12">
              c
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
};

export const BaseMapIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="17px"
      height="17px"
      viewBox="0 0 17 17"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Page-2"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Group-3" transform="translate(1.000000, 1.000000)">
          <circle id="Oval" stroke="#D8D8D8" cx="7.5" cy="7.5" r="7.5" />
          <g id="Group" transform="translate(4.000000, 4.000000)">
            <path
              d="M3,0.340909091 C4.47372813,0.340909091 5.67272668,1.58142614 5.67272668,3.10624432 C5.67272668,3.84432955 5.3948389,4.53869318 4.89026526,5.061375 L3,7.01925 L1.10978384,5.06139205 C0.605177464,4.53869318 0.327273322,3.84434659 0.327273322,3.10624432 C0.327273322,1.58142614 1.52627187,0.340909091 3,0.340909091 Z M3,0 C1.34249153,0 0,1.39063636 0,3.10624432 C0,3.96405682 0.335978793,4.74063068 0.878990689,5.30311364 L3,7.5 L5.12100931,5.30313068 C5.66402121,4.74063068 6,3.96407386 6,3.10626136 C6,1.39063636 4.65750847,0 3,0 Z"
              id="Shape"
              fill="#D8D8D8"
              fillRule="nonzero"
            />
            <circle
              id="Oval"
              stroke="#D8D8D8"
              strokeWidth="0.5"
              cx="3"
              cy="3"
              r="1"
            />
          </g>
          <polyline
            id="Path-2"
            stroke="#D8D8D8"
            strokeWidth="0.5"
            points="3 2 3.3784389 3.8843453 4.44516897 3.83015831 5.5216547 3.75343056 5.98661567 4.39102897"
          />
          <polyline
            id="Path-2"
            stroke="#D8D8D8"
            strokeWidth="0.5"
            points="8.04404687 10.1717968 9.58296155 10.2801911 11.3448737 11.3938321 10.6956176 12.7038525 11.0330062 14.0911813"
          />
          <polyline
            id="Path-3"
            stroke="#D8D8D8"
            strokeWidth="0.5"
            points="11.8657908 1 12.6722647 3.81812306 11 5.86641296 11.1148664 7.2358717 12.5265559 8.77155293 13.5323693 11.8873065"
          />
        </g>
      </g>
    </svg>
  );
};

export const HexBinIcon = () => {
  return (
    <svg
      className="Accordion__attrIcon___BQ5Ud"
      width="17px"
      height="19px"
      viewBox="0 0 17 19"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Page-2"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Group-2" transform="translate(0.000000, 1.000000)">
          <path
            d="M9.5,0.577350269 L14.8612159,3.67264973 C15.4800181,4.02991532 15.8612159,4.69016936 15.8612159,5.40470054 L15.8612159,11.5952995 C15.8612159,12.3098306 15.4800181,12.9700847 14.8612159,13.3273503 L9.5,16.4226497 C8.88119785,16.7799153 8.11880215,16.7799153 7.5,16.4226497 L2.13878407,13.3273503 C1.51998191,12.9700847 1.13878407,12.3098306 1.13878407,11.5952995 L1.13878407,5.40470054 C1.13878407,4.69016936 1.51998191,4.02991532 2.13878407,3.67264973 L7.5,0.577350269 C8.11880215,0.220084679 8.88119785,0.220084679 9.5,0.577350269 Z"
            id="Polygon"
            stroke="#D8D8D8"
          />
        </g>
      </g>
    </svg>
  );
};

export const TagsIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="16px"
      height="16px"
      viewBox="0 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Page-2"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M19.41,10.5 L9,0 L0,0 L0,9 L10.5,19.41 C10.8751365,19.7855541 11.3841815,19.9965733 11.915,19.9965733 C12.4458185,19.9965733 12.9548635,19.7855541 13.33,19.41 L19.41,13.33 C19.7855541,12.9548635 19.9965733,12.4458185 19.9965733,11.915 C19.9965733,11.3841815 19.7855541,10.8751365 19.41,10.5 Z M11.91,18 L2,8.17 L2,2 L8.17,2 L18,11.92 L11.91,18 Z M3.21,5.31 L5.33,7.43 L7.45,5.31 L5.33,3.19 L3.21,5.31 Z"
          id="---↳-🌈-Color"
          fill="#D8D8D8"
        />
      </g>
    </svg>
  );
};

export const HexbinAdd = ({ fill = '#FFFFFF' }) => {
  return (
    <svg width="50px" height="50px" viewBox="0 0 50 50">
      <g
        id="Page-3"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Data-Hub_non-Pro-user02"
          transform="translate(-841.000000, -286.000000)"
        >
          <g id="Group-13" transform="translate(841.000000, 286.000000)">
            <g id="Group-10">
              <rect
                id="Rectangle"
                stroke={fill}
                strokeWidth="2"
                x="1"
                y="1"
                width="48"
                height="48"
              />
              <g id="Group-9" transform="translate(4.545455, 5.818182)">
                <polygon
                  id="Polygon"
                  stroke={fill}
                  points="3.82867215 18.4486804 8.25407179 20.6684624 8.52872452 24.7980353 4.77974777 27.645196 0.274982044 25.5148097 -1.36424205e-12 21.3997074"
                />
                <polygon
                  id="Polygon"
                  stroke={fill}
                  points="8.0332176 11.2639296 12.4586172 13.4837117 12.73327 17.6132845 8.98429322 20.4604452 4.4795275 18.330059 4.20454545 14.2149567"
                />
                <polygon
                  id="Polygon"
                  stroke={fill}
                  points="11.1866267 4.07917889 15.6120263 6.29896095 15.8866791 10.4285338 12.1377023 13.2756945 7.63293659 11.1453083 7.35795455 7.03020598"
                />
                <polygon
                  id="Polygon"
                  stroke={fill}
                  points="12.2377631 17.4222874 16.6631627 19.6420695 16.9378154 23.7716423 13.1888387 26.618803 8.68407295 24.4884168 8.40909091 20.3733145"
                />
                <polygon
                  id="Polygon"
                  stroke={fill}
                  points="28.0048085 23.5806452 32.4302082 25.8004272 32.7048609 29.9300001 28.9558841 32.7771608 24.4511184 30.6467745 24.1761364 26.5316723"
                />
                <polygon
                  id="Polygon"
                  stroke={fill}
                  points="35.646854 7.81818182 40.0722536 10.0379639 40.3469063 14.1675367 36.5979296 17.0146974 32.0931639 14.8843112 31.8181818 10.7692089"
                />
                <polygon
                  id="Polygon"
                  stroke={fill}
                  points="36.4138994 22.5542522 40.8392991 24.7740343 41.1139518 28.9036071 37.364975 31.7507678 32.8602093 29.6203816 32.5852273 25.5052793"
                />
                <polygon
                  id="Polygon"
                  stroke="#1AB3B0"
                  points="29.7181708 0 35.1717041 2.78717032 35.5101657 7.97228423 30.8902056 11.5471946 25.3388674 8.87227012 25 3.70532552"
                />
              </g>
            </g>
            <polygon
              id="Polygon"
              stroke="#1AB3B0"
              points="26.9380647 20 32.6457642 23.137837 33 28.9753138 28.1647231 33 22.3546606 29.9885311 22 24.1715095"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const ActivityLog = ({ fill = '#FFFFFF' }) => {
  return (
    <svg width="50px" height="50px" viewBox="0 0 25 25" version="1.1">
      <g
        id="Schema-Validation-Exploration"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Upload_SV_Non-Pro-(2)"
          transform="translate(-611.000000, -645.000000)"
        >
          <g id="time" transform="translate(611.000000, 645.000000)">
            <path
              d="M0.402731656,12.6436781 L0.417329838,12.6436781 C0.642246113,12.6438362 0.826756705,12.4636406 0.834420751,12.2363803 C1.06006693,5.72024806 6.46843266,0.62280658 12.9143642,0.850857504 C15.3937611,0.938609939 17.7810852,1.82219527 19.7303074,3.37364779 L17.5105496,3.37364779 C17.2802111,3.37364779 17.0934587,3.56243412 17.0934587,3.79528112 C17.0934587,4.02812812 17.2802111,4.21691444 17.5105496,4.21691444 L20.8472769,4.21691444 L20.8531162,4.21691444 C20.8857535,4.21422653 20.9179217,4.20774392 20.9490471,4.19751931 C20.9703709,4.19440976 20.9913818,4.1897718 21.0120278,4.18360541 C21.0237064,4.17854581 21.0324653,4.16800498 21.0437267,4.16168048 C21.0811606,4.14318131 21.1155185,4.11883199 21.1454969,4.08958118 L21.1496678,4.08662975 C21.1602515,4.07197799 21.1698967,4.05664107 21.1784471,4.04067171 C21.2002922,4.01379259 21.2186964,3.98417285 21.233086,3.95255035 C21.244556,3.91892509 21.2515944,3.88392952 21.2539405,3.84840692 C21.2587371,3.83101454 21.2622302,3.81325324 21.2643678,3.79528112 L21.2643678,0.422214526 C21.2643678,0.189367523 21.0776154,0.000581201692 20.8472769,0.000581201692 C20.6169384,0.000581201692 20.430186,0.189367523 20.430186,0.422214526 L20.430186,2.86431474 C15.0861565,-1.56188649 7.20438957,-0.770691556 2.82587345,4.63159082 C1.08801203,6.77580709 0.0952313812,9.43784178 0.000238925955,12.2081308 C-0.00747725592,12.4407143 0.172653882,12.635667 0.402731656,12.6436781 Z"
              id="Path"
              fill={fill}
            />
            <path
              d="M3.89936623,20.2560992 C3.74468502,20.0828705 3.47778617,20.0668753 3.30319027,20.2203453 C3.12859438,20.3738153 3.11247297,20.6386242 3.26715419,20.8118529 C3.55728683,21.1348926 3.8638043,21.4430871 4.18554755,21.7351819 C4.36051223,21.8875542 4.62677887,21.8703045 4.78035371,21.6967622 C4.92955576,21.5280811 4.9179652,21.2726811 4.75411691,21.1179566 C4.45455377,20.8453592 4.16926809,20.5577075 3.89936623,20.2560992 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M8.62383766,23.4205325 C8.24175978,23.3065518 7.86668195,23.1751241 7.50006688,23.0268479 C7.29325168,22.9365748 7.04250327,23.0111502 6.9400621,23.1933997 C6.83762093,23.3756492 6.92224851,23.5966134 7.12906371,23.6868865 C7.13616825,23.6899708 7.14337727,23.692917 7.15069076,23.695633 C7.54373889,23.8550956 7.94608561,23.9961904 8.35595478,24.1184113 C8.57462829,24.1835957 8.81189897,24.0802029 8.88586975,23.8875036 C8.95989277,23.6948044 8.84256341,23.485717 8.62383766,23.4205325 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M6.42226808,22.5486639 L6.42226808,22.5482732 C6.10551466,22.3558791 5.79847966,22.1472201 5.50225876,21.9230778 C5.33699818,21.7893935 5.09737272,21.8184065 4.96698407,21.9878442 C4.83659543,22.1572819 4.86489315,22.4029641 5.03015373,22.5366485 C5.03634683,22.5416305 5.04263521,22.546466 5.04911415,22.5510573 C5.36591521,22.7915133 5.69448316,23.0151671 6.03353175,23.2211885 C6.2146562,23.3312327 6.44851731,23.2699342 6.55584855,23.0842317 C6.66322744,22.8984803 6.60339253,22.6587081 6.42226808,22.5486639 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M3.09065539,19.2272579 C2.8665101,18.9271034 2.65846749,18.6160821 2.46722335,18.2954864 C2.35743689,18.1119948 2.11400815,18.0489959 1.9235095,18.1547441 C1.73301086,18.2604923 1.66760615,18.4949671 1.77739262,18.6784587 C1.98225445,19.0212667 2.20520695,19.3537345 2.44535552,19.6745695 C2.57720861,19.8436996 2.82645221,19.877832 3.00204097,19.7508288 C3.17261007,19.6274639 3.21172367,19.3964359 3.09065539,19.2272579 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M1.72413792,17.4011637 C1.72413792,17.3433547 1.71324953,17.286168 1.69226379,17.2333363 L1.69151928,17.2304329 C1.5458289,16.8648108 1.4172156,16.490997 1.30623778,16.1105468 C1.25226115,15.8895248 1.04766178,15.7590788 0.849297643,15.8192727 C0.650933508,15.8794147 0.533860047,16.1073841 0.587883214,16.3284061 C0.591047362,16.341264 0.594723357,16.3539664 0.598957731,16.3664615 C0.71775286,16.7750644 0.855439812,17.1765643 1.01141368,17.5693021 C1.0711137,17.7194498 1.20465934,17.8161956 1.35202486,17.8160919 C1.55760139,17.8159882 1.72418445,17.6302219 1.72413792,17.4011637 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M0.872830658,15.5083658 C0.872874294,15.5083658 0.872961566,15.5083151 0.873005202,15.5083151 C1.06138153,15.4616887 1.18164217,15.2467002 1.14180256,15.02786 C1.07224688,14.6448643 1.01957831,14.2579661 0.98401502,13.868686 C0.963680674,13.6458926 0.791667819,13.4844232 0.59984425,13.5080405 C0.40802068,13.5316579 0.268996592,13.731442 0.289330938,13.9542354 C0.327556016,14.3711873 0.384151824,14.7855545 0.458987452,15.1957152 C0.498957968,15.4148088 0.684236148,15.5547388 0.872830658,15.5083658 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M24.408239,14.9548439 C24.4080889,14.9547922 24.4079387,14.9547922 24.4077886,14.9547406 C24.1931918,14.8999105 23.9761427,15.034869 23.9229439,15.2562548 C23.8301588,15.6434734 23.718056,16.0254774 23.5870358,16.4007696 C23.5120671,16.6154436 23.619966,16.8521116 23.8280569,16.9294521 C24.0361477,17.0067925 24.2655582,16.8954801 24.3405269,16.6808061 C24.4810058,16.2788732 24.6012661,15.8696607 24.7008574,15.4549237 C24.7539061,15.2334864 24.6228859,15.0096224 24.408239,14.9548439 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M11.1362307,24.0275446 C10.7471015,23.9883139 10.3606618,23.9321105 9.97838339,23.8591062 C9.7596631,23.8172544 9.54226224,23.9334426 9.4928345,24.1186388 C9.44340675,24.3038351 9.58062709,24.4879142 9.79934738,24.529766 C10.20908,24.6079696 10.6233291,24.6682121 11.0404201,24.7102357 C11.0566084,24.7119115 11.0728475,24.712685 11.0891374,24.712642 C11.3133384,24.7122553 11.4947087,24.5579966 11.494252,24.3681597 C11.493846,24.1943072 11.3401836,24.0480838 11.1362307,24.0275446 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M23.6145439,17.5722053 C23.6145439,17.5722053 23.6145439,17.5722053 23.6145439,17.5722053 C23.4065738,17.4675685 23.1566123,17.5583082 23.0560001,17.7749391 C22.8801381,18.1539205 22.6855028,18.5231467 22.4728263,18.8810372 C22.354539,19.0879129 22.4195918,19.3554997 22.6180968,19.4787205 C22.8117386,19.5989983 23.0620661,19.5376877 23.1840139,19.3401312 C23.4116985,18.9565174 23.6201915,18.560805 23.808604,18.1546834 C23.909373,17.9379981 23.8224617,17.6772236 23.6145439,17.5722053 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M22.5367797,19.6276116 C22.3486232,19.4894099 22.0747678,19.5182564 21.9251349,19.692089 C21.9225231,19.6951043 21.9199658,19.6981699 21.9174628,19.7012355 L21.9174628,19.7004314 C21.6606384,20.0081438 21.386783,20.3033427 21.0969305,20.5849224 C20.9311917,20.7458898 20.938102,21.0005327 21.1123835,21.15361 C21.286665,21.3066873 21.5623704,21.3003048 21.7281092,21.1393375 C22.0380397,20.8376557 22.3312657,20.5216512 22.6065358,20.19253 C22.7561687,20.0187477 22.7249362,19.7658134 22.5367797,19.6276116 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M24.6320708,12.6442048 C24.4248605,12.6330104 24.2482598,12.801633 24.2377228,13.0207819 C24.2375321,13.0248664 24.2373891,13.0290013 24.2372937,13.0330857 C24.2243729,13.4223701 24.1923807,13.8106963 24.1415555,14.1965013 C24.1128055,14.4169109 24.2582246,14.6202767 24.4665314,14.651137 C24.4842201,14.65386 24.5020518,14.6552215 24.5199312,14.6551711 C24.710025,14.6548685 24.8709395,14.5065673 24.8971626,14.3074373 C24.9514683,13.8942009 24.9857014,13.4782919 24.9997665,13.061324 C25.0070613,12.8387966 24.8425232,12.6520712 24.6320708,12.6442048 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M20.0404904,21.3542431 L20.0404904,21.3553662 C19.7509375,21.590556 19.4489428,21.8114733 19.1356375,22.0172293 C18.9564864,22.1350581 18.9116864,22.3687972 19.0355135,22.53927 C19.1593407,22.7097428 19.4049788,22.7523727 19.5841298,22.6345438 C19.9191713,22.4131585 20.2421644,22.1757694 20.551929,21.9232657 C20.7170646,21.7888715 20.7364403,21.5525587 20.5952046,21.3954224 C20.454018,21.2382861 20.205626,21.219849 20.0404904,21.3542431 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M15.8584814,23.8658286 C15.4780791,23.9840419 15.0920168,24.0817747 14.7017868,24.1587088 C14.4785262,24.2030123 14.3323442,24.4254845 14.3753087,24.6557032 C14.4125102,24.8552544 14.5816922,24.9996253 14.7787625,24.9999967 C14.8048499,25.0001028 14.8308858,24.9976621 14.8565616,24.9927808 C15.2748857,24.9103286 15.6887334,24.8053799 16.0964065,24.6782529 C16.3123091,24.6048737 16.4296766,24.3648923 16.3585151,24.1422609 C16.289875,23.927482 16.0699589,23.8059261 15.8584814,23.8658286 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M13.3692218,24.1386239 C13.361857,24.1390324 13.3545423,24.1396962 13.3472275,24.1405132 C13.0285862,24.1699253 12.7003254,24.1829973 12.3732671,24.1829973 L12.1900984,24.1829973 C11.9715084,24.1861632 11.7928487,24.3616145 11.7816763,24.5841456 C11.7776682,24.8097405 11.9538228,24.995915 12.1751182,25 L12.3732671,25 C12.7235722,25 13.0746789,24.9840684 13.4153647,24.9542478 C13.6363595,24.9412779 13.8051994,24.7481589 13.7924237,24.5229215 C13.779648,24.2976841 13.5901666,24.1256029 13.3692218,24.1386239 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M18.0458529,22.7546566 L18.04628,22.7546566 C17.6847119,22.9560185 17.3132678,23.1383789 16.9333357,23.301032 C16.7147826,23.3912078 16.6094565,23.644471 16.6980735,23.8667346 C16.7866905,24.0889982 17.0357791,24.1961125 17.2543321,24.105991 C17.2575351,24.104688 17.2606848,24.1033308 17.2638344,24.1019192 C17.6709389,23.9277024 18.0689147,23.7323124 18.4562138,23.516455 C18.6630758,23.4011972 18.7388807,23.1372388 18.625547,22.9268647 C18.5123201,22.7164907 18.2527149,22.6393988 18.0458529,22.7546566 Z"
              id="Path"
              fill="#1AB3B0"
            />
            <path
              d="M12.5,3.73563218 C7.65956486,3.73563218 3.73563218,7.65956486 3.73563218,12.5 C3.73563218,17.3404351 7.65956486,21.2643678 12.5,21.2643678 C17.3404351,21.2643678 21.2643678,17.3404351 21.2643678,12.5 C21.2588901,7.66186029 17.3381397,3.74116208 12.5,3.73563218 Z M19.1776136,12.9173508 L20.4083812,12.9173508 C20.1915675,16.9613241 16.9613241,20.1915675 12.9173508,20.4083812 L12.9173508,19.1776136 C12.9173508,18.9471316 12.730482,18.7602627 12.5,18.7602627 C12.269518,18.7602627 12.0826492,18.9471316 12.0826492,19.1776136 L12.0826492,20.4083812 C8.03867594,20.1915675 4.80843254,16.9613241 4.59161877,12.9173508 L5.82238643,12.9173508 C6.05286843,12.9173508 6.23973727,12.730482 6.23973727,12.5 C6.23973727,12.269518 6.05286843,12.0826492 5.82238643,12.0826492 L4.59161877,12.0826492 C4.80843254,8.03867594 8.03867594,4.80843254 12.0826492,4.59161877 L12.0826492,5.82238643 C12.0826492,6.05286843 12.269518,6.23973727 12.5,6.23973727 C12.730482,6.23973727 12.9173508,6.05286843 12.9173508,5.82238643 L12.9173508,4.59161877 C16.9613241,4.80843254 20.1915675,8.03867594 20.4083812,12.0826492 L19.1776136,12.0826492 C18.9471316,12.0826492 18.7602627,12.269518 18.7602627,12.5 C18.7602627,12.730482 18.9471316,12.9173508 19.1776136,12.9173508 Z"
              id="Shape"
              fill={fill}
              fillRule="nonzero"
            />
            <path
              d="M12.9304688,11.3902469 L12.9304688,7.5969421 C12.9304688,7.36884404 12.7374985,7.18390805 12.4994909,7.18390805 C12.2614834,7.18390805 12.068513,7.36884404 12.068513,7.5969421 L12.068513,11.3902469 C11.7035286,11.5151897 11.4162279,11.7905285 11.2858571,12.1403167 L9.05166757,12.1403167 C8.81366002,12.1403167 8.62068966,12.3252527 8.62068966,12.5533508 C8.62068966,12.7814488 8.81366002,12.9663848 9.05166757,12.9663848 L11.2858571,12.9663848 C11.522033,13.6105114 12.2583588,13.9491994 12.9304688,13.7228567 C13.6025789,13.496514 13.9559808,12.7908454 13.7198049,12.1467187 C13.5900805,11.7928518 13.2997092,11.5146218 12.9304688,11.3902469 Z M12.4994909,12.9663848 C12.2614834,12.9663848 12.068513,12.7814488 12.068513,12.5533508 C12.068513,12.3252527 12.2614834,12.1403167 12.4994909,12.1403167 C12.7374985,12.1403167 12.9304688,12.3252527 12.9304688,12.5533508 C12.9304688,12.7814488 12.7375524,12.9663848 12.4994909,12.9663848 Z"
              id="Shape"
              fill="#1AB3B0"
              fillRule="nonzero"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const VirtualSpace = ({ fill = '#FFFFFF' }) => {
  return (
    <svg width="51px" height="53px" viewBox="0 0 51 53">
      <g
        id="Schema-Validation-Exploration"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Upload_SV_Non-Pro-(2)"
          transform="translate(-679.000000, -524.000000)"
        >
          <g id="Group-12" transform="translate(561.000000, 141.000000)">
            <g id="Group-11">
              <g id="Group-6" transform="translate(118.000000, 384.000000)">
                <g id="Group-5">
                  <path
                    d="M0.507144034,14.8693931 C0.956538747,14.8693931 1.40383348,14.8693931 1.8532282,14.8693931 C3.06281397,14.8693931 4.27029976,14.8693931 5.47988553,14.8693931 C7.27326443,14.8693931 9.06454336,14.8693931 10.8579223,14.8693931 C13.0460965,14.8693931 15.2321708,14.8693931 17.4203451,14.8693931 C19.8164169,14.8693931 22.2124887,14.8693931 24.6085605,14.8693931 C27.027732,14.8693931 29.4448036,14.8693931 31.8639751,14.8693931 C34.1193486,14.8693931 36.3747221,14.8693931 38.6300955,14.8693931 C40.5368731,14.8693931 42.4415507,14.8693931 44.3483283,14.8693931 C45.7196121,14.8693931 47.088796,14.8693931 48.4600799,14.8693931 C49.1089722,14.8693931 49.7599646,14.8820086 50.408857,14.8693931 C50.4361566,14.8693931 50.4655563,14.8693931 50.492856,14.8693931 C51.169048,14.8693931 51.169048,13.8181069 50.492856,13.8181069 C50.0434613,13.8181069 49.5961665,13.8181069 49.1467718,13.8181069 C47.937186,13.8181069 46.7297002,13.8181069 45.5201145,13.8181069 C43.7267356,13.8181069 41.9354566,13.8181069 40.1420777,13.8181069 C37.9539035,13.8181069 35.7678292,13.8181069 33.5796549,13.8181069 C31.1835831,13.8181069 28.7875113,13.8181069 26.3914395,13.8181069 C23.972268,13.8181069 21.5551964,13.8181069 19.1360249,13.8181069 C16.8806514,13.8181069 14.6252779,13.8181069 12.3699045,13.8181069 C10.4631269,13.8181069 8.55844931,13.8181069 6.65167175,13.8181069 C5.28038788,13.8181069 3.91120399,13.8181069 2.53992012,13.8181069 C1.89102775,13.8181069 1.24003541,13.8054914 0.591143045,13.8181069 C0.563843367,13.8181069 0.534443712,13.8181069 0.507144034,13.8181069 C-0.169048011,13.8181069 -0.169048011,14.8693931 0.507144034,14.8693931 Z"
                    id="Path"
                    fill={fill}
                  />
                  <path
                    d="M0.507144034,26.5568931 C0.956538747,26.5568931 1.40383348,26.5568931 1.8532282,26.5568931 C3.06281397,26.5568931 4.27029976,26.5568931 5.47988553,26.5568931 C7.27326443,26.5568931 9.06454336,26.5568931 10.8579223,26.5568931 C13.0460965,26.5568931 15.2321708,26.5568931 17.4203451,26.5568931 C19.8164169,26.5568931 22.2124887,26.5568931 24.6085605,26.5568931 C27.027732,26.5568931 29.4448036,26.5568931 31.8639751,26.5568931 C34.1193486,26.5568931 36.3747221,26.5568931 38.6300955,26.5568931 C40.5368731,26.5568931 42.4415507,26.5568931 44.3483283,26.5568931 C45.7196121,26.5568931 47.088796,26.5568931 48.4600799,26.5568931 C49.1089722,26.5568931 49.7599646,26.5695086 50.408857,26.5568931 C50.4361566,26.5568931 50.4655563,26.5568931 50.492856,26.5568931 C51.169048,26.5568931 51.169048,25.5056069 50.492856,25.5056069 C50.0434613,25.5056069 49.5961665,25.5056069 49.1467718,25.5056069 C47.937186,25.5056069 46.7297002,25.5056069 45.5201145,25.5056069 C43.7267356,25.5056069 41.9354566,25.5056069 40.1420777,25.5056069 C37.9539035,25.5056069 35.7678292,25.5056069 33.5796549,25.5056069 C31.1835831,25.5056069 28.7875113,25.5056069 26.3914395,25.5056069 C23.972268,25.5056069 21.5551964,25.5056069 19.1360249,25.5056069 C16.8806514,25.5056069 14.6252779,25.5056069 12.3699045,25.5056069 C10.4631269,25.5056069 8.55844931,25.5056069 6.65167175,25.5056069 C5.28038788,25.5056069 3.91120399,25.5056069 2.53992012,25.5056069 C1.89102775,25.5056069 1.24003541,25.4929914 0.591143045,25.5056069 C0.563843367,25.5056069 0.534443712,25.5056069 0.507144034,25.5056069 C-0.169048011,25.5056069 -0.169048011,26.5568931 0.507144034,26.5568931 Z"
                    id="Path"
                    fill={fill}
                  />
                  <path
                    d="M0.507144034,38.2443931 C0.956538747,38.2443931 1.40383348,38.2443931 1.8532282,38.2443931 C3.06281397,38.2443931 4.27029976,38.2443931 5.47988553,38.2443931 C7.27326443,38.2443931 9.06454336,38.2443931 10.8579223,38.2443931 C13.0460965,38.2443931 15.2321708,38.2443931 17.4203451,38.2443931 C19.8164169,38.2443931 22.2124887,38.2443931 24.6085605,38.2443931 C27.027732,38.2443931 29.4448036,38.2443931 31.8639751,38.2443931 C34.1193486,38.2443931 36.3747221,38.2443931 38.6300955,38.2443931 C40.5368731,38.2443931 42.4415507,38.2443931 44.3483283,38.2443931 C45.7196121,38.2443931 47.088796,38.2443931 48.4600799,38.2443931 C49.1089722,38.2443931 49.7599646,38.2570086 50.408857,38.2443931 C50.4361566,38.2443931 50.4655563,38.2443931 50.492856,38.2443931 C51.169048,38.2443931 51.169048,37.1931069 50.492856,37.1931069 C50.0434613,37.1931069 49.5961665,37.1931069 49.1467718,37.1931069 C47.937186,37.1931069 46.7297002,37.1931069 45.5201145,37.1931069 C43.7267356,37.1931069 41.9354566,37.1931069 40.1420777,37.1931069 C37.9539035,37.1931069 35.7678292,37.1931069 33.5796549,37.1931069 C31.1835831,37.1931069 28.7875113,37.1931069 26.3914395,37.1931069 C23.972268,37.1931069 21.5551964,37.1931069 19.1360249,37.1931069 C16.8806514,37.1931069 14.6252779,37.1931069 12.3699045,37.1931069 C10.4631269,37.1931069 8.55844931,37.1931069 6.65167175,37.1931069 C5.28038788,37.1931069 3.91120399,37.1931069 2.53992012,37.1931069 C1.89102775,37.1931069 1.24003541,37.1804914 0.591143045,37.1931069 C0.563843367,37.1931069 0.534443712,37.1931069 0.507144034,37.1931069 C-0.169048011,37.1931069 -0.169048011,38.2443931 0.507144034,38.2443931 Z"
                    id="Path"
                    fill={fill}
                  />
                  <path
                    d="M13.8181069,0.507923984 C13.8181069,0.957311755 13.8181069,1.40459958 13.8181069,1.85398735 C13.8181069,3.06355444 13.8181069,4.27102158 13.8181069,5.48058867 C13.8181069,7.27393987 13.8181069,9.06519112 13.8181069,10.8585423 C13.8181069,13.0466828 13.8181069,15.2327233 13.8181069,17.4208638 C13.8181069,19.8168986 13.8181069,22.2129333 13.8181069,24.6089681 C13.8181069,27.0281023 13.8181069,29.4451365 13.8181069,31.8642707 C13.8181069,34.1196093 13.8181069,36.374948 13.8181069,38.6302866 C13.8181069,40.5370347 13.8181069,42.4416829 13.8181069,44.348431 C13.8181069,45.7196937 13.8181069,47.0888564 13.8181069,48.4601191 C13.8181069,49.1090015 13.8054914,49.7599837 13.8181069,50.4088661 C13.8181069,50.4361653 13.8181069,50.4655645 13.8181069,50.4928638 C13.8181069,51.1690454 14.8693931,51.1690454 14.8693931,50.4928638 C14.8693931,50.043476 14.8693931,49.5961882 14.8693931,49.1468004 C14.8693931,47.9372333 14.8693931,46.7297662 14.8693931,45.5201991 C14.8693931,43.7268479 14.8693931,41.9355967 14.8693931,40.1422455 C14.8693931,37.954105 14.8693931,35.7680645 14.8693931,33.579924 C14.8693931,31.1838892 14.8693931,28.7878544 14.8693931,26.3918196 C14.8693931,23.9726855 14.8693931,21.5556512 14.8693931,19.1365171 C14.8693931,16.8811784 14.8693931,14.6258398 14.8693931,12.3705012 C14.8693931,10.4637531 14.8693931,8.5591049 14.8693931,6.65235678 C14.8693931,5.2810941 14.8693931,3.91193135 14.8693931,2.54066867 C14.8693931,1.89178633 14.8820086,1.24080404 14.8693931,0.591921698 C14.8693931,0.564622441 14.8693931,0.535223241 14.8693931,0.507923984 C14.8693931,-0.168257616 13.8181069,-0.170357559 13.8181069,0.507923984 Z"
                    id="Path"
                    stroke={fill}
                    fill={fill}
                  />
                  <path
                    d="M25.5056069,0.507923984 C25.5056069,0.957311755 25.5056069,1.40459958 25.5056069,1.85398735 C25.5056069,3.06355444 25.5056069,4.27102158 25.5056069,5.48058867 C25.5056069,7.27393987 25.5056069,9.06519112 25.5056069,10.8585423 C25.5056069,13.0466828 25.5056069,15.2327233 25.5056069,17.4208638 C25.5056069,19.8168986 25.5056069,22.2129333 25.5056069,24.6089681 C25.5056069,27.0281023 25.5056069,29.4451365 25.5056069,31.8642707 C25.5056069,34.1196093 25.5056069,36.374948 25.5056069,38.6302866 C25.5056069,40.5370347 25.5056069,42.4416829 25.5056069,44.348431 C25.5056069,45.7196937 25.5056069,47.0888564 25.5056069,48.4601191 C25.5056069,49.1090015 25.4929914,49.7599837 25.5056069,50.4088661 C25.5056069,50.4361653 25.5056069,50.4655645 25.5056069,50.4928638 C25.5056069,51.1690454 26.5568931,51.1690454 26.5568931,50.4928638 C26.5568931,50.043476 26.5568931,49.5961882 26.5568931,49.1468004 C26.5568931,47.9372333 26.5568931,46.7297662 26.5568931,45.5201991 C26.5568931,43.7268479 26.5568931,41.9355967 26.5568931,40.1422455 C26.5568931,37.954105 26.5568931,35.7680645 26.5568931,33.579924 C26.5568931,31.1838892 26.5568931,28.7878544 26.5568931,26.3918196 C26.5568931,23.9726855 26.5568931,21.5556512 26.5568931,19.1365171 C26.5568931,16.8811784 26.5568931,14.6258398 26.5568931,12.3705012 C26.5568931,10.4637531 26.5568931,8.5591049 26.5568931,6.65235678 C26.5568931,5.2810941 26.5568931,3.91193135 26.5568931,2.54066867 C26.5568931,1.89178633 26.5695086,1.24080404 26.5568931,0.591921698 C26.5568931,0.564622441 26.5568931,0.535223241 26.5568931,0.507923984 C26.5568931,-0.168257616 25.5056069,-0.170357559 25.5056069,0.507923984 Z"
                    id="Path"
                    stroke={fill}
                    fill={fill}
                  />
                  <path
                    d="M36.1306069,0.507923984 C36.1306069,0.957311755 36.1306069,1.40459958 36.1306069,1.85398735 C36.1306069,3.06355444 36.1306069,4.27102158 36.1306069,5.48058867 C36.1306069,7.27393987 36.1306069,9.06519112 36.1306069,10.8585423 C36.1306069,13.0466828 36.1306069,15.2327233 36.1306069,17.4208638 C36.1306069,19.8168986 36.1306069,22.2129333 36.1306069,24.6089681 C36.1306069,27.0281023 36.1306069,29.4451365 36.1306069,31.8642707 C36.1306069,34.1196093 36.1306069,36.374948 36.1306069,38.6302866 C36.1306069,40.5370347 36.1306069,42.4416829 36.1306069,44.348431 C36.1306069,45.7196937 36.1306069,47.0888564 36.1306069,48.4601191 C36.1306069,49.1090015 36.1179914,49.7599837 36.1306069,50.4088661 C36.1306069,50.4361653 36.1306069,50.4655645 36.1306069,50.4928638 C36.1306069,51.1690454 37.1818931,51.1690454 37.1818931,50.4928638 C37.1818931,50.043476 37.1818931,49.5961882 37.1818931,49.1468004 C37.1818931,47.9372333 37.1818931,46.7297662 37.1818931,45.5201991 C37.1818931,43.7268479 37.1818931,41.9355967 37.1818931,40.1422455 C37.1818931,37.954105 37.1818931,35.7680645 37.1818931,33.579924 C37.1818931,31.1838892 37.1818931,28.7878544 37.1818931,26.3918196 C37.1818931,23.9726855 37.1818931,21.5556512 37.1818931,19.1365171 C37.1818931,16.8811784 37.1818931,14.6258398 37.1818931,12.3705012 C37.1818931,10.4637531 37.1818931,8.5591049 37.1818931,6.65235678 C37.1818931,5.2810941 37.1818931,3.91193135 37.1818931,2.54066867 C37.1818931,1.89178633 37.1945086,1.24080404 37.1818931,0.591921698 C37.1818931,0.564622441 37.1818931,0.535223241 37.1818931,0.507923984 C37.1818931,-0.168257616 36.1306069,-0.170357559 36.1306069,0.507923984 Z"
                    id="Path"
                    stroke={fill}
                    fill={fill}
                  />
                  <circle
                    id="Oval"
                    fill="#1AB3B0"
                    cx="13.6944444"
                    cy="13.6944444"
                    r="3.06944444"
                  />
                  <circle
                    id="Oval"
                    stroke="#000000"
                    fill="#000000"
                    cx="13.7534722"
                    cy="13.7534722"
                    r="1"
                  />
                  <circle
                    id="Oval"
                    fill="#1AB3B0"
                    cx="25.7361111"
                    cy="38.0138889"
                    r="3.06944444"
                  />
                  <circle
                    id="Oval"
                    stroke="#000000"
                    fill="#000000"
                    cx="26.03125"
                    cy="38.3090278"
                    r="1"
                  />
                  <circle
                    id="Oval"
                    fill="#1AB3B0"
                    cx="37.0694444"
                    cy="25.7361111"
                    r="3.06944444"
                  />
                  <circle
                    id="Oval"
                    stroke="#000000"
                    fill="#000000"
                    cx="37.3645833"
                    cy="26.03125"
                    r="1"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const SchemaWBG = () => {
  return (
    <svg width="50px" height="51px" viewBox="0 0 50 51" version="1.1">
      <g
        id="Page-3"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Apply-feature" transform="translate(-733.000000, -501.000000)">
          <g id="Group-11" transform="translate(734.000000, 479.000000)">
            <g id="Group-4" transform="translate(0.000000, 24.000000)">
              <polygon
                id="Path"
                stroke="#FFFFFF"
                strokeWidth="2"
                points="2.17781349e-12 42.940039 16.076272 47.3969738 31.6299845 42.940039 46.8871092 46.431271 47.2593572 3.56574922 31.4816906 -7.49622586e-13 16.4475112 4.53245897 0.297596652 -7.49622586e-13"
              />
              <path
                d="M16.3712392,4 L16,46.8645148"
                id="Path"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <path
                d="M32,1.05515596e-12 L32.1482939,42.940039"
                id="Path"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <path
                d="M20.1433763,32.8577032 C20.761772,33.532386 21.3801678,34.2060619 21.9995723,34.8807447 C22.9841633,35.9541953 23.969763,37.028653 24.954354,38.1021036 C25.1793169,38.346802 25.403271,38.5915004 25.6282339,38.8372058 C25.8067919,39.0315547 26.1628991,39.0315547 26.341457,38.8372058 C26.5331295,38.628759 26.5321207,38.3327041 26.341457,38.1252643 C25.7230613,37.4505815 25.1046655,36.7769056 24.485261,36.1022228 C23.50067,35.0287722 22.5150703,33.9543145 21.5304793,32.8808639 C21.3055164,32.6361655 21.0815623,32.3914671 20.8565994,32.1457617 C20.6780414,31.9514128 20.3219343,31.9514128 20.1433763,32.1457617 C19.9517038,32.3542085 19.9527126,32.6502634 20.1433763,32.8577032 Z"
                id="Path"
                fill="#FFFFFF"
              />
              <path
                d="M20.9387974,40.4282578 C21.1203818,40.1402588 21.302975,39.8532669 21.4845594,39.5652679 C21.9213707,38.8744732 22.3581821,38.1836785 22.7949934,37.4928839 C23.3236058,36.6570827 23.8522182,35.8212816 24.3798217,34.9854804 C24.8368091,34.2634691 25.2927877,33.5414577 25.7497751,32.8184394 C25.9707028,32.4690141 26.2047449,32.1246237 26.413567,31.7681495 C26.4165934,31.7631146 26.4196198,31.7580796 26.423655,31.7530447 C26.5648873,31.5294931 26.4781303,31.1881237 26.2430794,31.064264 C25.9949141,30.9333554 25.7033702,31.0068656 25.5530587,31.2445151 C25.3714743,31.532514 25.1888811,31.819506 25.0072967,32.1075049 C24.5704853,32.7982996 24.133674,33.4890943 23.6968626,34.179889 C23.1682503,35.0156901 22.6396379,35.8514913 22.1120343,36.6872924 C21.6550469,37.4093037 21.1990683,38.1313151 20.7420809,38.8543334 C20.5211533,39.2037587 20.2871111,39.5481491 20.0782891,39.9046233 C20.0752627,39.9096583 20.0722363,39.9146932 20.0682011,39.9197281 C19.9269688,40.1432798 20.0137257,40.4846492 20.2487767,40.6085088 C20.4979508,40.7394175 20.7884858,40.6659072 20.9387974,40.4282578 Z"
                id="Path"
                fill="#F4F4F4"
              />
              <path
                d="M5,39.0089333 L6.48846082,13.2378426 L22.5300981,30.9788693 L27.3166882,19.1286506 L40.8076234,41.5679594 L40.8076234,11"
                id="Path-3"
                stroke="#DFDFDF"
                strokeDasharray="3"
              />
              <g
                id="Layer_4"
                transform="translate(38.000000, 3.000000)"
                fill="#FFFFFF"
                fillRule="nonzero"
              >
                <path
                  d="M0.221870504,3.29663615 C0.226906475,2.44165814 0.383021583,1.80141879 0.712374101,1.2427006 C1.12129496,0.548776585 1.65913669,0.136199986 2.3218705,0.0437430611 C3.12359712,-0.0685970731 3.80647482,0.275382453 4.35338129,1.05878091 C4.64244604,1.47334583 4.8247482,1.96346695 4.91136691,2.51323769 C4.98086331,2.95762743 4.96978417,3.40201716 4.89726619,3.84441858 C4.78748201,4.51448274 4.60618705,5.15173961 4.39669065,5.77706655 C4.02100719,6.89649125 3.57280576,7.96521377 3.09035971,9.00908227 C2.95841727,9.29341217 2.82244604,9.57475958 2.68647482,9.856107 C2.63007194,9.97242377 2.57064748,9.97341794 2.50920863,9.86008364 C1.87971223,8.69989836 1.31669065,7.4890109 0.860431655,6.19361979 C0.618705036,5.5066549 0.412230216,4.80179512 0.302446043,4.05617476 C0.256115108,3.75792661 0.236978417,3.45172519 0.221870504,3.29663615 Z M1.49697842,3.20020259 C1.49395683,3.99155433 1.97942446,4.63477616 2.5857554,4.64272944 C3.18705036,4.64968856 3.68258993,4.00050177 3.68359712,3.20417923 C3.68460432,2.41382165 3.1971223,1.76662317 2.60086331,1.76165237 C1.9905036,1.75767573 1.5,2.39692092 1.49697842,3.20020259 Z"
                  id="Shape"
                />
              </g>
              <ellipse
                id="Oval"
                stroke="#1CB3B0"
                cx="6.7344969"
                cy="8.28829386"
                rx="2.7344969"
                ry="3.28829386"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const SchemaBBG = () => {
  return (
    <svg width="50px" height="51px" viewBox="0 0 50 51" version="1.1">
      <g
        id="Page-3"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Upload_SV_Pro" transform="translate(-949.000000, -250.000000)">
          <g id="Group-6" transform="translate(929.000000, 232.000000)">
            <g id="Group-4" transform="translate(21.000000, 20.000000)">
              <polygon
                id="Path"
                stroke="#3C3C3B"
                strokeWidth="2"
                points="2.17781349e-12 42.940039 16.076272 47.3969738 31.6299845 42.940039 46.8871092 46.431271 47.2593572 3.56574922 31.4816906 -7.49622586e-13 16.4475112 4.53245897 0.297596652 -7.49622586e-13"
              />
              <path
                d="M16.3712392,4 L16,46.8645148"
                id="Path"
                stroke="#3C3C3B"
                strokeWidth="2"
              />
              <path
                d="M32,1.05515596e-12 L32.1482939,42.940039"
                id="Path"
                stroke="#3C3C3B"
                strokeWidth="2"
              />
              <path
                d="M20.1433763,32.8577032 C20.761772,33.532386 21.3801678,34.2060619 21.9995723,34.8807447 C22.9841633,35.9541953 23.969763,37.028653 24.954354,38.1021036 C25.1793169,38.346802 25.403271,38.5915004 25.6282339,38.8372058 C25.8067919,39.0315547 26.1628991,39.0315547 26.341457,38.8372058 C26.5331295,38.628759 26.5321207,38.3327041 26.341457,38.1252643 C25.7230613,37.4505815 25.1046655,36.7769056 24.485261,36.1022228 C23.50067,35.0287722 22.5150703,33.9543145 21.5304793,32.8808639 C21.3055164,32.6361655 21.0815623,32.3914671 20.8565994,32.1457617 C20.6780414,31.9514128 20.3219343,31.9514128 20.1433763,32.1457617 C19.9517038,32.3542085 19.9527126,32.6502634 20.1433763,32.8577032 Z"
                id="Path"
                fill="#3C3C3B"
              />
              <path
                d="M20.9387974,40.4282578 C21.1203818,40.1402588 21.302975,39.8532669 21.4845594,39.5652679 C21.9213707,38.8744732 22.3581821,38.1836785 22.7949934,37.4928839 C23.3236058,36.6570827 23.8522182,35.8212816 24.3798217,34.9854804 C24.8368091,34.2634691 25.2927877,33.5414577 25.7497751,32.8184394 C25.9707028,32.4690141 26.2047449,32.1246237 26.413567,31.7681495 C26.4165934,31.7631146 26.4196198,31.7580796 26.423655,31.7530447 C26.5648873,31.5294931 26.4781303,31.1881237 26.2430794,31.064264 C25.9949141,30.9333554 25.7033702,31.0068656 25.5530587,31.2445151 C25.3714743,31.532514 25.1888811,31.819506 25.0072967,32.1075049 C24.5704853,32.7982996 24.133674,33.4890943 23.6968626,34.179889 C23.1682503,35.0156901 22.6396379,35.8514913 22.1120343,36.6872924 C21.6550469,37.4093037 21.1990683,38.1313151 20.7420809,38.8543334 C20.5211533,39.2037587 20.2871111,39.5481491 20.0782891,39.9046233 C20.0752627,39.9096583 20.0722363,39.9146932 20.0682011,39.9197281 C19.9269688,40.1432798 20.0137257,40.4846492 20.2487767,40.6085088 C20.4979508,40.7394175 20.7884858,40.6659072 20.9387974,40.4282578 Z"
                id="Path"
                fill="#3C3C3B"
              />
              <path
                d="M5,39.0089333 L6.48846082,13.2378426 L22.5300981,30.9788693 L27.3166882,19.1286506 L40.8076234,41.5679594 L40.8076234,11"
                id="Path-3"
                stroke="#696969"
                strokeDasharray="3"
              />
              <g
                id="Layer_4"
                transform="translate(38.000000, 3.000000)"
                fill="#000000"
                fillRule="nonzero"
              >
                <path
                  d="M0.221870504,3.29663615 C0.226906475,2.44165814 0.383021583,1.80141879 0.712374101,1.2427006 C1.12129496,0.548776585 1.65913669,0.136199986 2.3218705,0.0437430611 C3.12359712,-0.0685970731 3.80647482,0.275382453 4.35338129,1.05878091 C4.64244604,1.47334583 4.8247482,1.96346695 4.91136691,2.51323769 C4.98086331,2.95762743 4.96978417,3.40201716 4.89726619,3.84441858 C4.78748201,4.51448274 4.60618705,5.15173961 4.39669065,5.77706655 C4.02100719,6.89649125 3.57280576,7.96521377 3.09035971,9.00908227 C2.95841727,9.29341217 2.82244604,9.57475958 2.68647482,9.856107 C2.63007194,9.97242377 2.57064748,9.97341794 2.50920863,9.86008364 C1.87971223,8.69989836 1.31669065,7.4890109 0.860431655,6.19361979 C0.618705036,5.5066549 0.412230216,4.80179512 0.302446043,4.05617476 C0.256115108,3.75792661 0.236978417,3.45172519 0.221870504,3.29663615 Z M1.49697842,3.20020259 C1.49395683,3.99155433 1.97942446,4.63477616 2.5857554,4.64272944 C3.18705036,4.64968856 3.68258993,4.00050177 3.68359712,3.20417923 C3.68460432,2.41382165 3.1971223,1.76662317 2.60086331,1.76165237 C1.9905036,1.75767573 1.5,2.39692092 1.49697842,3.20020259 Z"
                  id="Shape"
                />
              </g>
              <ellipse
                id="Oval"
                stroke="#1CB3B0"
                cx="6.7344969"
                cy="8.28829386"
                rx="2.7344969"
                ry="3.28829386"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const VirtualIcon = ({ className, fill }) => {
  return (
    <svg
      className={className}
      width="51px"
      height="53px"
      viewBox="0 0 51 53"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="Schema-Validation-Exploration"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Upload_SV_Non-Pro-(2)"
          transform="translate(-679.000000, -524.000000)"
        >
          <g id="Group-12" transform="translate(561.000000, 141.000000)">
            <g id="Group-11">
              <g id="Group-6" transform="translate(118.000000, 384.000000)">
                <g id="Group-5">
                  <path
                    d="M0.507144034,14.8693931 C0.956538747,14.8693931 1.40383348,14.8693931 1.8532282,14.8693931 C3.06281397,14.8693931 4.27029976,14.8693931 5.47988553,14.8693931 C7.27326443,14.8693931 9.06454336,14.8693931 10.8579223,14.8693931 C13.0460965,14.8693931 15.2321708,14.8693931 17.4203451,14.8693931 C19.8164169,14.8693931 22.2124887,14.8693931 24.6085605,14.8693931 C27.027732,14.8693931 29.4448036,14.8693931 31.8639751,14.8693931 C34.1193486,14.8693931 36.3747221,14.8693931 38.6300955,14.8693931 C40.5368731,14.8693931 42.4415507,14.8693931 44.3483283,14.8693931 C45.7196121,14.8693931 47.088796,14.8693931 48.4600799,14.8693931 C49.1089722,14.8693931 49.7599646,14.8820086 50.408857,14.8693931 C50.4361566,14.8693931 50.4655563,14.8693931 50.492856,14.8693931 C51.169048,14.8693931 51.169048,13.8181069 50.492856,13.8181069 C50.0434613,13.8181069 49.5961665,13.8181069 49.1467718,13.8181069 C47.937186,13.8181069 46.7297002,13.8181069 45.5201145,13.8181069 C43.7267356,13.8181069 41.9354566,13.8181069 40.1420777,13.8181069 C37.9539035,13.8181069 35.7678292,13.8181069 33.5796549,13.8181069 C31.1835831,13.8181069 28.7875113,13.8181069 26.3914395,13.8181069 C23.972268,13.8181069 21.5551964,13.8181069 19.1360249,13.8181069 C16.8806514,13.8181069 14.6252779,13.8181069 12.3699045,13.8181069 C10.4631269,13.8181069 8.55844931,13.8181069 6.65167175,13.8181069 C5.28038788,13.8181069 3.91120399,13.8181069 2.53992012,13.8181069 C1.89102775,13.8181069 1.24003541,13.8054914 0.591143045,13.8181069 C0.563843367,13.8181069 0.534443712,13.8181069 0.507144034,13.8181069 C-0.169048011,13.8181069 -0.169048011,14.8693931 0.507144034,14.8693931 Z"
                    id="Path"
                    fill={fill}
                  />
                  <path
                    d="M0.507144034,26.5568931 C0.956538747,26.5568931 1.40383348,26.5568931 1.8532282,26.5568931 C3.06281397,26.5568931 4.27029976,26.5568931 5.47988553,26.5568931 C7.27326443,26.5568931 9.06454336,26.5568931 10.8579223,26.5568931 C13.0460965,26.5568931 15.2321708,26.5568931 17.4203451,26.5568931 C19.8164169,26.5568931 22.2124887,26.5568931 24.6085605,26.5568931 C27.027732,26.5568931 29.4448036,26.5568931 31.8639751,26.5568931 C34.1193486,26.5568931 36.3747221,26.5568931 38.6300955,26.5568931 C40.5368731,26.5568931 42.4415507,26.5568931 44.3483283,26.5568931 C45.7196121,26.5568931 47.088796,26.5568931 48.4600799,26.5568931 C49.1089722,26.5568931 49.7599646,26.5695086 50.408857,26.5568931 C50.4361566,26.5568931 50.4655563,26.5568931 50.492856,26.5568931 C51.169048,26.5568931 51.169048,25.5056069 50.492856,25.5056069 C50.0434613,25.5056069 49.5961665,25.5056069 49.1467718,25.5056069 C47.937186,25.5056069 46.7297002,25.5056069 45.5201145,25.5056069 C43.7267356,25.5056069 41.9354566,25.5056069 40.1420777,25.5056069 C37.9539035,25.5056069 35.7678292,25.5056069 33.5796549,25.5056069 C31.1835831,25.5056069 28.7875113,25.5056069 26.3914395,25.5056069 C23.972268,25.5056069 21.5551964,25.5056069 19.1360249,25.5056069 C16.8806514,25.5056069 14.6252779,25.5056069 12.3699045,25.5056069 C10.4631269,25.5056069 8.55844931,25.5056069 6.65167175,25.5056069 C5.28038788,25.5056069 3.91120399,25.5056069 2.53992012,25.5056069 C1.89102775,25.5056069 1.24003541,25.4929914 0.591143045,25.5056069 C0.563843367,25.5056069 0.534443712,25.5056069 0.507144034,25.5056069 C-0.169048011,25.5056069 -0.169048011,26.5568931 0.507144034,26.5568931 Z"
                    id="Path"
                    fill={fill}
                  />
                  <path
                    d="M0.507144034,38.2443931 C0.956538747,38.2443931 1.40383348,38.2443931 1.8532282,38.2443931 C3.06281397,38.2443931 4.27029976,38.2443931 5.47988553,38.2443931 C7.27326443,38.2443931 9.06454336,38.2443931 10.8579223,38.2443931 C13.0460965,38.2443931 15.2321708,38.2443931 17.4203451,38.2443931 C19.8164169,38.2443931 22.2124887,38.2443931 24.6085605,38.2443931 C27.027732,38.2443931 29.4448036,38.2443931 31.8639751,38.2443931 C34.1193486,38.2443931 36.3747221,38.2443931 38.6300955,38.2443931 C40.5368731,38.2443931 42.4415507,38.2443931 44.3483283,38.2443931 C45.7196121,38.2443931 47.088796,38.2443931 48.4600799,38.2443931 C49.1089722,38.2443931 49.7599646,38.2570086 50.408857,38.2443931 C50.4361566,38.2443931 50.4655563,38.2443931 50.492856,38.2443931 C51.169048,38.2443931 51.169048,37.1931069 50.492856,37.1931069 C50.0434613,37.1931069 49.5961665,37.1931069 49.1467718,37.1931069 C47.937186,37.1931069 46.7297002,37.1931069 45.5201145,37.1931069 C43.7267356,37.1931069 41.9354566,37.1931069 40.1420777,37.1931069 C37.9539035,37.1931069 35.7678292,37.1931069 33.5796549,37.1931069 C31.1835831,37.1931069 28.7875113,37.1931069 26.3914395,37.1931069 C23.972268,37.1931069 21.5551964,37.1931069 19.1360249,37.1931069 C16.8806514,37.1931069 14.6252779,37.1931069 12.3699045,37.1931069 C10.4631269,37.1931069 8.55844931,37.1931069 6.65167175,37.1931069 C5.28038788,37.1931069 3.91120399,37.1931069 2.53992012,37.1931069 C1.89102775,37.1931069 1.24003541,37.1804914 0.591143045,37.1931069 C0.563843367,37.1931069 0.534443712,37.1931069 0.507144034,37.1931069 C-0.169048011,37.1931069 -0.169048011,38.2443931 0.507144034,38.2443931 Z"
                    id="Path"
                    fill={fill}
                  />
                  <path
                    d="M13.8181069,0.507923984 C13.8181069,0.957311755 13.8181069,1.40459958 13.8181069,1.85398735 C13.8181069,3.06355444 13.8181069,4.27102158 13.8181069,5.48058867 C13.8181069,7.27393987 13.8181069,9.06519112 13.8181069,10.8585423 C13.8181069,13.0466828 13.8181069,15.2327233 13.8181069,17.4208638 C13.8181069,19.8168986 13.8181069,22.2129333 13.8181069,24.6089681 C13.8181069,27.0281023 13.8181069,29.4451365 13.8181069,31.8642707 C13.8181069,34.1196093 13.8181069,36.374948 13.8181069,38.6302866 C13.8181069,40.5370347 13.8181069,42.4416829 13.8181069,44.348431 C13.8181069,45.7196937 13.8181069,47.0888564 13.8181069,48.4601191 C13.8181069,49.1090015 13.8054914,49.7599837 13.8181069,50.4088661 C13.8181069,50.4361653 13.8181069,50.4655645 13.8181069,50.4928638 C13.8181069,51.1690454 14.8693931,51.1690454 14.8693931,50.4928638 C14.8693931,50.043476 14.8693931,49.5961882 14.8693931,49.1468004 C14.8693931,47.9372333 14.8693931,46.7297662 14.8693931,45.5201991 C14.8693931,43.7268479 14.8693931,41.9355967 14.8693931,40.1422455 C14.8693931,37.954105 14.8693931,35.7680645 14.8693931,33.579924 C14.8693931,31.1838892 14.8693931,28.7878544 14.8693931,26.3918196 C14.8693931,23.9726855 14.8693931,21.5556512 14.8693931,19.1365171 C14.8693931,16.8811784 14.8693931,14.6258398 14.8693931,12.3705012 C14.8693931,10.4637531 14.8693931,8.5591049 14.8693931,6.65235678 C14.8693931,5.2810941 14.8693931,3.91193135 14.8693931,2.54066867 C14.8693931,1.89178633 14.8820086,1.24080404 14.8693931,0.591921698 C14.8693931,0.564622441 14.8693931,0.535223241 14.8693931,0.507923984 C14.8693931,-0.168257616 13.8181069,-0.170357559 13.8181069,0.507923984 Z"
                    id="Path"
                    stroke={fill}
                    fill={fill}
                  />
                  <path
                    d="M25.5056069,0.507923984 C25.5056069,0.957311755 25.5056069,1.40459958 25.5056069,1.85398735 C25.5056069,3.06355444 25.5056069,4.27102158 25.5056069,5.48058867 C25.5056069,7.27393987 25.5056069,9.06519112 25.5056069,10.8585423 C25.5056069,13.0466828 25.5056069,15.2327233 25.5056069,17.4208638 C25.5056069,19.8168986 25.5056069,22.2129333 25.5056069,24.6089681 C25.5056069,27.0281023 25.5056069,29.4451365 25.5056069,31.8642707 C25.5056069,34.1196093 25.5056069,36.374948 25.5056069,38.6302866 C25.5056069,40.5370347 25.5056069,42.4416829 25.5056069,44.348431 C25.5056069,45.7196937 25.5056069,47.0888564 25.5056069,48.4601191 C25.5056069,49.1090015 25.4929914,49.7599837 25.5056069,50.4088661 C25.5056069,50.4361653 25.5056069,50.4655645 25.5056069,50.4928638 C25.5056069,51.1690454 26.5568931,51.1690454 26.5568931,50.4928638 C26.5568931,50.043476 26.5568931,49.5961882 26.5568931,49.1468004 C26.5568931,47.9372333 26.5568931,46.7297662 26.5568931,45.5201991 C26.5568931,43.7268479 26.5568931,41.9355967 26.5568931,40.1422455 C26.5568931,37.954105 26.5568931,35.7680645 26.5568931,33.579924 C26.5568931,31.1838892 26.5568931,28.7878544 26.5568931,26.3918196 C26.5568931,23.9726855 26.5568931,21.5556512 26.5568931,19.1365171 C26.5568931,16.8811784 26.5568931,14.6258398 26.5568931,12.3705012 C26.5568931,10.4637531 26.5568931,8.5591049 26.5568931,6.65235678 C26.5568931,5.2810941 26.5568931,3.91193135 26.5568931,2.54066867 C26.5568931,1.89178633 26.5695086,1.24080404 26.5568931,0.591921698 C26.5568931,0.564622441 26.5568931,0.535223241 26.5568931,0.507923984 C26.5568931,-0.168257616 25.5056069,-0.170357559 25.5056069,0.507923984 Z"
                    id="Path"
                    stroke={fill}
                    fill={fill}
                  />
                  <path
                    d="M36.1306069,0.507923984 C36.1306069,0.957311755 36.1306069,1.40459958 36.1306069,1.85398735 C36.1306069,3.06355444 36.1306069,4.27102158 36.1306069,5.48058867 C36.1306069,7.27393987 36.1306069,9.06519112 36.1306069,10.8585423 C36.1306069,13.0466828 36.1306069,15.2327233 36.1306069,17.4208638 C36.1306069,19.8168986 36.1306069,22.2129333 36.1306069,24.6089681 C36.1306069,27.0281023 36.1306069,29.4451365 36.1306069,31.8642707 C36.1306069,34.1196093 36.1306069,36.374948 36.1306069,38.6302866 C36.1306069,40.5370347 36.1306069,42.4416829 36.1306069,44.348431 C36.1306069,45.7196937 36.1306069,47.0888564 36.1306069,48.4601191 C36.1306069,49.1090015 36.1179914,49.7599837 36.1306069,50.4088661 C36.1306069,50.4361653 36.1306069,50.4655645 36.1306069,50.4928638 C36.1306069,51.1690454 37.1818931,51.1690454 37.1818931,50.4928638 C37.1818931,50.043476 37.1818931,49.5961882 37.1818931,49.1468004 C37.1818931,47.9372333 37.1818931,46.7297662 37.1818931,45.5201991 C37.1818931,43.7268479 37.1818931,41.9355967 37.1818931,40.1422455 C37.1818931,37.954105 37.1818931,35.7680645 37.1818931,33.579924 C37.1818931,31.1838892 37.1818931,28.7878544 37.1818931,26.3918196 C37.1818931,23.9726855 37.1818931,21.5556512 37.1818931,19.1365171 C37.1818931,16.8811784 37.1818931,14.6258398 37.1818931,12.3705012 C37.1818931,10.4637531 37.1818931,8.5591049 37.1818931,6.65235678 C37.1818931,5.2810941 37.1818931,3.91193135 37.1818931,2.54066867 C37.1818931,1.89178633 37.1945086,1.24080404 37.1818931,0.591921698 C37.1818931,0.564622441 37.1818931,0.535223241 37.1818931,0.507923984 C37.1818931,-0.168257616 36.1306069,-0.170357559 36.1306069,0.507923984 Z"
                    id="Path"
                    stroke={fill}
                    fill={fill}
                  />
                  <circle
                    id="Oval"
                    fill="#1AB3B0"
                    cx="13.6944444"
                    cy="13.6944444"
                    r="3.06944444"
                  />
                  <circle
                    id="Oval"
                    stroke="#000000"
                    fill="#000000"
                    cx="13.7534722"
                    cy="13.7534722"
                    r="1"
                  />
                  <circle
                    id="Oval"
                    fill="#1AB3B0"
                    cx="25.7361111"
                    cy="38.0138889"
                    r="3.06944444"
                  />
                  <circle
                    id="Oval"
                    stroke="#000000"
                    fill="#000000"
                    cx="26.03125"
                    cy="38.3090278"
                    r="1"
                  />
                  <circle
                    id="Oval"
                    fill="#1AB3B0"
                    cx="37.0694444"
                    cy="25.7361111"
                    r="3.06944444"
                  />
                  <circle
                    id="Oval"
                    stroke="#000000"
                    fill="#000000"
                    cx="37.3645833"
                    cy="26.03125"
                    r="1"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const Info = () => {
  return (
    <svg
      width="28px"
      height="28px"
      viewBox="0 0 28 28"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Page-3"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="SV_design-01" transform="translate(-595.000000, -449.000000)">
          <g id="Group-6" transform="translate(596.000000, 450.000000)">
            <circle id="Oval" stroke="#0BC7C2" cx="13" cy="13" r="13" />
            <g
              id="---↳-🌈-Color-2"
              transform="translate(10.000000, 5.000000)"
              fill="var(--color-green)"
            >
              <path
                d="M2.00000001,5.86197757e-14 L4.00000002,5.86197757e-14 L4.00000002,2.16666668 L2.00000001,2.16666668 L2.00000001,5.86197757e-14 Z M6.00000002,10.8333334 L4.00000002,10.8333334 L4.00000002,4.33333335 L-8.43769499e-14,4.33333335 L-8.43769499e-14,6.50000003 L2.00000001,6.50000003 L2.00000001,10.8333334 L-8.43769499e-14,10.8333334 L-8.43769499e-14,13.0000001 L6.00000002,13.0000001 L6.00000002,10.8333334 Z"
                id="---↳-🌈-Color"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const SpatialAnalysisIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>SpatialAnalysis_Icon</title>
      <g
        id="SpatialAnalysis_Icon"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M0.329552161,0.000299756179 C0.14215022,0.0179615409 -0.000804773372,0.175702059 3.40968698e-06,0.363929225 L3.40968698e-06,2.54570603 C3.40968698e-06,2.74652472 0.16282065,2.9093154 0.363643056,2.9093355 L1.27273357,2.9093355 L1.27273357,6.54563019 L0.363643056,6.54563019 C0.16282065,6.54565029 3.40968698e-06,6.70844097 3.40968698e-06,6.90925965 L3.40968698e-06,9.09103101 C3.40968698e-06,9.29185324 0.1628171,9.45464947 0.363643056,9.45466957 L1.27273357,9.45466957 L1.27273357,13.0909643 L0.363643056,13.0909643 C0.1628242,13.0909844 3.40968698e-06,13.2537695 3.40968698e-06,13.4545846 L3.40968698e-06,15.6363614 C3.40968698e-06,15.8371837 0.1628171,16 0.363643056,16 L2.5454603,16 C2.74628625,16 2.90908143,15.8371837 2.90909651,15.6363614 L2.90909651,14.9091025 L6.54545858,14.9091025 L6.54545858,15.6363614 C6.54547366,15.8371837 6.70826883,16 6.90909479,16 L9.09091203,16 C9.29173799,16 9.45453316,15.8371837 9.45454824,15.6363614 L9.45454824,14.9091025 L13.0909103,14.9091025 L13.0909103,15.6363614 C13.0909254,15.8371837 13.2537206,16 13.4545465,16 L15.6363638,16 C15.8371897,16 16.0000034,15.8371837 16.0000034,15.6363614 L16.0000034,13.4545846 C16.0000034,13.2537695 15.8371826,13.0909844 15.6363638,13.0909643 L14.7272732,13.0909643 L14.7272732,9.45466957 L15.6363638,9.45466957 C15.8371897,9.45464947 16.0000034,9.29185324 16.0000034,9.09103101 L16.0000034,6.90925965 C16.0000034,6.70844097 15.8371862,6.54565029 15.6363638,6.54563019 L14.7272732,6.54563019 L14.7272732,2.9093355 L15.6363638,2.9093355 C15.8371862,2.9093154 16.0000034,2.74652472 16.0000034,2.54570603 L16.0000034,0.363929225 C16.0008116,0.175702059 15.8578566,0.0179615409 15.6704547,0.000299756179 C15.6590973,-9.99187264e-05 15.6477211,-9.99187264e-05 15.6363638,0.000299756179 L13.4545465,0.000299756179 C13.2537241,0.000319855112 13.0909304,0.16311054 13.0909103,0.363929225 L13.0909103,1.09118816 L9.45454824,1.09118816 L9.45454824,0.363929225 C9.45452814,0.16311054 9.29173444,0.000319855112 9.09091203,0.000299756179 L6.90909479,0.000299756179 C6.8977374,-9.99187264e-05 6.88636128,-9.99187264e-05 6.87500389,0.000299756179 C6.68760195,0.0179615409 6.54464696,0.175702059 6.54545858,0.363929225 L6.54545858,1.09118816 L2.90909651,1.09118816 L2.90909651,0.363929225 C2.90907641,0.16311054 2.74628271,0.000319855112 2.5454603,0.000299756179 L0.363643056,0.000299756179 C0.352285672,-9.99187264e-05 0.340909545,-9.99187264e-05 0.329552161,0.000299756179 Z M0.727279263,0.727558693 L2.18182409,0.727558693 L2.18182409,2.18207657 L0.727279263,2.18207657 L0.727279263,0.727558693 Z M7.27273099,0.727558693 L8.72727582,0.727558693 L8.72727582,2.18207657 L7.27273099,2.18207657 L7.27273099,0.727558693 Z M13.8181827,0.727558693 L15.2727276,0.727558693 L15.2727276,2.18207657 L13.8181827,2.18207657 L13.8181827,0.727558693 Z M2.90909651,1.8184471 L6.54545858,1.8184471 L6.54545858,2.54570603 C6.54547868,2.74652472 6.70827238,2.9093154 6.90909479,2.9093355 L9.09091203,2.9093355 C9.29173444,2.9093154 9.45452814,2.74652472 9.45454824,2.54570603 L9.45454824,1.8184471 L13.0909103,1.8184471 L13.0909103,2.54570603 C13.0909304,2.74652472 13.2537241,2.9093154 13.4545465,2.9093355 L14.000006,2.9093355 L14.000006,6.54563019 L13.4545465,6.54563019 C13.2537241,6.54565029 13.0909304,6.70844097 13.0909103,6.90925965 L13.0909103,9.09103101 C13.0909254,9.29185324 13.2537206,9.45464947 13.4545465,9.45466957 L14.000006,9.45466957 L14.000006,13.0909643 L13.4545465,13.0909643 C13.2537277,13.0909844 13.0909354,13.2537695 13.0909103,13.4545846 L13.0909103,14.1818436 L9.45454824,14.1818436 L9.45454824,13.4545846 C9.45452312,13.2537695 9.29173089,13.0909844 9.09091203,13.0909643 L6.90909479,13.0909643 C6.70827593,13.0909844 6.5454837,13.2537695 6.54545858,13.4545846 L6.54545858,14.1818436 L2.90909651,14.1818436 L2.90909651,13.4545846 C2.90907139,13.2537695 2.74627916,13.0909844 2.5454603,13.0909643 L2.00000599,13.0909643 L2.00000599,9.45466957 L2.5454603,9.45466957 C2.74628625,9.45464947 2.90908143,9.29185324 2.90909651,9.09103101 L2.90909651,6.90925965 C2.90907641,6.70844097 2.74628271,6.54565029 2.5454603,6.54563019 L2.00000599,6.54563019 L2.00000599,2.9093355 L2.5454603,2.9093355 C2.74628271,2.9093154 2.90907641,2.74652472 2.90909651,2.54570603 L2.90909651,1.8184471 Z M0.727279263,7.27288912 L2.18182409,7.27288912 L2.18182409,8.72741063 L0.727279263,8.72741063 L0.727279263,7.27288912 Z M13.8181827,7.27288912 L15.2727276,7.27288912 L15.2727276,8.72741063 L13.8181827,8.72741063 L13.8181827,7.27288912 Z M0.727279263,13.8182232 L2.18182409,13.8182232 L2.18182409,15.2727411 L0.727279263,15.2727411 L0.727279263,13.8182232 Z M7.27273099,13.8182232 L8.72727582,13.8182232 L8.72727582,15.2727411 L7.27273099,15.2727411 L7.27273099,13.8182232 Z M13.8181827,13.8182232 L15.2727276,13.8182232 L15.2727276,15.2727411 L13.8181827,15.2727411 L13.8181827,13.8182232 Z"
          id="Shape"
          fill="#D8D8D8"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};
