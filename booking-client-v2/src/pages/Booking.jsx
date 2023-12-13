import React, { useState } from "react";
import Layouts from "../layout/Layouts";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  TimePicker,
  Typography,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { dateFormatList, statusOptions } from "../constants/global";
import { record, web3 } from "../constants";
const initBooking = {
  patientaddr: "",
  date: "",
  time: "",
  prescription: "",
  description: "",
  diagnosis: "",
  status: "",
  errorMessage: "",
  loading: false,
};
const Booking = () => {
  const [booking, setBooking] = useState(initBooking);
  const handleOnSubmit = async () => {
    const {
      patientaddr,
      date,
      time,
      diagnosis,
      prescription,
      description,
      status,
    } = booking;
    setBooking({ ...booking, loading: true });
    try {
      const accounts = await web3.eth.getAccounts();
      await record.methods
        .setAppointment(
          patientaddr,
          date,
          time,
          diagnosis,
          prescription,
          description,
          status
        )
        .send({ from: accounts[0] });
      alert("Đặt lịch hẹn được tạo thành công!");
    } catch (error) {
      setBooking({ ...booking, errorMessage: error.message });
      alert("Đã xảy ra lỗi");
    }
    setBooking({ ...initBooking });
  };
  return (
    <Layouts title={"Tạo lịch hẹn"}>
      <Card
        style={{ marginTop: "10px" }}
        title={<Typography.Title level={3}>Tạo lịch hẹn</Typography.Title>}
      >
        <Form disabled={booking.loading}>
          <Form.Item label="Địa chỉ ETH bệnh nhân">
            <Input
              placeholder="0xF6973b46412ff52c1BfDB783D29e5218620Be542"
              value={booking.patientaddr}
              onChange={(e) => {
                setBooking({ ...booking, patientaddr: e.target.value });
              }}
            />
          </Form.Item>
          <Row justify={"space-around"}>
            <Col>
              <Form.Item label="Ngày hẹn">
                <DatePicker
                  value={
                    booking.date ? dayjs(booking.date, dateFormatList[2]) : ""
                  }
                  format={dateFormatList[2]}
                  locale={locale}
                  onChange={(date, dateToString) => {
                    setBooking({ ...booking, date: dateToString });
                  }}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Giờ">
                <TimePicker
                  value={
                    booking.time ? dayjs(booking.time, dateFormatList[4]) : ""
                  }
                  format={dateFormatList[4]}
                  locale={locale}
                  onChange={(time, timeToString) => {
                    setBooking({ ...booking, time: timeToString });
                  }}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Trạng thái">
                <Select
                  value={booking.status}
                  options={statusOptions}
                  onChange={(e) => {
                    setBooking({ ...booking, status: e });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Typography.Title level={4}>Thông tin y tế</Typography.Title>
          <Divider />
          <Form.Item label="Đơn thuốc">
            <Input.TextArea
              placeholder="Paracetamon 500mg"
              value={booking.prescription}
              onChange={(e) => {
                setBooking({ ...booking, prescription: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="Chuẩn đoán">
            <Input.TextArea
              placeholder="Nhức đầu"
              value={booking.diagnosis}
              onChange={(e) => {
                setBooking({ ...booking, diagnosis: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="Ghi chú">
            <Input.TextArea
              placeholder="Ghi chú dành cho bệnh nhân"
              value={booking.description}
              onChange={(e) => {
                setBooking({ ...booking, description: e.target.value });
              }}
            />
          </Form.Item>
          <Button
            type="primary"
            loading={booking.loading}
            disabled={booking.loading}
            onClick={handleOnSubmit}
          >
            Tạo
          </Button>
        </Form>
      </Card>
    </Layouts>
  );
};

export default Booking;
