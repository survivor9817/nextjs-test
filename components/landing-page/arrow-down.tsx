type ScrollDownIndicatorProps = {
  className?: string;
};

const ArrowDown = ({ className = "" }: ScrollDownIndicatorProps) => {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Chevron 1 */}
      <path
        d="M16 10L32 25L48 10"
        className="
          stroke-[#08089A]
          opacity-10
          animate-[scroll-chevron_1.5s_ease-in-out_infinite]
        "
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Chevron 2 */}
      <path
        d="M16 24L32 39L48 24"
        className="
          stroke-[#08089A]
          opacity-10
          animate-[scroll-chevron_1.5s_0.2s_ease-in-out_infinite]
        "
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Chevron 3 */}
      <path
        d="M16 38L32 53L48 38"
        className="
          stroke-[#08089A]
          opacity-10
          animate-[scroll-chevron_1.5s_0.4s_ease-in-out_infinite]
        "
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <style>
        {`
          @keyframes scroll-chevron {
            0%, 100% {
              opacity: 0.1;
            }

            35% {
              opacity: 1;
            }

            70% {
              opacity: 0.1;
            }
          }
        `}
      </style>
    </svg>
  );
};

export default ArrowDown;
