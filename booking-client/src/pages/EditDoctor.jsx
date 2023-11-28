import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
const initUser = {
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
};

const EditDoctor = () => {
  const [user, setUser] = useState(initUser);
  const navigate = useNavigate();
  const handleGender = (e, { value }) => setUser({ ...user, gender: value });
  const handleQualification = (e, { value }) =>
    setUser({ ...user, qualification: value });
  const onSubmit = async (event) => {
    event.preventDefault();
    const { ic, name, phone, gender, dob, qualification, major, avatar } = user;
    setUser({ ...user, loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      const res = await record.methods
        .editDoctor(ic, name, phone, gender, dob, qualification, major, avatar)
        .send({ from: accounts[0] });
      alert(
        "Cập nhật thông tin bác sĩ thành công!\nMã giao dịch: " +
          res.transactionHash
      );
      navigate(`/bac-si/${accounts[0]}`);
    } catch (error) {
      setUser({ ...user, errorMessage: error.message });
      alert("Cập nhật tài khoản thất bại!");
    }
    setUser({ ...initUser });
  };
  const handleSubmitForm = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const doctor = await record.methods
        .searchDoctor(accounts[0])
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
        avatar: doctor[7],
      });
      alert("Lấy dữ liệu thành công");
    } catch (error) {
      console.log(error);
      alert("Không thể lấy dữ liệu");
    }
  };
  return (
    <div>
      <Layout>
        <Segment padded>
          <h1>Cập nhật tài khoản</h1>
        </Segment>
        <Segment>
          <h2 style={{ marginTop: "20px", marginBottom: "30px" }}>
            Thông tin chung
          </h2>
          <Divider clearing />

          <Button primary onClick={handleSubmitForm}>
            Lấy dữ diệu
          </Button>
          <Divider clearing />
          <img src={user.avatar} alt="Hình cá nhân" height={"150px"} />
          <Form onSubmit={onSubmit} error={!!user.errorMessage}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Mã định danh</label>
                <Input
                  placeholder="0000000000000"
                  value={user.ic}
                  onChange={(event) =>
                    setUser({ ...user, ic: event.target.value })
                  }
                />
              </Form.Field>

              <Form.Field>
                <label>Họ tên</label>
                <Input
                  placeholder="Nguyễn văn A"
                  value={user.name}
                  onChange={(event) =>
                    setUser({ ...user, name: event.target.value })
                  }
                />
              </Form.Field>

              <Form.Field>
                <label>Số điện thoại</label>
                <Input
                  placeholder="0123456789"
                  value={user.phone}
                  onChange={(event) =>
                    setUser({ ...user, phone: event.target.value })
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
                  value={user.dob}
                  onChange={(event) =>
                    setUser({ ...user, dob: event.target.value })
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
                  value={user.major}
                  onChange={(event) =>
                    setUser({ ...user, major: event.target.value })
                  }
                />
              </Form.Field>
            </Form.Group>
            <br />
            <Message error header="Oops!" content={user.errorMessage} />
            <Button primary loading={user.loading}>
              Cập nhật
            </Button>
          </Form>
        </Segment>
      </Layout>
    </div>
  );
};

export default EditDoctor;
