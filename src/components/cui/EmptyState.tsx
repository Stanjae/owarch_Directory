"use client";
import React from "react";
import { LucideProps } from "lucide-react";
import { EmptyStateTypes } from "@/types/types";

type EmptyStateProps = {
  empty: EmptyStateTypes | undefined;
  searchQuery?: string;
};

export default function EmptyState({ empty, searchQuery }: EmptyStateProps) {
  const Icon = empty?.icon as React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;

  const ButtonIcon = empty?.buttonIcon as React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;

  return (
    empty && (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md w-full text-center">
          {/* Empty State Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-full p-6">
              <Icon className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
            </div>
          </div>

          {/* Empty State Title */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            {empty?.title}
          </h2>

          {/* Empty State Message */}
          <p className="text-gray-600 mb-8 max-w-sm mx-auto">
            {empty?.message}
          </p>

          {/* Search Query Display (if applicable) */}
          {searchQuery && (
            <div className="mb-6 inline-block">
              <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
                Searched for: <span className="font-medium">{searchQuery}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {empty?.buttonAction && empty?.buttonText && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={empty.buttonAction}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <ButtonIcon className="w-4 h-4" />
                {empty.buttonText}
              </button>
            </div>
          )}

          {/* Suggestions for search results */}
          {empty?.type === "search" && (
            <div className="mt-8 text-left bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                Suggestions:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Check your spelling</li>
                <li>• Try different or more general keywords</li>
                <li>• Remove filters to see all results</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  );
}
