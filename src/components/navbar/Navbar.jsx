import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { navItems } from "./navItemsJson";

const Navbar = ({ children }) => {
  const [menuItems,setMenuItems] = useState(navItems);

  useEffect(() => {
    // remove co-ordinators if NOT admin
    if(localStorage.getItem("mLevel") === "2") {
      var fMenuItems = [...menuItems];
      fMenuItems = fMenuItems.filter((item) => item.id !== 5);
      setMenuItems(fMenuItems);
    }
  },[]);

  return (
    <>
      <main>{children}</main>
      <nav className={styles.navbar}>
        <ul className={styles.navbarNav}>
          <li className={styles.logo}>
            <a href="#" className={styles.navLink}>
              <span className={`${styles.linkText} ${styles.logoText}`}>
                Dashboard
              </span>
              <img src="/navbar/right-arrow.png"></img>
            </a>
          </li>
          {menuItems.map((item) => (
              <li key={item.id} className={styles.navItem}>
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
