import React from "react";
import bluecurve from "/background/blue_curve.svg";
import styles from "./bg.module.css";

function Background() {
  return (
    <>
      <div className={styles.bgBrandBlue}></div>
      <img src={bluecurve} alt="Blue Curve" />
    </>
  );
}

export default Background;
