import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from 'lucide-react';



const ProfilePageLoader = () => {
  return (
    <div className="min-h-screen flex justify-center  items-center bg-gray-900 text-white ">
      <div className="max-w-2xl w-screen absolute  mx-auto">
        {/* Back arrow */}
        <ArrowLeft className=" text-gray-400" size={24} />

        <div className="flex items-center ">
          {/* Profile picture */}
          <div className="relative w-36   h-36 mr-6">
            <Skeleton className="w-full h-full rounded-full bg-gray-700" />
           
          </div>

          {/* Form fields */}
          <div className="flex-1">
            {['Email', 'First Name', 'Last Name'].map((_, index) => (
              <div key={index} className="mb-4">
                <Skeleton className="h-4 w-20 mb-1 bg-gray-700" />
                <Skeleton className="h-10 w-full rounded-md bg-gray-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Color options */}
        <div className="flex justify-center space-x-4 mb-8">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="w-8 h-8 rounded-full bg-gray-700" />
          ))}
        </div>

        {/* Save button */}
        <Skeleton className="h-12 w-full rounded-md bg-purple-600" />
      </div>
    </div>
  );
};

export default ProfilePageLoader;