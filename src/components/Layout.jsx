import NavBar from './NavBar';
import {Outlet} from "react-router-dom";
import '../styles/layout.css';
const Layout = () => {
    return (
      <>
        <NavBar></NavBar>
        <main className={'main'}>
            <Outlet />
        </main>
      </>
    );
}

export default Layout;
