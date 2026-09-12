import React from 'react';

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center gap-8 py-12 md:py-24 rounded-xl bg-gray-50 overflow-hidden relative isolate">
      {/* Background Subtle Pattern/Gradient */}
      <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 to-transparent"></div>
      <h1 className="text-4xl md:text-[56px] md:leading-[64px] font-bold text-gray-900 max-w-3xl px-4 tracking-tight">
          Discover great deals in your local community.
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl px-4">
          From cars to real estate, find exactly what you&apos;re looking for nearby. Trusted connections, zero clutter.
      </p>
      
      {/* Search Box */}
      <div className="mt-8 w-full max-w-3xl px-4">
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg shadow-blue-900/5 border border-gray-100 p-2 gap-2">
          <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg flex-1 md:max-w-[200px] border border-transparent focus-within:border-blue-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-[#006877] mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <input className="bg-transparent border-none focus:ring-0 w-full text-sm text-gray-900 placeholder:text-gray-400 outline-none p-0" placeholder="Select your city" type="text"/>
          </div>
          <div className="h-[1px] md:h-auto md:w-[1px] bg-gray-200 my-1 mx-2"></div>
          <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg flex-1 border border-transparent focus-within:border-blue-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input className="bg-transparent border-none focus:ring-0 w-full text-sm text-gray-900 placeholder:text-gray-400 outline-none p-0" placeholder="What are you looking for?" type="text"/>
          </div>
          <button className="bg-[#004ccd] text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2 mt-2 md:mt-0">
              Search
          </button>
        </div>
      </div>
    </section>
  );
}
