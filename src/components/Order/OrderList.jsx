import React from "react";
import ErrorBox from "../Partials/ErrorBox";
import OrderItem from "./OrderItem";

function OrderList({ orderList }) {
  const renderOrderItems = () => {
    return orderList.map((orderItem, index) => {
      return <OrderItem key={orderItem._id} orderItem={orderItem} index={index + 1}/>;
    });
  };

  if (orderList.length === 0) {
    return (
      /*
      <div style={{ textAlign: "center" }}>
        <ErrorBox message="Currently, there is no order under your name" />
      </div>
      */
     <></>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderOrderItems()}</tbody>
      </table>
    </div>
  );
}

export default OrderList;
