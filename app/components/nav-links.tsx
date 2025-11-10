import {
  UserGroupIcon,
  HomeIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import styles from '@/app/components/nav-links.module.css';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Requests', href: '/dashboard/requests', icon: PaperAirplaneIcon },
  { name: 'Approvals', href: '/dashboard/approvals', icon: UserGroupIcon },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a key={link.name} href={link.href} className={styles.navLink}>
            <LinkIcon className={styles.linkIcon} />
            <span className={styles.linkText}>{link.name}</span>
          </a>
        );
      })}
    </>
  );
}
