import { Skeleton } from "@/components/ui/skeleton"

const ShimmerEffect = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
);

const ChatPageLoader = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800  p-2 flex flex-col">
        <div className="mb-8">
          <Skeleton className="h-8 w-24 bg-gray-700 rounded" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-6 w-full bg-gray-700 rounded mb-2" />
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-full bg-gray-700" />
                <Skeleton className="h-4 w-32 bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <Skeleton className=" w-full h-[8vh] bg-gray-700 rounded mb-2" />
          <div className="space-y-2">
          
        
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex px-8 flex-col">
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          <Skeleton className="h-36 w-36 rounded-full bg-gray-800" />
          <ShimmerEffect />
        </div>
        <Skeleton className="h-12 w-full  mx-auto mb-8 bg-gray-800 rounded" />
      </div>
    </div>
  );
};

export default ChatPageLoader;