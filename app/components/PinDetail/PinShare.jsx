import React from "react";
import { FaShare } from "react-icons/fa";

const ShareButton = ({ title, description, url }) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } else {
        console.error("Web Share API is not supported by this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return <FaShare className="cursor-pointer" onClick={handleShare} />;
};

export default ShareButton;
