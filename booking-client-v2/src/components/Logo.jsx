import React from "react";
import { Link } from "react-router-dom";
import { PATH_ROUTE } from "../constants/defineRoute";
import { banner } from "../assets";
import { Image } from "antd";
const Logo = () => {
  return (
    <Link to={PATH_ROUTE.home}>
      <Image src={banner} preview={false} height={"50px"} />
    </Link>
  );
};

export default React.memo(Logo);
