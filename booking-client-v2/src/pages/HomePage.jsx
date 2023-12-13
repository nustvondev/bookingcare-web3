import { Card, Col, Image, Row, Typography } from "antd";
import React from "react";
import { logoMain } from "../assets";
import Layouts from "../layout/Layouts";
const { Title } = Typography;
const HomePage = () => {
  return (
    <div>
      <Layouts title={"Trang chủ"}>
        <div style={{ textAlign: "center", width: "calc(100% - 20px)" }}>
          <Image src={logoMain} alt="logo" height={"250px"} preview={false} />
          <Title>Hệ Thống Bệnh Viện Thông Minh</Title>

          <div>
            <Row gutter={16}>
              <Col span={6}>
                <Card
                  title="Bảo Mật và Minh Bạch"
                  bordered={false}
                  style={{
                    height: 200,
                  }}
                >
                  Kết hợp giữa blockchain và smart contract đảm bảo tính bảo mật
                  và minh bạch trong việc lưu trữ và chia sẻ dữ liệu y tế
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title="Lưu Trữ Bệnh Án trên Blockchain"
                  bordered={false}
                  style={{
                    height: 200,
                  }}
                >
                  Mỗi bệnh án được lưu trữ dưới dạng các khối dữ liệu trên chuỗi
                  khối, chứa thông tin chi tiết về lịch sử bệnh án và kết quả
                  xét nghiệm
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title="Quản Lý Quyền Truy Cập"
                  bordered={false}
                  style={{
                    height: 200,
                  }}
                >
                  Smart contract quản lý quyền truy cập và xác thực tính xác
                  thực của dữ liệu y tế
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title="Dữ Liệu Phi Tập Trung"
                  bordered={false}
                  style={{
                    height: 200,
                  }}
                >
                  Blockchain giúp lưu trữ dữ liệu an toàn và quản lý linh hoạt,
                  chia sẻ giữa bác sĩ, bệnh viện và bệnh nhân
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Layouts>
    </div>
  );
};

export default HomePage;
