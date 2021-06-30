import React from 'react';
import { Link } from 'react-router-dom';

function CartItem({orderItem, index}) {

    return (
        <tr className="order-item">
            <td className="id">
                #{index}
            </td>
            <td className="date">
                {orderItem.createdAt.substring(0, 10)}
            </td>
            <td className="status">
                {orderItem.status}
            </td>
            <td className="total text-primary">
                ${orderItem.totalPrice}
            </td>
            <td className="paid">
                {orderItem.isPaid ? orderItem.paidAt.substring(0, 10) : "Not Yet"}
            </td>
            <td className="delivered">
                {orderItem.isDelivered ? orderItem.deliveredAt.substring(0, 10) : "Not Yet"}
            </td>
            <td className="status">
                <Link to={`/order-details/${orderItem._id}`} className="button dark">Details</Link>
            </td>
        </tr>
    )
}

export default CartItem
