import Link from 'next/link';
import showMenu from '../../../utils/showMenu';

import styles from './AdminMenu.module.css';

const AdminMenu = () => {
  return (
    <menu id="menu">
      <div id="menu-icon" onClick={showMenu}>
        Menu
      </div>
      <nav id="nav">
        <Link href="/">Home</Link>
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/user/auth/logout">Logout</Link>
      </nav>
    </menu>
  );
};
export default AdminMenu;
