export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
          <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

