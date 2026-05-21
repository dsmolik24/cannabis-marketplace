export function LeafRating({
  rating,
  max = 5,
  size = "md",
  showValue = false,
  reviewCount,
}: {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
}) {
  const sizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4.5 w-4.5",
    lg: "h-6 w-6",
  };
  const iconSize = sizes[size];

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          return (
            <svg
              key={i}
              className={`${iconSize} ${
                filled
                  ? "text-green-600 dark:text-green-400"
                  : partial
                    ? "text-green-400/60 dark:text-green-500/50"
                    : "text-zinc-200 dark:text-zinc-700"
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C12 2 7.5 4 6 8c-1 2.67-.5 5 0 6.5.5 1.5 1.5 3 3 4C10.5 19.5 12 22 12 22s1.5-2.5 3-3.5c1.5-1 2.5-2.5 3-4s1-3.83 0-6.5C16.5 4 12 2 12 2z" />
              <path
                d="M12 5c0 0 .5.5 1 1.5s1 2.5 1 4-.5 3-1.5 4S12 16 12 16s-.5-.5-1.5-1.5S9 12.5 9 10.5s.5-3 1-4S12 5 12 5z"
                fill="currentColor"
                opacity={0.3}
              />
            </svg>
          );
        })}
      </div>
      {showValue && (
        <span className="ml-1 text-sm font-semibold text-green-700 dark:text-green-400">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}

export function LeafRatingBadge({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount?: number;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-green-50 px-2.5 py-1.5 dark:bg-green-900/20">
      <svg
        className="h-3.5 w-3.5 text-green-600 dark:text-green-400"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C12 2 7.5 4 6 8c-1 2.67-.5 5 0 6.5.5 1.5 1.5 3 3 4C10.5 19.5 12 22 12 22s1.5-2.5 3-3.5c1.5-1 2.5-2.5 3-4s1-3.83 0-6.5C16.5 4 12 2 12 2z" />
      </svg>
      <span className="text-sm font-bold text-green-700 dark:text-green-400">
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-[10px] text-green-600/70 dark:text-green-500/70">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
