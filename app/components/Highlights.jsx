import React, { useState } from "react";
import { motion } from "framer-motion";
import { highlightsData } from "@/assets/assets";

function Highlights() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicating the highlights array for seamless infinite scroll
  const duplicatedHighlights = [
    ...highlightsData,
    ...highlightsData,
    ...highlightsData,
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="my-20 w-full py-10 bg-gradient-to-b from-white via-gray-50 to-white dark:from-darkTheme dark:via-neutral-900 dark:to-darkTheme border-y border-gray-200 dark:border-neutral-700 overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent dark:via-blue-950/20 pointer-events-none"></div>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-10 text-center text-5xl font-Ovo relative z-10"
      >
        <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Highlights
        </span>
      </motion.h2>

      <div
        className="relative z-10 px-4"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        <div
          className="flex gap-6 animate-scroll"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {duplicatedHighlights.map((highlight, index) => {
            const Icon = highlight.icon;
            const isSpecial = highlight.special; // For SIH Finalist and 9+ CGPA

            return (
              <div key={index} className="relative group">
                {/* Gradient border effect for special highlights */}
                {isSpecial && (
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${highlight.color} rounded-full blur-sm opacity-75 group-hover:opacity-100 group-hover:blur-md transition-all duration-300`}
                  ></div>
                )}

                <div
                  className={`relative flex items-center gap-4 px-10 py-3 rounded-full whitespace-nowrap shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105
                    ${
                      isSpecial
                        ? "bg-white dark:bg-neutral-900 border-2 border-transparent"
                        : "bg-gray-50 dark:bg-darkHover/50 border border-gray-300 dark:border-neutral-600"
                    }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${highlight.color} flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <span
                    className={`text-lg font-semibold font-Ovo ${
                      isSpecial
                        ? "bg-gradient-to-r " +
                          highlight.color +
                          " bg-clip-text text-transparent"
                        : "text-gray-800 dark:text-white"
                    }`}
                  >
                    {highlight.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-darkTheme to-transparent pointer-events-none"></div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1920px);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}

export default Highlights;
