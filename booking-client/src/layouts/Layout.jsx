import React from "react";
import { Container, Header, Image, Segment } from "semantic-ui-react";
import { logoMain } from "../assets";
import MenuBar from "./MenuBar";

const Layout = (props) => {
  const { children } = props;
  return (
    <div>
      <Segment inverted textAlign="center" style={{ minHeight: 340 }}>
        <MenuBar />
        <Image
          src={logoMain}
          size="medium"
          centered
          style={{ height: "150px" }}
        />
        <Header
          as="h2"
          color="blue"
          style={{ fontSize: "3em", fontWeight: "normal" }}
          content="Bệnh Viện Thông Minh"
        />
        <Header
          as="h3"
          style={{ fontSize: "1.5em", fontWeight: "normal" }}
          content="Đảm bảo hồ sơ an toàn và bảo mật"
        />
      </Segment>

      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
