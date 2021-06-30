import {notification} from "antd";

const createNotification = (message, variant = "success", placement = "bottomRight") => {
    notification[variant]({
        message: `${variant.toUpperCase()}`,
        description: message,
        placement,
    });
}

export default createNotification;