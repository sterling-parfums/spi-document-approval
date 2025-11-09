import SideNav from '@/app/ui/sidenav';
import styles from "@/app/globals.module.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <SideNav />
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
