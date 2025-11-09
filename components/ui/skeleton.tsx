/**
 * Loading skeleton components for better UX
 */

export function CardSkeleton() {
  return (
    <div className="relative overflow-hidden bg-gray-800/50 border-2 border-purple-400/20 rounded-lg animate-pulse">
      <div className="h-48 bg-gray-700/50" />
      <div className="p-6 space-y-3">
        <div className="h-6 bg-gray-700/50 rounded w-3/4" />
        <div className="h-4 bg-gray-700/50 rounded w-full" />
        <div className="h-4 bg-gray-700/50 rounded w-5/6" />
        <div className="flex gap-2 mt-4">
          <div className="h-8 bg-gray-700/50 rounded w-20" />
          <div className="h-8 bg-gray-700/50 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export function RecipeGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DropdownSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3">
          <div className="w-6 h-4 bg-gray-700/50 rounded" />
          <div className="h-4 bg-gray-700/50 rounded flex-1" />
        </div>
      ))}
    </div>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-700/50 rounded"
          style={{ width: i === lines - 1 ? "75%" : "100%" }}
        />
      ))}
    </div>
  );
}
