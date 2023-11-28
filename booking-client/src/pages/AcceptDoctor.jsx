import React, { useState } from "react";
import Layout from "../layouts/Layout";
import {
  Segment,
  Input,
  Header,
  Message,
  Button,
  Form,
} from "semantic-ui-react";
import { record, web3 } from "../constants";
const initForm = {
  doctorAddr: "",
  loading: false,
  errorMessage: "",
};
const AcceptDoctor = () => {
  const [form, setForm] = useState(initForm);
  const onSubmit = async (e) => {
    e.preventDefault();
    setForm({ ...form, loading: true });

    try {
      const { doctorAddr } = form;
      const accounts = await web3.eth.getAccounts();
      await record.methods
        .givePermission(doctorAddr)
        .send({ from: accounts[0] });
      alert("Đã cấp quyền thành công!");
    } catch (error) {
      setForm({ ...form, errorMessage: error.message });
    }

    setForm({ ...initForm });
  };
  return (
    <div>
      {" "}
      <Layout>
        <Segment>
          <Header
            as="h2"
            content="Cấp quyền"
            subheader="Cho phép bác sĩ hoặc bệnh nhân xem hồ sơ"
          ></Header>
          <Input
            fluid
            placeholder="Địa chỉ ETH bác sĩ"
            value={form.doctorAddr}
            onChange={(event) =>
              setForm({ ...form, doctorAddr: event.target.value })
            }
          />
          <br />
          <Form onSubmit={onSubmit} error={!!form.errorMessage}>
            <Message error header="Oops!" content={form.errorMessage} />
            <Button primary loading={form.loading}>
              Chấp nhận
            </Button>
          </Form>
        </Segment>
      </Layout>
    </div>
  );
};

export default AcceptDoctor;
