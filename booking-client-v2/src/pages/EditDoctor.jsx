import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { record, web3 } from "../constants";
import {
  dateFormatList,
  genderOption,
  qualificationOptions,
} from "../constants/global";
import Layouts from "../layout/Layouts";
import upload from "../utils/upload";
const { Title, Text } = Typography;
const initForm = {
  ic: "",
  name: "",
  phone: "",
  gender: "",
  dob: "",
  qualification: "",
  major: "",
  avatar: "",
  loading: false,
  errorMessage: "",
  uploading: false,
  fileImage: null,
};
const EditDoctor = () => {
  const [current, setCurrent] = useState(initForm);
  const navigate = useNavigate();
  const handleUploadImage = async (event) => {
    event.preventDefault();
    if (current.fileImage === null) return;
    setCurrent({ ...current, uploading: true });

    try {
      const urlImg = await upload(current.fileImage);
      current.avatar = urlImg;
      setCurrent({ ...current });
    } catch (error) {
      alert("Xay ra loi khi up anh!");
    }
    setCurrent({ ...current, uploading: false });
  };
  const handleSubMid = async () => {
    const { ic, name, phone, gender, dob, qualification, major, avatar } =
      current;

    setCurrent({ ...current, loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      const res = await record.methods
        .editDoctor(ic, name, phone, gender, dob, qualification, major, avatar)
        .send({ from: accounts[0] });
      alert(
        "Cập nhật tài khoản bác sĩ thành công!\nMã giao dịch: " +
          res.transactionHash
      );
      navigate(`/bac-si/${accounts[0]}`);
    } catch (err) {
      setCurrent({ ...current, errorMessage: err.message });
      alert("Tài khoản chưa tồn tại hoặc có lỗi xảy ra!");
    }

    setCurrent({
      ...initForm,
    });
  };
  const handleSubmitForm = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const doctor = await record.methods
        .searchDoctor(accounts[0])
        .call({ from: accounts[0] });

      setCurrent({
        ...current,
        ic: doctor[0],
        name: doctor[1],
        phone: doctor[2],
        gender: doctor[3],
        dob: doctor[4],
        qualification: doctor[5],
        major: doctor[6],
        avatar: doctor[7],
      });

      alert("Lấy dữ liệu thành công");
    } catch (error) {
      console.log(error);
      alert("Không thể lấy dữ liệu");
    }
  };
  return (
    <Layouts title={"Chỉnh sửa thông tin bác sĩ"}>
      <Title level={3} style={{ textAlign: "center" }}>
        Cập nhật thông tin bác sĩ
      </Title>
      <Button type="primary" onClick={handleSubmitForm}>
        Lấy dữ liệu
      </Button>
      <Card title={<Title level={3}>Thông tin chung</Title>}>
        <Form
          autoComplete="off"
          onFinish={(value) => {
            console.log(value);
          }}
          disabled={current.loading || false}
        >
          <Form.Item>
            {current.avatar ? (
              <Image
                src={current.avatar || ""}
                alt="Ảnh lỗi!"
                height={"100px"}
              />
            ) : (
              <Text type="danger">Vui lòng tải lên hình ảnh của bạn</Text>
            )}
          </Form.Item>
          <Form.Item>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setCurrent({ ...current, fileImage: e.target.files[0] });
              }}
            />
          </Form.Item>
          <Button
            onClick={handleUploadImage}
            disabled={current.uploading}
            loading={current.uploading}
          >
            Tải ảnh lên
          </Button>
          <Row>
            <Col span={8}>
              <Form.Item label="Mã định danh">
                <Input
                  placeholder="00000000000xxxx"
                  value={current.ic}
                  onChange={(event) => {
                    setCurrent({ ...current, ic: event.target.value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Họ và tên">
                <Input
                  placeholder="Nguyễn Văn A"
                  value={current.name}
                  onChange={(event) => {
                    setCurrent({ ...current, name: event.target.value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Số điện thoại">
                <Input
                  placeholder="0xxxxxxxxxx"
                  value={current.phone}
                  onChange={(event) => {
                    setCurrent({ ...current, phone: event.target.value });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="Giới tính">
                <Select
                  value={current.gender}
                  options={genderOption}
                  onChange={(e) => {
                    setCurrent({ ...current, gender: e });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Ngày sinh">
                <DatePicker
                  value={
                    current.dob ? dayjs(current.dob, dateFormatList[2]) : ""
                  }
                  format={dateFormatList[2]}
                  locale={locale}
                  onChange={(date, dateToString) => {
                    setCurrent({ ...current, dob: dateToString });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Title level={4}>Thông tin học vấn</Title>
          <Divider />
          <Row>
            <Col span={12}>
              <Form.Item label="Trình độ chuyên môn">
                <Select
                  value={current.qualification}
                  options={qualificationOptions}
                  onChange={(e) => {
                    setCurrent({ ...current, qualification: e });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngành">
                <Input
                  placeholder="Y dược"
                  value={current.major}
                  onChange={(e) => {
                    setCurrent({ ...current, major: e.target.value });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button type="primary" loading={current.loading} onClick={handleSubMid}>
          Cập nhật hồ sơ
        </Button>
      </Card>
    </Layouts>
  );
};

export default EditDoctor;
