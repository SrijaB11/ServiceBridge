import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchServices from "./customer/SearchServices";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="text-center lg:text-left">
            {/* TAG */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              Trusted Home Services
            </div>

            {/* HEADING */}
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
              Quality Services.
              <br />
              Trusted Professionals.
              <br />
              <span className="text-green-500">Complete Peace of Mind.</span>
            </h1>

            {/* DESC */}
            <p className="mt-5 text-gray-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Book trusted experts near you for plumbing, cleaning, electrical
              work and more.
            </p>
            <SearchServices />
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-green-100 rounded-full blur-3xl opacity-40"></div>

            <img
              src="/images/service_bridge_illustration.png"
              alt="Service Worker"
              className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
