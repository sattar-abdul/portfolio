import { toolsData } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

const Tools = ({ isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className=" pb-10 mb-10 w-full gap-20"
    >
      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-gray-700 font-Ovo dark:text-white/80 text-2xl"
      >
        Tools & Tech I use
      </motion.h3>

      <motion.ul
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-4 sm:mt-5 flex flex-wrap justify-center items-center gap-3 sm:gap-5 w-full"
      >
        {toolsData.map((tool, index) => (
          <motion.li
            role="listitem"
            aria-label={`${tool.toolName} technology`}
            tabIndex={0}
            whileHover={{ scale: 1.1 }}
            className="flex items-center justify-center w-14 sm:w-13 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500"
            key={index}
          >
            <Image
              src={tool.toolIcon}
              alt={`${tool.toolName} icon`}
              className="w-5 sm:w-7"
              title={tool.toolName}
              loading="lazy"
            />
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default Tools;
