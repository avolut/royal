export function Shimmer({
  color,
  className,
}: {
  color?: string;
  className?: string;
}) {
  const id = Math.floor(Math.random() * 1000000000);
  return (
    <svg
      width="125"
      height="25"
      preserveAspectRatio="none"
      viewBox="0 0 125 25"
      className={className || ""}
    >
      <rect
        width="100%"
        height="100%"
        fill={`url("#fill-${id}")`}
        clipPath={`url(#clp-${id})`}
      ></rect>
      <defs>
        <clipPath id={`clp-${id}`}>
          <rect width="123" height="7" x="1" y="0" rx="4" ry="7"></rect>
          <rect width="88" height="7" x="1" y="15" rx="4" ry="7"></rect>
        </clipPath>
        <linearGradient id={`fill-${id}`}>
          <stop offset="0.6" stopColor="transparent">
            <animate
              attributeName="offset"
              dur="2s"
              keyTimes="0; 0.25; 1"
              repeatCount="indefinite"
              values="-2; -2; 1"
            ></animate>
          </stop>
          <stop offset="1.6" stopColor={color || "#ececeb"}>
            <animate
              attributeName="offset"
              dur="2s"
              keyTimes="0; 0.25; 1"
              repeatCount="indefinite"
              values="-1; -1; 2"
            ></animate>
          </stop>
          <stop offset="2.6" stopColor="transparent">
            <animate
              attributeName="offset"
              dur="2s"
              keyTimes="0; 0.25; 1"
              repeatCount="indefinite"
              values="0; 0; 3"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
