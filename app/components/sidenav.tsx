import NavLinks from '@/app/components/nav-links';
import styles from '@/app/components/sidenav.module.css';

export default function SideNav() {
  return (
    <div className={styles.sideNav}>
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
