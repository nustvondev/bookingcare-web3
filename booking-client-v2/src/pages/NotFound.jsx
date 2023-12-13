import React from "react";
import Layouts from "../layout/Layouts";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { PATH_ROUTE } from "../constants/defineRoute";

const NotFound = () => {
  return (
    <Layouts title={"404"}>
      <div style={{ textAlign: "center" }}>
        <Typography.Title level={1}>Trang này không tồn tại!</Typography.Title>
        <Button type="primary">
          <Link to={PATH_ROUTE.home}>Quay về trang chủ</Link>{" "}
        </Button>
      </div>
    </Layouts>
  );
};

export default NotFound;
