import React from 'react';
import {Empty} from "antd";

function ErrorBox(props) {
    return (
        <Empty description={
            <span>
              {props.message}
            </span>
          }>
        </Empty>
    )
}

export default ErrorBox
