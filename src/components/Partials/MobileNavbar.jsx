import React from 'react';
import { Link } from "react-router-dom";
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';

function MobileNavbar({isActive = false, navList, setIsActive}) {

    const renderNavItems = () => {
        return navList.map((navItem) => {
          return (
            <li className="nav-item" key={navItem.name}>
              <Link to={navItem.path} className="nav-link">
                {navItem.name}
              </Link>
            </li>
          );
        });
      };

    return (
        <div className={`mobile-navbar ${isActive ? "active" : 
        ""}`}>
            <div className="nav-button-open" onClick={() => setIsActive(false)}>
              <MenuOpenOutlinedIcon style={{
                fontSize: "3rem"
              }} />
            </div>
            <ul className="nav-list">
              {renderNavItems()}
            </ul>
        </div>
    )
}

export default MobileNavbar
