'use client';
import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

type ErrorDisplayProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function CErrorState({
  title = "Failed to Load Data",
  message = "We couldn't fetch the data you requested. Please try again.",
  onRetry,
}: ErrorDisplayProps) {
  return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {/* Error Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 rounded-full p-4">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Error Title */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>

          {/* Error Message */}
          <p className="text-gray-600 mb-6">{message}</p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            )}
          </div>

          {/* Optional Support Text */}
          <p className="text-sm text-gray-500 mt-6">
            If the problem persists, please contact support.
          </p>
        </div>
      </div>
  );
}
