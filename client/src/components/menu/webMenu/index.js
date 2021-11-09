import Link from 'next/link';
import showMenu from '../../../utils/showMenu';

import styles from './WebMenu.module.css';

const WebMenu = () => {
  return (
    <menu id="menu">
      <div id="menu-icon" onClick={showMenu}>
        Menu
      </div>
      <nav id="nav">
        <Link href="/">Home</Link>
        <Link href="/user/auth/login">Login</Link>
        <Link href="/user/auth/registration">Register</Link>
      </nav>
    </menu>
  );
};
export default WebMenu;
