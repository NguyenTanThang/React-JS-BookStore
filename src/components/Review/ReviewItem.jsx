import { Rate } from 'antd';
import React from 'react'

function ReviewItem({reviewItem}) {

    const {title, body, star, createdAt, user} = reviewItem;

    return (
        <div className="review-item">
            <div className="review-item__header">
                <h2>{title}</h2>
                <p>{Math.round(star)}/5 stars <span style={{marginLeft: "10px"}}></span> <Rate disabled defaultValue={Math.round(star)} /></p>
            </div>
            <div className="review-item__body">
                <p>{body}</p>
            </div>
            <div className="review-item__footer">
                <p>{user.username}, {createdAt.substring(0, 10)}</p>
            </div>
        </div>
    )
}

export default ReviewItem
