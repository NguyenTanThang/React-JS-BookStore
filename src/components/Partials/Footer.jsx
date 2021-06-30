import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";

function Footer() {

  return (
    <footer>
      <p>
        Made with <FavoriteIcon style={{
            transform: "translateY(5px)",
            fill: "#f75454"
        }} /> by Nguyen Tan Thang
      </p>
    </footer>
  );
}

export default Footer;
