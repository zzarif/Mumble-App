import React from "react";
import unfpa_hdma from "/footer/unfpa_hdma.jpg";

function Footer({ position }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: position,
        marginTop: "3rem",
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
