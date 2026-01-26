const NotFound: React.FC = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="mt-2 text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back Home
        </a>
      </div>
    );
  };
  
  export default NotFound;
  