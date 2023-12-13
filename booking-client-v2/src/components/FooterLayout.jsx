import { Layout } from "antd";
import React from "react";
const { Footer } = Layout;

const FooterLayout = () => {
  return (
    <div>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#001529",
          color: "#fff",
        }}
      >
        &copy; {new Date().getFullYear()} Hoa Huu Nguyen. All Rights Reserved.
      </Footer>
    </div>
  );
};

export default FooterLayout;
