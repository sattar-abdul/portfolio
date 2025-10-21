import { workData } from "@/assets/assets";
import React, { useRef } from "react";
import { motion } from "motion/react";

function Work() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.7;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="work"
      className="w-full px-5 sm:px-10 lg:px-[12%] py-5 scroll-mt-20"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        My portfolio
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        My Latest Projects
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-left md:text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo"
      >
        I have worked on various projects. Here is the list of my latest projects
        or projects that I have contributed to along with tech stack used.
      </motion.p>

      <div className="relative">

        <motion.div
          ref={scrollRef}
          className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory hide-scroll-bar gap-6 py-2"
        >
          {workData.map((project, index) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              key={index}
              className="snap-start flex-shrink-0 w-[86vw] sm:w-[40vw] md:w-[28rem]"
            >
              {/* Card */}
              <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-darkHover dark:border-neutral-700 dark:shadow-neutral-700/70 w-full">
                {/* Full image */}
                <img
                  className="w-full rounded-t-xl h-60"
                  src={project.bgImage}
                  alt={project.title}
                />
                <div className="p-4 md:p-5 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-gray-500 dark:text-neutral-400 flex-1">
                    {project.description}
                  </p>
                  <div className="mt-3 flex gap-2">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-white bg-black text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Live
                      </a>
                    )}
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Work;
