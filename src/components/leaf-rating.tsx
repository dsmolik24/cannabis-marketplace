function CannabisLeaf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* 7-pointed cannabis fan leaf */}
      <path d="M12 2c0 0-1.2 2.4-1.2 4.8 0 1.2.3 2.1.6 2.7-.9-.6-2.7-1.5-4.5-1.5-1.8 0-3 .6-3 .6s1.2 1.2 2.7 1.8c1.2.5 2.1.5 2.7.4-.6.6-1.5 2.1-1.8 3.9-.3 1.8 0 3.3 0 3.3s1.5-.6 2.4-1.8c.8-1 1.1-1.8 1.2-2.4.1.9.3 2.7 1.2 4.2.6 1.2 1.2 1.8 1.2 1.8v2.1c0 .6.2 1 .5 1h.2c.3 0 .5-.4.5-1v-2.1s.6-.6 1.2-1.8c.9-1.5 1.1-3.3 1.2-4.2.1.6.4 1.4 1.2 2.4.9 1.2 2.4 1.8 2.4 1.8s.3-1.5 0-3.3c-.3-1.8-1.2-3.3-1.8-3.9.6.1 1.5.1 2.7-.4 1.5-.6 2.7-1.8 2.7-1.8s-1.2-.6-3-.6c-1.8 0-3.6.9-4.5 1.5.3-.6.6-1.5.6-2.7C13.2 4.4 12 2 12 2z" />
    </svg>
  );
}

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
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };
  const iconSize = sizes[size];

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          return (
            <CannabisLeaf
              key={i}
              className={`${iconSize} transition-colors ${
                filled
                  ? "text-green-600 dark:text-green-400"
                  : partial
                    ? "text-green-400/50 dark:text-green-500/40"
                    : "text-zinc-200 dark:text-zinc-700"
              }`}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="ml-0.5 text-sm font-semibold text-green-700 dark:text-green-400">
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
      <CannabisLeaf className="h-4 w-4 text-green-600 dark:text-green-400" />
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
