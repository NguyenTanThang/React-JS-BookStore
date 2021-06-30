import React from 'react';
import { Link } from 'react-router-dom';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import { useSelector } from 'react-redux';

function Header() {
    const cartReducer = useSelector(state => state.cartReducer);
    const {cart} = cartReducer;

    return (
        <header>
            <div className="container">
                <div className="row">

                    <div className="left">
                        <ul className="row">
                            <li>
                                <Link to="#" className="link-with-icon row aic">
                                    <div className="icon">
                                        <HelpOutlineIcon/>
                                    </div>
                                    <div className="text">
                                        Can we help you?
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="link-with-icon row aic">
                                    <div className="icon">
                                        <PhoneAndroidIcon/>
                                    </div>
                                    <div className="text">
                                        +1 246-345-0695
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="right">
                        <ul className="row aic">
                            <li>
                                <Link to="#">
                                    <FavoriteBorderOutlinedIcon/>
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile">
                                    <PersonOutlineOutlinedIcon/>
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart"  className="cart-link row aic">
                                    <LocalMallOutlinedIcon/>
                                    {cart.length > 0 && <div className="badge">
                                        {cart.length}
                                    </div>}
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header
