"use client";

import { useRouter } from 'next/navigation';

const HomePageLinks = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      <header className="flex w-full h-16 items-center justify-center p-2 sm:justify-end sm:px-6">
        {/* 
          - flex-row: Keeps buttons side-by-side on all screens
          - gap-2 sm:gap-3: Adds clean spacing between buttons
          - w-auto: Lets the container fit the buttons naturally without squishing them
        */}
        <div className="flex flex-row items-center gap-2 sm:gap-3 w-auto">
          

          {/* Sign In */}
          <button 
            onClick={() => router.push("/sign-in")} 
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer transition-colors"
          >
            Sign In
          </button>
          
          {/* Sign Up */}
          <button 
            onClick={() => router.push("/sign-up")} 
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer transition-colors"
          >
            Sign Up
          </button>

          {/* Dashboard */}
          <button 
            onClick={() => router.push("/dashboard")} 
            className="bg-blue-800 hover:bg-blue-900 text-white rounded-full px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer transition-colors"
          >
            Dashboard
          </button>

        </div>
      </header>
    </div>
  );
};

export default HomePageLinks;