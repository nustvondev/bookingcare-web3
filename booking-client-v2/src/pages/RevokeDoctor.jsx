import React, { useState } from "react";
import Layouts from "../layout/Layouts";
import { Button, Card, Input, Typography } from "antd";
import { record, web3 } from "../constants";
const initForm = {
  doctorAddr: "",
  loading: false,
  errorMessage: "",
};
const RevokeDoctor = () => {
  const [form, setForm] = useState(initForm);
  const handleOnSubmit = async () => {
    setForm({ ...form, loading: true });
    try {
      const { doctorAddr } = form;
      const accounts = await web3.eth.getAccounts();
      await record.methods
        .RevokePermission(doctorAddr)
        .send({ from: accounts[0] });
      alert("Đã thu hồi quyền thành công!");
    } catch (error) {
      setForm({ ...form, errorMessage: error.message });
    }

    setForm({ ...initForm });
  };
  return (
    <Layouts title={"Thu hồi quyền"}>
      <Card
        title={
          <Typography.Title level={3}>
            Thu hồi quyền truy cập bác sĩ
          </Typography.Title>
        }
      >
        <Input
          disabled={form.loading}
          value={form.doctorAddr}
          placeholder="Địa chỉ của bác sĩ"
          onChange={(e) => {
            setForm({ ...form, doctorAddr: e.target.value });
          }}
        />
        <Button
          style={{ marginTop: "20px" }}
          loading={form.loading}
          disabled={form.loading}
          type="primary"
          onClick={handleOnSubmit}
        >
          Thu hồi
        </Button>
      </Card>
    </Layouts>
  );
};

export default RevokeDoctor;
