import { type ReactNode } from "react";

import { Link } from "react-router";

import styles from "./Header.module.css";

function Header(): ReactNode {
  return (
    <header className={styles.header}>
      <Link to={"/"} className={styles.logo}>
        <img src={"/logo.svg"} alt={"Canban Logo"} />
      </Link>
    </header>
  );
}

export default Header;
