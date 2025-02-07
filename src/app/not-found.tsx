import Link from "next/link";

const NotFound = () => {
   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
               Page Not Found
            </h2>
            <p className="text-gray-600 mb-6">
               The page {"you're"} looking for {"doesn't"} exist or has been
               moved.
            </p>
            <Link
               href="/"
               className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
               Return Home
            </Link>
         </div>
      </div>
   );
};

export default NotFound;
