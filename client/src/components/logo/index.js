import Link from 'next/link';
import styles from './Logo.module.css';
const Logo = () => {
  return (
    <Link href="/" passHref>
      <button className={styles.logo}>
        WE
        <span className={styles.logoLast}>
          <span className={styles.one}>GOT</span>
          <span className={styles.two}>DEVS</span>
        </span>
      </button>
    </Link>
  );
};

export default Logo;
