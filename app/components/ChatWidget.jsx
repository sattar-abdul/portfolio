"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { assets } from "@/assets/assets";

export default function ChatWidget({ isDarkMode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState([
    {
      sender: "bot",
      text: "Hi! I’m Abdul’s assistant. Ask me anything about him.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const msg = input.trim();
    if (!msg) return;

    setMessage((prev) => [...prev, { sender: "user", text: msg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setMessage((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (e) {
      setMessage((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  //logic for auto scroll in chat panel
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]); // triggers on every message update

  return (
    <>
      {/* Floating toggle button for chatbot*/}
      {!open && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-4 right-4 z-[60] rounded-full p-0.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg"
        >
          <motion.button className="rounded-full p-3 shadow-md bg-white hover:bg-gray-300 duration-100">
            {/* Chat icon */}
            <Image src={assets.chatbot} className="h-9 w-9" />
          </motion.button>
        </motion.div>
      )}
      {/* chat panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-4 right-4 z-[60] w-[22rem] rounded-xl border border-gray-300 bg-white shadow-xl dark:bg-darkTheme dark:border-white/90"
            role="dialog"
            aria-label="Abdul's chatbot"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-neutral-800">
              <div className="text-sm">
                <div className="font-semibold">Abdul&apos;s Assistant</div>
                <div className="text-xs text-gray-500 dark:text-white-400">
                  Ask about skills, projects, contact, etc.
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded p-1 hover:bg-gray-100 dark:hover:bg-darkHover"
              >
                {/* close icon */}
                <Image
                  src={isDarkMode ? assets.close_white : assets.close_black}
                  className="h-4 w-4"
                />
              </button>
            </div>

            {/* message */}
            <div className="h-72 overflow-y-auto px-4 py-3 space-y-2 text-sm">
              {message.map((m, idx) => (
                <div
                  key={idx}
                  className={
                    m.sender == "user"
                      ? "ml-auto max-w-[85%] rounded-lg bg-lightHover px-3 py-2 dark:bg-darkHover dark:text-white"
                      : "mr-auto max-w-[85%] rounded-lg bg-gray-100 text-gray-900 px-3 py-2 dark:bg-darkTheme dark:text-white"
                  }
                >
                  {m.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
              {loading && (
                <div className="mr-auto max-w-[85%] rounded-lg bg-gray-100 text-gray-700 px-3 py-2 text-xs dark:bg-darkTheme dark:text-white-400">
                  Typing…
                </div>
              )}
            </div>

            {/* input */}
            <div className="flex items-center gap-2 p-3 border-t border-gray-200 dark:border-neutral-800">
              <input
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:ring-1 focus:ring-gray-300 dark:bg-darkTheme dark:text-white"
                placeholder="Ask me anything about Abdul…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="rounded-md px-3 py-2 text-sm bg-black text-white hover:bg-gray-800 disabled:opacity-50 dark:bg-darkHover dark:text-white dark:hover:bg-darkHover/70"
                disabled={loading || !input.trim()}
              >
                send
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
