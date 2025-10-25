export function IndigenousPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 20L110 40L130 45L115 60L120 80L100 70L80 80L85 60L70 45L90 40L100 20Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M100 120L110 140L130 145L115 160L120 180L100 170L80 180L85 160L70 145L90 140L100 120Z"
        fill="currentColor"
        opacity="0.15"
      />
      <circle cx="40" cy="100" r="8" fill="currentColor" opacity="0.1" />
      <circle cx="160" cy="100" r="8" fill="currentColor" opacity="0.1" />
      <path
        d="M100 50C120 50 130 60 130 80C130 100 120 110 100 110C80 110 70 100 70 80C70 60 80 50 100 50Z"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.1"
        fill="none"
      />
    </svg>
  );
}

export function CocarPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.08">
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 180) / 23 - 90;
          const length = 60 + Math.random() * 20;
          const x1 = 150;
          const y1 = 130;
          const x2 = x1 + Math.cos((angle * Math.PI) / 180) * length;
          const y2 = y1 + Math.sin((angle * Math.PI) / 180) * length;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="150" cy="130" r="25" fill="currentColor" />
      </g>
    </svg>
  );
}
