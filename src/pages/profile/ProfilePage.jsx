import React, { useEffect } from "react";
import { Skeleton, Tabs } from "antd";
import { Link } from "react-router-dom";
import ChangePasswordScreen from "./ChangePasswordScreen";
import WishListScreen from "./WishListScreen";
import OrderList from "../../components/Order/OrderList";
import { useDispatch, useSelector } from "react-redux";
import "./profile.css";
import { signout } from "../../actions/authActions";
import ErrorBox from "../../components/Partials/ErrorBox";
import {getUserOrders} from "../../actions/orderActions";

const { TabPane } = Tabs;

function ProfilePage(props) {
  const dispatch = useDispatch();
  const onTab = props.location.search
    ? props.location.search.split("=")[1]
    : "1";
  const { loading, error, orders } = useSelector(
    (state) => state.userOrderReducer
  );
  const { userInfo } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(getUserOrders())
  }, [dispatch]);

  const renderOrderList = () => {
    if (error) {
      return <ErrorBox message={error} />;
    }
  
    if (loading) {
      return (
        <div className="container">
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      );
    }

    return <OrderList orderList={orders}/>
  }

  return (
    <div id="profile-page">
      <div className="container section-padding profile-large">
        <Tabs defaultActiveKey={onTab} tabPosition={"left"}>
          <TabPane tab="My Account" key="1">
            <h2>My Account</h2>
            <h3>Hello {userInfo.username},</h3>
            <p>Email: {userInfo.email}</p>
            <p>Created At: 23 Mar 2021</p>
            <Link
              to="#logout"
              className="button primary"
              onClick={() => {
                dispatch(signout());
                props.history.push("/");
              }}
            >
              Logout
            </Link>
          </TabPane>
          <TabPane tab="Change Password" key="2">
            <h2>Change Password</h2>
            <ChangePasswordScreen />
          </TabPane>
          <TabPane tab="Order History" key="3">
            <h2>Order History</h2>
            {renderOrderList()}
          </TabPane>
          <TabPane tab="Wishlist" key="4">
            <h2>Wishlist</h2>
            <WishListScreen />
          </TabPane>
        </Tabs>
      </div>

      <div className="container section-padding profile-mobile">
        <Tabs defaultActiveKey={onTab} tabPosition={"top"}>
          <TabPane tab="My Account" key="1">
            <h2>My Account</h2>
            <h3>Hello {userInfo.username},</h3>
            <p>Email: {userInfo.email}</p>
            <p>Created At: 23 Mar 2021</p>
            <Link
              to="#logout"
              className="button primary"
              onClick={() => {
                dispatch(signout());
                props.history.push("/");
              }}
            >
              Logout
            </Link>
          </TabPane>
          <TabPane tab="Change Password" key="2">
            <h2>Change Password</h2>
            <ChangePasswordScreen />
          </TabPane>
          <TabPane tab="Order History" key="3">
            <h2>Order History</h2>
            {renderOrderList()}
          </TabPane>
          <TabPane tab="Wishlist" key="4">
            <h2>Wishlist</h2>
            <WishListScreen />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default ProfilePage;
