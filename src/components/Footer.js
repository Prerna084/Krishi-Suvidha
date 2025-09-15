import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Punjab Krishi Portal</h3>
            <p className="text-gray-400">
              Empowering farmers with technology, information, and resources for sustainable agriculture.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/soil-health" className="text-gray-400 hover:text-white">Soil Testing</a></li>
              <li><a href="/weather" className="text-gray-400 hover:text-white">Weather Forecast</a></li>
              <li><a href="/crop-advice" className="text-gray-400 hover:text-white">Crop Advisory</a></li>
              <li><a href="/marketplace" className="text-gray-400 hover:text-white">Market Prices</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="/#support" className="text-gray-400 hover:text-white">Help Center</a></li>
              <li><a href="/krishi-kendra" className="text-gray-400 hover:text-white">Contact Krishi Kendra</a></li>
              <li><a href="/#faq" className="text-gray-400 hover:text-white">FAQ</a></li>
              <li><a href="/feedback" className="text-gray-400 hover:text-white">Feedback</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Toll Free: 1800-123-4567</li>
              <li className="text-gray-400">Email: support@punjabkrishi.gov.in</li>
              <li className="flex space-x-4 pt-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2023 Punjab Krishi Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
