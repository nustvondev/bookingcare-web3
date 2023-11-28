import React, { useState } from "react";
import Layout from "../layouts/Layout";
import {
  Divider,
  Form,
  Input,
  Button,
  Segment,
  Message,
  Select,
} from "semantic-ui-react";
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
const statusOptions = [
  { key: "p", text: "Đang chờ", value: "Đang chờ" },
  { key: "c", text: "Đã xong", value: "Đã xong" },
];
const UpdateBooking = () => {
  const [booking, setBooking] = useState(initBooking);
  const handleStatus = (e, { value }) =>
    setBooking({ ...booking, status: value });
  const onSubmit = async (event) => {
    event.preventDefault();
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
        .updateAppointment(
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
    <div>
      <Layout>
        <Segment padded>
          <h1>Cập nhật lịch hẹn</h1>
        </Segment>
        <Segment>
          <h2 style={{ marginTop: "20px", marginBottom: "30px" }}>
            Thông tin đặt lịch hẹn
          </h2>
          <Divider clearing />
          <Form onSubmit={onSubmit} error={!!booking.errorMessage}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Địa chỉ ETH bệnh nhân</label>
                <Input
                  placeholder="0xF6973b46412ff52c1BfDB783D29e5218620Be542"
                  value={booking.patientaddr}
                  onChange={(event) =>
                    setBooking({ ...booking, patientaddr: event.target.value })
                  }
                />
              </Form.Field>
            </Form.Group>

            <br />
            <Form.Group widths="equal">
              <Form.Field>
                <label>Ngày hẹn</label>
                <Input
                  placeholder="23/11/2023"
                  value={booking.date}
                  onChange={(event) =>
                    setBooking({ ...booking, date: event.target.value })
                  }
                />
              </Form.Field>

              <Form.Field>
                <label>Giờ</label>
                <Input
                  placeholder="10:30am"
                  value={booking.time}
                  onChange={(event) =>
                    setBooking({ ...booking, time: event.target.value })
                  }
                />
              </Form.Field>

              <Form.Field
                label="Trạng thái"
                control={Select}
                options={statusOptions}
                onChange={handleStatus}
              />
            </Form.Group>

            <br />
            <h2 style={{ marginTop: "20px", marginBottom: "30px" }}>
              Thông tin y tế
            </h2>
            <Divider clearing />
            <Form.TextArea
              label="Đơn thuốc"
              placeholder="Paracetamon 500mg"
              value={booking.prescription}
              onChange={(event) =>
                setBooking({ ...booking, prescription: event.target.value })
              }
            />

            <br />
            <Form.TextArea
              label="Chuẩn đoán"
              placeholder="Nhức đầu"
              value={booking.diagnosis}
              onChange={(event) =>
                setBooking({ ...booking, diagnosis: event.target.value })
              }
            />
            <br />
            <Form.TextArea
              label="Ghi chú"
              placeholder="Ghi chú dành cho bệnh nhân"
              value={booking.description}
              onChange={(event) =>
                setBooking({ ...booking, description: event.target.value })
              }
            />

            <br />
            <Message error header="Oops!" content={booking.errorMessage} />
            <Button primary loading={booking.loading}>
              Tạo
            </Button>
          </Form>
        </Segment>
      </Layout>
    </div>
  );
};

export default UpdateBooking;
