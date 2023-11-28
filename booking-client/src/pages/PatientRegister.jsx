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

const options = [
  { key: "m", text: "Nam", value: "Male" },
  { key: "f", text: "Nữ", value: "Female" },
  { key: "o", text: "Khác", value: "Other" },
];
const init = {
  ic: "",
  name: "",
  phone: "",
  gender: "",
  dob: "",
  addressHome: "",
  bloodgroup: "",
  medication: "",
  avatar: "",
  loading: false,
  errorMessage: "",
  uploading: false,
  fileImage: null,
};
const PatientRegister = (props) => {
  const [initForm, setInitForm] = useState(init);

  const handleGender = (e, { value }) =>
    setInitForm({ ...initForm, gender: value });

  const onSubmit = async (event) => {
    event.preventDefault();
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
    } = initForm;

    setInitForm({ ...initForm, loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      const res = await record.methods
        .setDetails(
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
    } catch (err) {
      setInitForm({ ...initForm, errorMessage: err.message });
      alert("Tài khoản đã tồn tại!");
    }

    setInitForm({
      ...init,
    });
  };
  const handleUploadImage = async (event) => {
    event.preventDefault();
    if (initForm.fileImage === null) return;
    setInitForm({ ...initForm, uploading: true });

    try {
      const urlImg = await upload(initForm.fileImage);
      initForm.avatar = urlImg;
      setInitForm({ ...initForm });
    } catch (error) {
      alert("Xay ra loi khi up anh!");
    }
    setInitForm({ ...initForm, uploading: false });
  };

  return (
    <div>
      <Layout>
        <Segment padded>
          <h1>Thông tin bệnh bệnh nhân</h1>
        </Segment>
        <Segment>
          <h2 style={{ marginTop: "10px", marginBottom: "30px" }}>
            Thông tin chung
          </h2>
          <Divider clearing />
          <Form onSubmit={onSubmit} error={!!initForm.errorMessage}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Hình cá nhân</label>
                <Button
                  content="Tải ảnh lên"
                  onClick={handleUploadImage}
                  disabled={initForm.uploading}
                />
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    setInitForm({ ...initForm, fileImage: e.target.files[0] });
                  }}
                />
              </Form.Field>
              <Form.Field>
                <img src={initForm.avatar} alt="Chưa có ảnh" height={"150px"} />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field>
                <label>Mã định danh</label>
                <Input
                  placeholder="001234010234"
                  value={initForm.ic}
                  onChange={(event) =>
                    setInitForm({ ...initForm, ic: event.target.value })
                  }
                />
              </Form.Field>

              <Form.Field>
                <label>Họ và tên</label>
                <Input
                  placeholder="Nguyễn văn A"
                  value={initForm.name}
                  onChange={(event) =>
                    setInitForm({ ...initForm, name: event.target.value })
                  }
                />
              </Form.Field>

              <Form.Field>
                <label>Số điện thoại</label>
                <Input
                  placeholder="0123456789"
                  value={initForm.phone}
                  onChange={(event) =>
                    setInitForm({ ...initForm, phone: event.target.value })
                  }
                />
              </Form.Field>
            </Form.Group>
            <br />
            <Form.Group widths="equal">
              <Form.Field
                label="Giới tính"
                control={Select}
                options={options}
                onChange={handleGender}
              />

              <Form.Field>
                <label>Sinh nhật</label>
                <Input
                  placeholder="01/01/2000"
                  value={initForm.dob}
                  onChange={(event) =>
                    setInitForm({ ...initForm, dob: event.target.value })
                  }
                />
              </Form.Field>
            </Form.Group>

            <br />
            <Form.Group widths="equal">
              <Form.TextArea
                label="Địa chỉ nhà"
                placeholder="Số nhà 3, tổ/xóm,..."
                value={initForm.addressHome}
                onChange={(event) =>
                  setInitForm({ ...initForm, addressHome: event.target.value })
                }
              />
            </Form.Group>

            <br />
            <h2 style={{ marginTop: "20px", marginBottom: "30px" }}>Bệnh lý</h2>
            <Divider clearing />
            <Form.Group widths="equal">
              <Form.Field>
                <label>Nhóm máu</label>
                <Input
                  placeholder="A-"
                  value={initForm.bloodgroup}
                  onChange={(event) =>
                    setInitForm({ ...initForm, bloodgroup: event.target.value })
                  }
                />
              </Form.Field>
            </Form.Group>
            <br />
            <Form.Group widths="equal">
              <Form.TextArea
                label="Tình trạng bệnh lý trước đây"
                placeholder="Tim..."
                value={initForm.medication}
                onChange={(event) =>
                  setInitForm({ ...initForm, medication: event.target.value })
                }
              />
            </Form.Group>

            <br />

            <Divider clearing />
            <Form.Group widths="equal"></Form.Group>
            <br />
            <Message error header="Oops!" content={initForm.errorMessage} />
            <Button primary loading={initForm.loading}>
              Tạo
            </Button>
          </Form>
        </Segment>
      </Layout>
    </div>
  );
};

export default PatientRegister;
