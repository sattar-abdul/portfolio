import { workData } from "@/assets/assets";
import React from "react";
import { motion } from "motion/react";

function Work() {
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
        I have worked on various project. Here is the list of my Latest projects
        or projects that I have contributed to along with tech stack used.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="grid grid-cols-auto350 my-10 gap-6 dark:text-black"
      >
        {workData.map((project, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            key={index}
            className="group h-72 bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer border-2 border-gray-500"
            style={{ backgroundImage: `url(${project.bgImage})` }}
          >
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none rounded-lg"></div>

            {/* project title and description */}
            <div className="bg-black/40 backdrop-blur-md shadow-sm w-11/12 rounded-md absolute top-5 left-1/2 -translate-x-1/2 py-2 px-4 flex items-center justify-between duration-500 group-hover:top-7 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-hover:top-7 pointer-events-none group-hover:pointer-events-auto">
              <div>
                <h2 className="font-semibold text-white/80">{project.title}</h2>
                <p className="text-sm text-white/70">{project.description}</p>
              </div>
            </div>
            {/* Live and code buttons for projects */}
            {(project.liveLink || project.codeLink) && (
              <div className="bg-black/40 backdrop-blur-md shadow-sm rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-0 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bottom-2 pointer-events-none group-hover:pointer-events-auto">
                <div className="flex gap-3">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white text-sm px-4 py-1 rounded hover:bg-gray-800 transition"
                    >
                      Live
                    </a>
                  )}
                  {project.codeLink && (
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-white text-white text-sm px-4 py-1 rounded hover:bg-white hover:text-black transition"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Work;
