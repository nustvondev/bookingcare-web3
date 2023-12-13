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
import { dateFormatList, genderOption } from "../constants/global";
import Layouts from "../layout/Layouts";
import upload from "../utils/upload";
import { record, web3 } from "../constants";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;
const initForm = {
  ic: "",
  name: "",
  phone: "",
  gender: "",
  dob: "",
  addressHome: "",
  bloodgroup: "",
  medication: "",
  avatar: "",
  fileImage: "",
  loading: false,
  errorMessage: "",
  uploading: false,
};

const EditPatient = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(initForm);

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
    const {
      ic,
      name,
      phone,
      gender,
      dob,
      addressHome,
      bloodgroup,
      medication,
      avatar,
    } = current;

    setCurrent({ ...current, loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      const res = await record.methods
        .editDetails(
          ic,
          name,
          gender,
          phone,
          dob,
          addressHome,
          bloodgroup,
          medication,
          avatar
        )
        .send({ from: accounts[0] });

      alert("Tạo tài khoản thành công!\nMã giao dịch: " + res.transactionHash);
      navigate(`/benh-nhan/${accounts[0]}`);
    } catch (err) {
      setCurrent({ ...current, errorMessage: err.message });
      alert("Tài khoản chưa tồn tại hoặc có lỗi xảy ra!");
    }

    setCurrent({
      ...initForm,
    });
  };
  const handleSubmitData = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const records = await record.methods
        .searchPatientDemographic(accounts[0])
        .call({ from: accounts[0] });
      const records2 = await record.methods
        .searchPatientMedical(accounts[0])
        .call({ from: accounts[0] });
      setCurrent({
        ...current,
        ic: records[0],
        name: records[1],
        phone: records[2],
        dob: records[3],
        gender: records[4],
        avatar: records[5],

        addressHome: records2[0],
        bloodgroup: records2[1],
        medication: records2[2],
      });
      alert("Lấy dữ liệu thành công");
    } catch (error) {
      alert("Không thể lấy dữ liệu");
    }
  };
  return (
    <Layouts title={"Chỉnh sửa thông tin bệnh nhân"}>
      <Title level={3} style={{ textAlign: "center" }}>
        Cập nhật thông tin bệnh nhân
      </Title>
      <Button type="primary" onClick={handleSubmitData}>
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
            <Col span={12}>
              <Form.Item label="Địa chỉ">
                <Input.TextArea
                  placeholder="Số nhà, đường, tỉnh, thành phố..."
                  value={current.addressHome}
                  autoSize
                  onChange={(e) => {
                    setCurrent({ ...current, addressHome: e.target.value });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Title level={4}>Bệnh lý</Title>
          <Divider />
          <Row>
            <Col span={12}>
              <Form.Item label="Nhóm máu">
                <Input
                  placeholder="A+"
                  value={current.bloodgroup}
                  onChange={(e) => {
                    setCurrent({ ...current, bloodgroup: e.target.value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tình trạng bệnh lý trước đây">
                <Input
                  placeholder="Tim,..."
                  value={current.medication}
                  onChange={(e) => {
                    setCurrent({ ...current, medication: e.target.value });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button type="primary" loading={current.loading} onClick={handleSubMid}>
          Tạo hồ sơ
        </Button>
      </Card>
    </Layouts>
  );
};

export default EditPatient;
