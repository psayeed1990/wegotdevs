import Link from 'next/link';
import showMenu from '../../../utils/showMenu';

import styles from './UserMenu.module.css';

const UserMenu = () => {
  return (
    <menu id="menu">
      <div id="menu-icon" onClick={showMenu}>
        Menu
      </div>
      <nav id="nav">
        <Link href="/">Home</Link>
        <Link href="/user/dashboard">Dashboard</Link>
        <Link href="/user/auth/logout">Logout</Link>
      </nav>
    </menu>
  );
};
export default UserMenu;
