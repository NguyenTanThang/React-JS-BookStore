import React, {useState} from "react";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import MobileNavbar from "./MobileNavbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const navList = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/browse",
    name: "Browse",
  },
  {
    path: "/cart",
    name: "Cart",
  },
  {
    path: "/signup",
    name: "Sign Up",
  },
  {
    path: "/signin",
    name: "Sign In",
  },
];

const navListAuth = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/browse",
    name: "Browse",
  },
  {
    path: "/profile?onTab=4",
    name: "Wishlist",
  },
  {
    path: "/profile",
    name: "Profile",
  },
  {
    path: "/cart",
    name: "Cart",
  }
];

function Navbar() {
  const authReducer = useSelector(state => state.authReducer);
  const {userInfo} = authReducer;

  const [isActive, setIsActive] = useState(false);
  const [currentNavList, setCurrentNavList] = useState(navList);

  const renderNavItems = () => {
    return currentNavList.map((navItem) => {
      return (
        <li className="nav-item" key={navItem.name}>
          <Link to={navItem.path} className="nav-link">
            {navItem.name}
          </Link>
        </li>
      );
    });
  };

  useEffect(() => {
    if (userInfo) {
      setCurrentNavList(navListAuth)
    } else {
      setCurrentNavList(navList)
    }
  }, [userInfo])

  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="left">
            <Link to="/" className="navbar-brand">
              <h1>
                <span className="text-primary">BOOK</span>STORE
              </h1>
            </Link>
          </div>

          <div className="right">
            <ul className="row nav-list">{renderNavItems()}</ul>
            <div className="nav-button-open" onClick={() => setIsActive(true)}>
              <MenuOutlinedIcon style={{
                fontSize: "2.5rem"
              }} />
            </div>
          </div>
        </div>
      </div>

      <MobileNavbar navList={currentNavList} isActive={isActive} setIsActive={setIsActive}/>
    </nav>
  );
}

export default Navbar;
