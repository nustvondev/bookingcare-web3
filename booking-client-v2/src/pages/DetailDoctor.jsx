import { Card, Col, Image, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { record, web3 } from "../constants";
import { PATH_ROUTE } from "../constants/defineRoute";
import Layouts from "../layout/Layouts";
const { Title } = Typography;
const initUser = {
  ic: "",
  name: "",
  phone: "",
  gender: "",
  dob: "",
  qualification: "",
  major: "",
  imgPro: "",
};

const DetailDoctor = () => {
  const { _addr } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(initUser);
  useEffect(() => {
    async function fetchUser() {
      try {
        const address = _addr;
        const accounts = await web3.eth.getAccounts();
        const doctor = await record.methods
          .searchDoctor(address)
          .call({ from: accounts[0] });
        setUser({
          ...user,
          ic: doctor[0],
          name: doctor[1],
          phone: doctor[2],
          gender: doctor[3],
          dob: doctor[4],
          qualification: doctor[5],
          major: doctor[6],
          imgPro: doctor[7],
        });
      } catch (error) {
        alert("Bạn không có quyền xem tài khoản này");
        navigate(PATH_ROUTE.home);
      }
    }

    fetchUser();
  });
  return (
    <Layouts title={"Thông tin bác sĩ"}>
      <Card>
        <div style={{ textAlign: "center" }}>
          <Col>
            <Image
              src={user.imgPro || ""}
              alt="Anh ca nhan bac si"
              height={"150px"}
            />
          </Col>
          <Col style={{ marginTop: "50px" }}>
            <Title level={3}>Thông tin bác sĩ, {user.name || ""}</Title>
          </Col>
          <Col style={{ marginTop: "30px" }}>
            <Row justify={"space-around"}>
              <Col>
                <Title level={4}>Mã định danh: {user.ic}</Title>
              </Col>
              <Col>
                <Title level={4}>Số điện thoại: {user.phone}</Title>
              </Col>
            </Row>
            <Row justify={"space-around"}>
              <Col>
                <Title level={4}>
                  Giới tính: {user.gender === "M" ? "Nam" : "Nữ"}
                </Title>
              </Col>
              <Col>
                <Title level={4}>Ngày sinh: {user.dob}</Title>
              </Col>
            </Row>
            <Row justify={"space-around"}>
              <Col>
                <Title level={4}>
                  Trình độ:{" "}
                  {user.qualification === "CN"
                    ? "Cử nhân"
                    : user.qualification === "TS"
                    ? "Tiến sĩ"
                    : "Bác sĩ"}
                </Title>
              </Col>
              <Col>
                <Title level={4}>Chuyên ngành: {user.major}</Title>
              </Col>
            </Row>
          </Col>
        </div>
      </Card>
    </Layouts>
  );
};

export default DetailDoctor;
