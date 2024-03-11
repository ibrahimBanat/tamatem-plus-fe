
import '../styles/navbar.css';
import {Link} from "react-router-dom";
import {AuthContext, useAuth} from "../context/authContext";

const NavBar = () => {
    const {isLoggedIn} = useAuth(AuthContext);
    return (
        <>
            <nav className={'nav'}>
                <div className={'nav-box'}>
                    <Link className={'nav-logo'} to={'/'}>
                        <img src="/images/logo.png"
                             alt="tamatem-plus"
                             className={'nav-img'}
                        />
                    </Link>
                    <ul className={'nav-items'}>
                        {
                            !isLoggedIn && <li className={'nav-item font-bold'}>
                                <Link to={'/login'} className={'nav-item font-bold'}>
                                    Login
                                </Link>
                            </li>
                        }
                        <li>
                            <Link to={'/products'} className={'nav-item font-bold'}>
                                Products
                            </Link>
                        </li>
                    </ul>
                </div>

            </nav>
        </>
    );
}

export default NavBar;
