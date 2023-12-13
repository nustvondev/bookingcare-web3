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
  dob: "",
  gender: "",
  imgPro: "",

  addressHome: "",
  bloodgroup: "",
  medication: "",

  doctoraddr: "",
  doctorname: "",
  date: "",
  time: "",
  diagnosis: "",
  prescription: "",
  description: "",
  status: "",
};
const DetailPatient = () => {
  const { _addr } = useParams();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(initUser);
  useEffect(() => {
    async function fetchUser() {
      try {
        const address = _addr;
        const accounts = await web3.eth.getAccounts();
        const records = await record.methods
          .searchPatientDemographic(address)
          .call({ from: accounts[0] });
        const records2 = await record.methods
          .searchPatientMedical(address)
          .call({ from: accounts[0] });
        const appointment = await record.methods
          .searchAppointment(address)
          .call({ from: accounts[0] });
        if (appointment[0].includes("0x00000000000")) appointment[0] = "";

        setCurrent({
          ic: records[0],
          name: records[1],
          phone: records[2],
          dob: records[3],
          gender: records[4],
          imgPro: records[5],

          addressHome: records2[0],
          bloodgroup: records2[1],
          medication: records2[2],

          doctoraddr: appointment[0],
          doctorname: appointment[1],
          date: appointment[2],
          time: appointment[3],
          diagnosis: appointment[4],
          prescription: appointment[5],
          description: appointment[6],
          status: appointment[7],
        });
      } catch (error) {
        alert("Bạn không có quyền xem tài khoản này");
        navigate(PATH_ROUTE.home);
      }
    }

    fetchUser();
  });
  return (
    <Layouts title={"Thông tin bệnh nhân"}>
      <Card>
        <div style={{ textAlign: "center" }}>
          <Col>
            <Image
              src={current.imgPro || ""}
              alt="Anh ca nhan bac si"
              height={"150px"}
            />
          </Col>
          <Col style={{ marginTop: "50px" }}>
            <Title level={3}>Thông tin bệnh nhân, {current.name || ""}</Title>
          </Col>
          <Col style={{ marginTop: "30px" }}>
            <Row justify={"space-around"}>
              <Col>
                <Title level={4}>Mã định danh: {current.ic}</Title>
              </Col>
              <Col>
                <Title level={4}>Số điện thoại: {current.phone}</Title>
              </Col>
            </Row>
            <Row justify={"space-around"}>
              <Col>
                <Title level={4}>
                  Giới tính: {current.gender === "M" ? "Nam" : "Nữ"}
                </Title>
              </Col>
              <Col>
                <Title level={4}>Ngày sinh: {current.dob}</Title>
              </Col>
              <Col>
                <Title level={4}>Địa chỉ: {current.addressHome}</Title>
              </Col>
            </Row>
            <Row justify={"space-around"}>
              <Col>
                <Title level={4}>Nhóm máu: {current.bloodgroup}</Title>
              </Col>
              <Col>
                <Title level={4}>Tiền sử bệnh: {current.medication}</Title>
              </Col>
            </Row>
            <Typography.Title level={3}>
              Tình trạng bệnh hiện tại
            </Typography.Title>
            <Row justify={"space-around"}>
              <Col>
                <Title level={4}>Địa chỉ booking: {current.doctoraddr}</Title>
              </Col>
              <Col>
                <Title level={4}>Tên bác sĩ: {current.doctorname}</Title>
              </Col>
              <Col>
                <Title level={4}>Ngày: {current.date}</Title>
              </Col>
              <Col>
                <Title level={4}>Giờ: {current.time}</Title>
              </Col>
            </Row>
            <Row justify={"space-around"}>
              <Col>
                <Title level={4}>Đơn thuốc: {current.prescription}</Title>
              </Col>
              <Col>
                <Title level={4}>Chuẩn đoán: {current.diagnosis}</Title>
              </Col>
              <Col>
                <Title level={4}>Ghi chú: {current.description}</Title>
              </Col>
              <Col>
                <Title level={4}>
                  Trạng thái:{" "}
                  {current.status === "P" ? "Đang chờ khám" : "Đã khám xong"}
                </Title>
              </Col>
            </Row>
          </Col>
        </div>
      </Card>
    </Layouts>
  );
};

export default DetailPatient;
