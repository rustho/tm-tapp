"use client";

export default function Home() {
  const handleClick = () => {
    console.log("Button clicked");
    // Add any additional interactivity here
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Welcome!</h1>
        <p className="text-gray-600">Get started with your journey</p>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium
                     hover:bg-blue-700 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleClick}
        >
          Get Started
        </button>
      </div>
    </main>
  );
}
