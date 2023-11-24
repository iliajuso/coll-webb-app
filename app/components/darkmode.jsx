"use client"
import React, { useEffect } from "react";

const DarkModeToggle = () => {
  const toggleDarkMode = () => {
    const body = document.body;
    const wasDarkmode = localStorage.getItem("darkmode") === "true";
    localStorage.setItem("darkmode", !wasDarkmode);
    body.classList.toggle("dark-mode", !wasDarkmode);

    // Add dark mode class to the specific block
    const whiteBlock = document.querySelector(".bg-white");
    if (whiteBlock) {
      whiteBlock.classList.toggle("dark-mode", !wasDarkmode);
    }
  };

  useEffect(() => {
    const button = document.querySelector(".btn");

    if (button) {
      button.addEventListener("click", toggleDarkMode);

      return () => {
        button.removeEventListener("click", toggleDarkMode);
      };
    }

    // Button not found, log an error or handle it as appropriate for your app
    console.error('Button with class "btn" not found.');

    // Return an empty cleanup function to avoid errors
    return () => {};
  }, []);

  useEffect(() => {
    document.body.classList.toggle(
      "dark-mode",
      localStorage.getItem("darkmode") === "true"
    );

    // Add dark mode class to the specific block
    const whiteBlock = document.querySelector(".bg-white");
    if (whiteBlock) {
      whiteBlock.classList.toggle(
        "dark-mode",
        localStorage.getItem("darkmode") === "true"
      );
    }
  }, []);

  return null; // React components must return something
};

export default DarkModeToggle;
