import { Skeleton } from "@/components/ui/skeleton";

const ShimmerEffect = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
);

const AuthPageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        {/* Left side - Form */}
        <div className="mr-8 flex-1">
          <Skeleton className="mb-2 h-10 w-40" />
          <Skeleton className="mb-8 h-4 w-64" />

          <div className="mb-6">
            <Skeleton className="mb-2 h-8 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="mb-6">
            <Skeleton className="mb-2 h-8 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <Skeleton className="mt-8 h-12 w-full rounded-md" />
        </div>

        {/* Right side - Image placeholder */}
        <div className="relative flex-1 overflow-hidden">
          <Skeleton className="h-64 w-full rounded-lg" />
          <ShimmerEffect />
        </div>
      </div>
    </div>
  );
};

export default AuthPageLoader;
