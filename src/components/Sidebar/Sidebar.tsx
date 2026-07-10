import { type ReactNode, useState } from "react";

import { Link } from "react-router";

import clsx from "clsx";

import IconButton from "../../components/IconButton/IconButton.tsx";
import SidebarGroups from "../../components/Sidebar/components/SidebarGroups/SidebarGroups.tsx";
import SidebarItem from "../../components/Sidebar/components/SidebarItem/SidebarItem.tsx";
import MingcuteArrowsRightLine from "../../icons/MingcuteArrowsRightLine.tsx";
import MingcuteExitLine from "../../icons/MingcuteExitLine.tsx";
import MingcuteMenuLine from "../../icons/MingcuteMenuLine.tsx";
import { SidebarContext } from "./context/sidebar-context.ts";

import styles from "./Sidebar.module.css";

export default function Sidebar(): ReactNode {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleArrowClick = (): void => {
    setIsCollapsed((old) => !old);
  };

  const openDrawer = (): void => {
    // The drawer always shows the fully expanded sidebar.
    setIsCollapsed(false);
    setIsDrawerOpen(true);
  };

  const closeDrawer = (): void => {
    setIsDrawerOpen(false);
  };

  return (
    <SidebarContext value={{ isCollapsed }}>
      <IconButton
        className={styles.hamburger}
        onClick={openDrawer}
        aria-label="Open navigation menu"
      >
        <MingcuteMenuLine />
      </IconButton>
      <div
        className={clsx(styles.backdrop, isDrawerOpen && styles.open)}
        onClick={closeDrawer}
      />
      <aside
        className={clsx(
          styles.sidebar,
          isCollapsed && styles.collapsed,
          isDrawerOpen && styles.open,
        )}
      >
        <div className={styles.header}>
          <Link className={styles.logo} to="/" onClick={closeDrawer}>
            <img
              src={isCollapsed ? "/favicon.svg" : "/logo.svg"}
              alt="Canban Logo"
            />
          </Link>
          <IconButton className={styles.arrow} onClick={handleArrowClick}>
            <MingcuteArrowsRightLine />
          </IconButton>
        </div>
        <nav onClick={closeDrawer}>
          <SidebarGroups />
        </nav>
        <div className={styles.footer}>
          <SidebarItem
            title="Sign Out"
            color="gray"
            icon={<MingcuteExitLine />}
          />
        </div>
      </aside>
    </SidebarContext>
  );
}
