'use client'
import Image from "next/image";
import React from "react";
import Logo from "../../../public/logo.png";

export default function LogoLoader() {
  return (
   
      <div className="text-center z-50">
        {/* Container for logo and spinning circle */}
        <div className="relative inline-block w-16 h-16">
          {/* Static Logo in the center */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Replace this with your logo */}
            <Image
              src={Logo}
              alt="Logo"
              className="w-10 h-10 rounded-lg"
            />
          </div>

          {/* Spinning Circle Border */}
          <svg
            className="w-16 h-16 animate-spin"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="4"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="4"
              className="text-light-brown"
              strokeDasharray="70 200"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Optional loading text */}
        <p className="mt-2 text-gray-600 text-sm">Loading...</p>
      </div>
   
  );
}
