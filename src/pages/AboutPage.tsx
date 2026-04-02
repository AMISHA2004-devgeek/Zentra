import React from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate(); // ✅ correct hook

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

      {/* 🔥 HERO */}
      <div className="relative h-[320px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 opacity-90" />
        <div className="absolute w-[500px] h-[500px] bg-pink-400 blur-[120px] opacity-30 rounded-full top-[-100px]" />

        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About Zentra ✈️
          </h1>
          <p className="mt-3 text-lg opacity-90">
            Plan less. Experience more.
          </p>
        </div>
      </div>

      {/* 🌍 CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your AI Travel Companion
          </h2>

          <p className="text-gray-600 mb-6">
            Zentra uses AI + smart optimization to build perfect trips instantly.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li>🤖 AI-generated itineraries</li>
            <li>🧭 Smart route optimization</li>
            <li>📊 Live budget tracking</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🌍</div>
          <h3 className="text-xl font-semibold">Smart Travel Planning</h3>
        </div>
      </div>

      {/* 🚀 CTA */}
      <div className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to Explore Smarter?
        </h2>

        <p className="text-gray-600 mb-6">
          Let Zentra plan your next adventure in seconds.
        </p>

        {/* ✅ FIXED BUTTON */}
        <button
          onClick={() => navigate("/Zen-planner")}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition"
        >
          Start Planning 🚀
        </button>

        {/* ✅ CONTACT BUTTON */}
        <div className="mt-4">
          <button
            onClick={() =>
              alert("Contact has been successfully sent ✅")
            }
            className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;