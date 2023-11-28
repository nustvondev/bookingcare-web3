import React, { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Message,
  Segment,
  Select,
} from "semantic-ui-react";
import { record, web3 } from "../constants";
import Layout from "../layouts/Layout";
import upload from "../utils/upload";

const qualificationOptions = [
  { key: "b", text: "Cử nhân", value: "Cử nhân" },
  { key: "m", text: "Tiến sĩ", value: "Tiến sĩ" },
  { key: "dd", text: "Bác sĩ", value: "Bác sĩ" },
];
const genderOptions = [
  { key: "m", text: "Nam", value: "Male" },
  { key: "f", text: "Nữ", value: "Female" },
  { key: "o", text: "Khác", value: "Other" },
];
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
const DoctorRegister = () => {
  const [form, setForm] = useState(initForm);

  const handleGender = (e, { value }) => setForm({ ...form, gender: value });
  const handleUploadImage = async (event) => {
    event.preventDefault();
    if (form.fileImage === null) return;
    setForm({ ...form, uploading: true });

    try {
      const urlImg = await upload(form.fileImage);
      form.avatar = urlImg;
      setForm({ ...form });
    } catch (error) {
      alert("Xay ra loi khi up anh!");
    }
    setForm({ ...form, uploading: false });
  };
  const handleQualification = (e, { value }) =>
    setForm({ ...form, qualification: value });

  const onSubmit = async (event) => {
    event.preventDefault();

    const { ic, name, phone, gender, dob, qualification, major, avatar } = form;

    setForm({ ...form, loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      const res = await record.methods
        .setDoctor(ic, name, phone, gender, dob, qualification, major, avatar)
        .send({ from: accounts[0] });
      alert(
        "Tạo tài khoản bác sĩ thành công!\nMã giao dịch: " + res.transactionHash
      );
    } catch (err) {
      setForm({ ...form, errorMessage: err.message });
      alert("Tài khoản đã tồn tại");
    }

    setForm({
      ...initForm,
    });
  };
  return (
    <div>
      <Layout>
        <Segment padded>
          <h1>Đăng ký bác sĩ</h1>
        </Segment>
        <Segment>
          <h2 style={{ marginTop: "20px", marginBottom: "30px" }}>
            Thông tin chung
          </h2>
          <Divider clearing />
          <Form onSubmit={onSubmit} error={!!form.errorMessage}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Hình cá nhân</label>
                <Button
                  content="Tải ảnh lên"
                  onClick={handleUploadImage}
                  disabled={form.uploading}
                />
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    setForm({ ...form, fileImage: e.target.files[0] });
                  }}
                />
              </Form.Field>
              <Form.Field>
                <img src={form.avatar} alt="Chưa có ảnh" height={"150px"} />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Mã định danh</label>
                <Input
                  placeholder="0000000000000"
                  value={form.ic}
                  onChange={(event) =>
                    setForm({ ...form, ic: event.target.value })
                  }
                />
              </Form.Field>

              <Form.Field>
                <label>Họ tên</label>
                <Input
                  placeholder="Nguyễn văn A"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                />
              </Form.Field>

              <Form.Field>
                <label>Số điện thoại</label>
                <Input
                  placeholder="0123456789"
                  value={form.phone}
                  onChange={(event) =>
                    setForm({ ...form, phone: event.target.value })
                  }
                />
              </Form.Field>
            </Form.Group>
            <br />
            <Form.Group widths="equal">
              <Form.Field
                label="Giới tính"
                control={Select}
                options={genderOptions}
                onChange={handleGender}
              />

              <Form.Field>
                <label>Ngày sinh</label>
                <Input
                  placeholder="dd/mm/yyyy"
                  value={form.dob}
                  onChange={(event) =>
                    setForm({ ...form, dob: event.target.value })
                  }
                />
              </Form.Field>
            </Form.Group>
            <br />
            <h2 style={{ marginTop: "20px", marginBottom: "30px" }}>
              Thông tin học vấn
            </h2>
            <Divider clearing />
            <Form.Group widths="equal">
              <Form.Field
                label="Trình độ chuyên môn"
                control={Select}
                options={qualificationOptions}
                onChange={handleQualification}
              />

              <Form.Field>
                <label>Ngành</label>
                <Input
                  placeholder="Y dược"
                  value={form.major}
                  onChange={(event) =>
                    setForm({ ...form, major: event.target.value })
                  }
                />
              </Form.Field>
            </Form.Group>
            <br />
            <Message error header="Oops!" content={form.errorMessage} />
            <Button primary loading={form.loading}>
              Tạo
            </Button>
          </Form>
        </Segment>
      </Layout>
    </div>
  );
};

export default DoctorRegister;
