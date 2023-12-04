import React from "react";
import navItems from "./navItems.json";
import styles from "./navbar.module.css";

const Navbar = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <nav className={styles.navbar}>
        <ul className={styles.navbarNav}>
          <li className={styles.logo}>
            <a href="#" className={styles.navLink}>
              <span className={`${styles.linkText} ${styles.logoText}`}>
                Mumble
              </span>
              <img src="/navbar/right-arrow.png"></img>
            </a>
          </li>
          {navItems.map((item, idx) => (
            <li key={idx} className={styles.navItem}>
              <a href={item.path} className={styles.navLink}>
                <img src={item.imageLink}></img>
                <span className={styles.linkText}>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
