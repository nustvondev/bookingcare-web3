import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import { record, web3 } from "../constants";
import {
  Divider,
  Form,
  Input,
  Button,
  Segment,
  Message,
  Select,
} from "semantic-ui-react";
const options = [
  { key: "m", text: "Nam", value: "Male" },
  { key: "f", text: "Nữ", value: "Female" },
  { key: "o", text: "Khác", value: "Other" },
];
const init = {
  ic: "",
  name: "",
  phone: "",
  dob: "",
  gender: "",
  addressHome: "",
  bloodgroup: "",
  medication: "",
  loading: false,
  errorMessage: "",
  avatar: "",
};
const EditPatient = () => {
  const [user, setUser] = useState(init);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const {
      ic,
      name,
      gender,
      phone,
      dob,
      addressHome,
      bloodgroup,
      medication,
      avatar,
    } = user;
    setUser({ ...user, loading: true });
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
      alert("Cập nhật thành công!\nMã giao dịch: " + res.transactionHash);
      navigate(`/benh-nhan/${accounts[0]}`);
    } catch (error) {
      setUser({ ...user, errorMessage: error.message });
      alert("Cập nhật thất bại");
    }
    setUser({
      ...init,
    });
  };
  const handleGender = (e, { value }) => setUser({ ...user, gender: value });
  const handleSubmitData = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const records = await record.methods
        .searchPatientDemographic(accounts[0])
        .call({ from: accounts[0] });
      const records2 = await record.methods
        .searchPatientMedical(accounts[0])
        .call({ from: accounts[0] });
      setUser({
        ...user,
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
    <div>
      <Layout>
        <Segment padded>
          <h1>Chỉnh sửa thông tin</h1>
        </Segment>
        <Segment>
          <h2 style={{ marginTop: "20px", marginBottom: "30px" }}>
            Thông tin chung
          </h2>
          <br />
          <Button primary onClick={handleSubmitData}>
            Lấy dữ diệu
          </Button>
          <Divider clearing /> <Divider clearing />
          <img src={user.avatar} alt="Hình cá nhân" height={"150px"} />
          <Form onSubmit={onSubmit} error={!!user.errorMessage}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Mã định danh</label>
                <Input
                  placeholder="000000000000000"
                  value={user.ic}
                  onChange={(event) =>
                    setUser({ ...user, ic: event.target.value })
                  }
                />
              </Form.Field>

              <Form.Field>
                <label>Full Name</label>
                <Input
                  placeholder="Nguyễn Văn A"
                  value={user.name}
                  onChange={(event) =>
                    setUser({ ...user, name: event.target.value })
                  }
                />
              </Form.Field>

              <Form.Field>
                <label>Số điện thoại</label>
                <Input
                  placeholder="0098764213"
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
                options={options}
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
            <Form.Group widths="equal">
              <Form.TextArea
                label="Địa chỉ"
                placeholder="Tổ x,........."
                value={user.addressHome}
                onChange={(event) =>
                  setUser({ ...user, addressHome: event.target.value })
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
                  value={user.bloodgroup}
                  onChange={(event) =>
                    setUser({ ...user, bloodgroup: event.target.value })
                  }
                />
              </Form.Field>
            </Form.Group>
            <br />
            <Form.Group widths="equal">
              <Form.TextArea
                label="Tiền sử bệnh án"
                placeholder="Tim..."
                value={user.medication}
                onChange={(event) =>
                  setUser({ ...user, medication: event.target.value })
                }
              />
            </Form.Group>

            <br />
            <Message error header="Oops!" content={user.errorMessage} />
            <Button primary loading={user.loading}>
              Edit
            </Button>
          </Form>
        </Segment>
      </Layout>
    </div>
  );
};

export default EditPatient;
