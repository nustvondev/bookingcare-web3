import React from "react";
import {
  Segment,
  Input,
  Header,
  Message,
  Button,
  Form,
} from "semantic-ui-react";
import { record, web3 } from "../constants";
import Layout from "../layouts/Layout";
const RevokeDoctor = () => {
  const [initState, setInitState] = React.useState({
    doctorAddr: "",
    loading: false,
    errorMessage: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setInitState({ ...initState, loading: true });
    try {
      const accounts = await web3.eth.getAccounts();
      await record.methods
        .RevokePermission(initState.doctorAddr)
        .send({ from: accounts[0] });
      alert("Đã thu hồi quyền thành công!");
    } catch (error) {
      setInitState({ ...initState, errorMessage: error.message });
    }
    setInitState({ ...initState, loading: false, doctorAddr: "" });
  };
  return (
    <Layout>
      <Segment>
        <Header
          as="h2"
          content="Thu hồi quyền truy cập"
          subheader="Thu hồi quyền cho bác sĩ hoặc bệnh nhân xem hồ sơ"
        ></Header>
        <Input
          fluid
          placeholder="Địa chỉ Ethereum của bác sĩ"
          value={initState.doctorAddr}
          onChange={(event) =>
            setInitState({ ...initState, doctorAddr: event.target.value })
          }
        />
        <br />
        <Form onSubmit={handleSubmit} error={!!initState.errorMessage}>
          <Message error header="Oops!" content={initState.errorMessage} />
          <Button primary loading={initState.loading}>
            Thu hồi
          </Button>
        </Form>
      </Segment>
    </Layout>
  );
};

export default RevokeDoctor;
