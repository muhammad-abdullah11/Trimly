import { FaLink } from "react-icons/fa";

const HeroSection = () => {
  return (
    <main className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <FaLink className="text-5xl text-emerald-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Shorten Your Links Instantly
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Trimly helps you create short, memorable links in seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Paste your URL here"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600">
            Shorten
          </button>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
