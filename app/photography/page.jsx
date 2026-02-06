"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "motion/react";

export default function Photography() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // cloudinary image fetch
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const getImageUrl = (photo) => {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_fill,w_800,q_auto/${photo.fullPublicId}.${photo.format}`;
  };

  const getBlurUrl = (url) =>
    url.replace("/upload/", "/upload/e_blur:300,q_auto:low/");

  const showNext = () => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % photos.length;
      setActiveImage(photos[next]);
      return next;
    });
  };

  const showPrev = () => {
    setActiveIndex((prev) => {
      const next = (prev - 1 + photos.length) % photos.length;
      setActiveImage(photos[next]);
      return next;
    });
  };

  // theme logic (same as home)
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "";
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!activeImage) setImageLoaded(false);
  }, [activeImage]);

  // fetch images
  useEffect(() => {
    fetch("/api/photography")
      .then((res) => res.json())
      .then(setPhotos);
  }, []);

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-32 px-[12%] mb-24"
      >
        <h4 className="text-center mb-2 text-lg font-Ovo">Visual Stories</h4>
        <h2 className="text-center text-5xl font-Ovo mb-12">Photography</h2>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <div
              key={photo.asset_id}
              className="rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => {
                setActiveImage(photo);
                setActiveIndex(index);
                setImageLoaded(false);
              }}
            >
              <Image
                src={photo.secure_url}
                alt="photography"
                width={photo.width}
                height={photo.height}
                className="w-full h-auto rounded-2xl"
                loading="lazy"
                unoptimized
              />
            </div>
          ))}
        </div>
      </motion.section>

      {/* show image in full screen*/}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => {
            setActiveImage(null);
            setActiveIndex(null);
          }}
        >
          {/* close */}
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => {
              setActiveImage(null);
              setActiveIndex(null);
            }}
          >
            ✕
          </button>

          {/* prev */}
          <button
            className="
    absolute left-6
    z-[110]
    opacity-100
    text-white text-5xl
    pb-3 px-3 
    border border-white/30
    rounded-full
    bg-black/20
    hover:bg-black/40
    focus:outline-none
    focus:ring-4 focus:ring-white/30
    transition-colors
  "
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
              setImageLoaded(false);
            }}
          >
            ‹
          </button>

          {/* image */}
          <img
            src={activeImage.secure_url}
            alt="fullscreen"
            onLoad={() => setImageLoaded(true)}
            className={`
    max-h-[90vh] max-w-[90vw] object-contain rounded-lg
    transition-all duration-700 ease-out
    ${imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}
  `}
            style={{
              backgroundImage: `url(${activeImage.secure_url.replace(
                "/upload/",
                "/upload/e_blur:300,q_auto:low/"
              )})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* next */}
          <button
            className="absolute right-6
    z-[110]
    opacity-100
    text-white text-5xl
    pb-3 px-3 
    border border-white/30
    rounded-full
    bg-black/20
    hover:bg-black/40
    focus:outline-none
    focus:ring-4 focus:ring-white/30
    transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
              setImageLoaded(false);
            }}
          >
            ›
          </button>
        </div>
      )}

      <Footer isDarkMode={isDarkMode} />
    </>
  );
}
