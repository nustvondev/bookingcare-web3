import React, { useEffect } from "react";
import { FooterLayout, HeaderLayout } from "../components";
import { Layout } from "antd";
const { Content } = Layout;
const Layouts = ({ children, title }) => {
  useEffect(() => {
    document.title = `ZKHEATLY - ${title || ""} `;
  }, [title]);
  return (
    <div>
      <Layout>
        <HeaderLayout />

        <Content
          style={{
            padding: "0 48px",
            marginBottom: "250px",
          }}
        >
          {children}
        </Content>
        <FooterLayout />
      </Layout>
    </div>
  );
};

export default Layouts;
