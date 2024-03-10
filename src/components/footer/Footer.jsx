import React, { useEffect, useState } from "react";
import unfpa_hdma from "/footer/unfpa_hdma.jpg";

function Footer() {
  const [isPageOverflowing, setIsPageOverflowing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the page is scrolled to the very bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setIsPageOverflowing(false);
      } else {
        setIsPageOverflowing(true);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: isPageOverflowing ? "relative" : "fixed",
        bottom: "10px",
        right: "10px",
      }}
    >
      <img
        style={{
          width: "50rem",
        }}
        src={unfpa_hdma}
        alt="UNFPA_HDMA"
      />
    </div>
  );
}

export default Footer;
