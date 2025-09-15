 import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative hero-pattern text-white py-24 md:py-28">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 border-0">
            Transforming Punjab Agriculture with Technology
          </h2>
          <p className="text-lg md:text-xl mb-10 text-white/90">
            Your one-stop solution for crop advice, market prices, government schemes, and modern farming techniques
          </p>
          <div className="flex justify-center gap-3 md:gap-4">
            <button
              className="bg-white text-green-800 font-semibold px-6 py-3 rounded-lg shadow-sm hover:bg-green-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              onClick={() => navigate("/marketplace")}
            >
              Get Started
            </button>
            <button
              className="bg-transparent ring-2 ring-white/80 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              onClick={() => navigate("/schemes")}
            >
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className="bg-green-50 rounded-lg p-6 text-center feature-card cursor-pointer shadow-md hover:shadow-lg"
              onClick={() => navigate("/soil-health")}
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Soil Testing</h3>
              <p className="text-gray-600">Test your soil and get recommendations</p>
            </div>

            <div
              className="bg-blue-50 rounded-lg p-6 text-center feature-card cursor-pointer shadow-md hover:shadow-lg"
              onClick={() => navigate("/weather")}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Weather Forecast</h3>
              <p className="text-gray-600">Get accurate weather predictions</p>
            </div>

            <div
              className="bg-yellow-50 rounded-lg p-6 text-center feature-card cursor-pointer shadow-md hover:shadow-lg"
              onClick={() => navigate("/marketplace")}
            >
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Market Prices</h3>
              <p className="text-gray-600">Check real-time crop prices</p>
            </div>

            <div
              className="bg-purple-50 rounded-lg p-6 text-center feature-card cursor-pointer shadow-md hover:shadow-lg"
              onClick={() => navigate("/chatbot")}
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Assistant</h3>
              <p className="text-gray-600">Get instant answers to your queries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-16 bg-gray-50 scroll-offset">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services for Punjab Farmers</h2>

          {/* Crop Advisory Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Smart Crop Advisory</h3>
              <p className="text-gray-600 mb-4">Get personalized crop recommendations based on:</p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Soil type and nutrient levels</li>
                <li>Local weather conditions</li>
                <li>Water availability in your region</li>
                <li>Market demand predictions</li>
              </ul>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700" onClick={() => navigate("/crop-advice")}>
                Get Recommendations
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2e410baf-3a44-44f9-82ba-99c3087fd158.png"
                alt="Crop advisory dashboard showing recommended crops based on soil, weather and water conditions"
                className="rounded"
              />
            </div>
          </div>

          {/* Disease Detection Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div className="bg-white p-6 rounded-lg shadow-md order-2 md:order-1">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/64fd3bc6-2018-400e-9f51-58e25384cf66.png"
                alt="Crop disease detection interface with image upload and analysis results"
                className="rounded"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-semibold mb-4">AI-Powered Disease Detection</h3>
              <p className="text-gray-600 mb-4">
                Upload images of your crops to instantly identify diseases and get treatment solutions:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Quick diagnosis with smartphone camera</li>
                <li>Organic treatment recommendations</li>
                <li>Connect with nearest Krishi Kendra</li>
                <li>Preventive measures for your farm</li>
              </ul>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700" onClick={() => navigate("/disease-detection")}>
                Detect Disease
              </button>
            </div>
          </div>

          {/* Modern Farming Techniques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Modern Farming Techniques</h3>
              <p className="text-gray-600 mb-4">Learn innovative farming methods through engaging video content:</p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Vermicompost preparation</li>
                <li>Organic pesticide production</li>
                <li>Drone technology for spraying</li>
                <li>Water conservation methods</li>
              </ul>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700" onClick={() => navigate("/local-resources")}>
                Watch Videos
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="relative">
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c7563ad1-1a83-4fb1-8977-7cf82d1d4846.png"
                  alt="Demo video showing modern farming techniques including drone spraying and vermicompost preparation"
                  className="rounded"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-green-600 text-white p-4 rounded-full hover:bg-green-700" onClick={() => navigate("/local-resources")}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Market Price Section */}
      <section id="market" className="py-16 bg-white scroll-offset">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Real-Time Market Prices</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Check updated prices from mandis across Punjab in your preferred language
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex flex-wrap gap-4 mb-6">
              <select className="bg-white border border-gray-300 rounded-lg px-4 py-2">
                <option>Select District</option>
                <option>Amritsar</option>
                <option>Ludhiana</option>
                <option>Jalandhar</option>
                <option>Patiala</option>
              </select>
              <select className="bg-white border border-gray-300 rounded-lg px-4 py-2">
                <option>Select Crop</option>
                <option>Wheat</option>
                <option>Rice</option>
                <option>Cotton</option>
                <option>Sugarcane</option>
              </select>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700" onClick={() => navigate("/marketplace")}>
                Check Prices
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="py-3 px-4 text-left">Mandi</th>
                    <th className="py-3 px-4 text-left">Crop</th>
                    <th className="py-3 px-4 text-right">Min Price (₹/quintal)</th>
                    <th className="py-3 px-4 text-right">Max Price (₹/quintal)</th>
                    <th className="py-3 px-4 text-right">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4">Amritsar Main</td>
                    <td className="py-3 px-4">Wheat</td>
                    <td className="py-3 px-4 text-right">2,150</td>
                    <td className="py-3 px-4 text-right">2,250</td>
                    <td className="py-3 px-4 text-right text-green-600">↑ 2%</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4">Ludhiana</td>
                    <td className="py-3 px-4">Rice</td>
                    <td className="py-3 px-4 text-right">1,850</td>
                    <td className="py-3 px-4 text-right">1,950</td>
                    <td className="py-3 px-4 text-right text-red-600">↓ 1.5%</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4">Jalandhar</td>
                    <td className="py-3 px-4">Cotton</td>
                    <td className="py-3 px-4 text-right">6,200</td>
                    <td className="py-3 px-4 text-right">6,500</td>
                    <td className="py-3 px-4 text-right text-green-600">↑ 3%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Shared Transport Facility</h3>
              <p className="text-gray-600 mb-4">Reduce logistics costs by sharing transportation with nearby farmers</p>
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">GPS Tracking</h4>
                  <p className="text-sm text-gray-600">Real-time vehicle tracking for better coordination</p>
                </div>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                Find Transport Partners
              </button>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Cold Storage Locator</h3>
              <p className="text-gray-600 mb-4">Find nearby cold storage facilities with availability status</p>
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Storage Monitoring</h4>
                  <p className="text-sm text-gray-600">Check temperature and capacity in real-time</p>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                Find Cold Storage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Government Schemes Section */}
      <section id="schemes" className="py-16 bg-gray-100 scroll-offset">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Government Schemes</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Access information about state and central government schemes for farmers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/48ceb134-fd9b-4d90-82ed-b87f9ebd4256.png"
                alt="Punjab government subsidy scheme for agricultural equipment"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">Farm Mechanization Scheme</h3>
                <p className="text-gray-600 mb-4">Subsidy up to 50% on agricultural equipment purchases</p>
                <button className="text-green-600 font-medium text-sm hover:underline" onClick={() => navigate("/schemes")}>
                  Learn More →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9b24232e-32bf-415f-bfdd-2ef2ef0514cc.png"
                alt="Crop insurance scheme information with farmer protection benefits"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">PM Fasal Bima Yojana</h3>
                <p className="text-gray-600 mb-4">Crop insurance with minimal premium for farmers</p>
                <button className="text-green-600 font-medium text-sm hover:underline" onClick={() => navigate("/schemes")}>
                  Learn More →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9c3f419b-80d2-4a05-bc0f-486cd4725ed7.png"
                alt="Organic farming promotion scheme with certification support"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">Organic Farming Promotion</h3>
                <p className="text-gray-600 mb-4">Financial assistance for organic certification and inputs</p>
                <button className="text-green-600 font-medium text-sm hover:underline" onClick={() => navigate("/schemes")}>
                  Learn More →
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700" onClick={() => navigate("/schemes")}>
              View All Schemes
            </button>
          </div>
        </div>
      </section>

      {/* Volunteer Program Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Volunteer for Punjab Farmers</h2>
            <p className="text-xl mb-8">Share your expertise and time to support the farming community in Punjab</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-green-700 p-6 rounded-lg">
                <div className="bg-green-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Tech Support</h3>
                <p className="text-green-100">Help farmers with digital tools and technology</p>
              </div>

              <div className="bg-green-700 p-6 rounded-lg">
                <div className="bg-green-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Awareness Programs</h3>
                <p className="text-green-100">Educate farmers about government schemes</p>
              </div>

              <div className="bg-green-700 p-6 rounded-lg">
                <div className="bg-green-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Community Building</h3>
                <p className="text-green-100">Connect farmers with resources and each other</p>
              </div>
            </div>
            <button className="bg-white text-green-800 font-semibold px-8 py-3 rounded-lg hover:bg-green-50">
              Register as Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* Chatbot Widget */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700" onClick={() => navigate("/chatbot")}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
