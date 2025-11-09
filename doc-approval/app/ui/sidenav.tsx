import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';
import styles from '@/app/ui/sidenav.module.css';

export default function SideNav() {
  return (
    <div className={styles.sideNav}>
      <Link className={styles.logo} href="/">
        {"Document Approval"}
      </Link>

      <div className={styles.linksContainer}>
        <NavLinks />
        <div className={styles.spacer}></div>
        <form>
          <button className={styles.signoutBtn}>
            <span className={styles.signoutText}>Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
