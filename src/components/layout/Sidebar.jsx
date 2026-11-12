"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BriefcaseBusiness,
  Files,
  FolderTree,
  Mail,
  MailCog,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import styles from "./Sidebar.module.css";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: BarChart3, enabled: true },
  { label: "Projects", href: "/projects", icon: BriefcaseBusiness, enabled: true },
  { label: "Divisions", href: "/divisions", icon: FolderTree, enabled: true, adminOnly: true },
  { label: "Media Center", href: "/media-center", icon: Files, enabled: false },
  { label: "Contact Messages", href: "/contacts", icon: Mail, enabled: false, adminOnly: true },
  { label: "Email Routing", href: "/email-routing", icon: MailCog, enabled: false, adminOnly: true },
  { label: "Administrators", href: "/administrators", icon: Users, enabled: false, superAdminOnly: true },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const isAdministrator = ["admin", "super_admin"].includes(user?.role);
  const isSuperAdmin = user?.role === "super_admin";

  const visibleItems = menuItems.filter((item) => {
    if (item.superAdminOnly && !isSuperAdmin) return false;
    if (item.adminOnly && !isAdministrator) return false;
    return true;
  });

  return (
    <>
      <button className={`${styles.backdrop} ${mobileOpen ? styles.backdropOpen : ""}`} type="button" aria-label="Close navigation" onClick={onClose} />
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.ambient} aria-hidden="true"><span /><span /></div>
        <div className={styles.brandRow}>
          <Link className={styles.brand} href="/dashboard" onClick={onClose} aria-label="Lambert Admin dashboard">
            <Image className={styles.logoColor} src="/images/brand/lambert-logo.png" alt="Lambert Electromec" width={164} height={52} priority />
          </Link>
          <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close navigation"><X size={18} /></button>
        </div>

        <div className={styles.adminMark}><span className={styles.adminIcon}><ShieldCheck size={13} /></span><span>Administration</span></div>
        <div className={styles.navLabel}>Workspace</div>
        <nav className={styles.nav} aria-label="Admin navigation">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            if (!item.enabled) {
              return (
                <div className={styles.disabledItem} key={item.label} aria-disabled="true">
                  <span className={styles.icon}><Icon size={16} /></span>
                  <span className={styles.itemLabel}>{item.label}</span>
                  <span className={styles.soon}>Next</span>
                </div>
              );
            }
            return (
              <Link key={item.label} href={item.href} className={`${styles.navItem} ${active ? styles.navItemActive : ""}`} onClick={onClose}>
                <span className={styles.icon}><Icon size={16} /></span>
                <span className={styles.itemLabel}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.footerNote}>
          <span className={styles.footerIcon}><ShieldCheck size={15} /></span>
          <div><span>Secure CMS</span><small>Protected Lambert workspace</small></div>
          <span className={styles.statusDot} aria-label="Secure workspace active" />
        </div>
      </aside>
    </>
  );
}
