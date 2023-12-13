import React, { useEffect, useState } from "react";
import Layouts from "../layout/Layouts";
import { Button, Card, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { record } from "../constants";
const initForm = {
  search: "",
  listItem: [],
};
const ListPatient = () => {
  const [form, setForm] = useState(initForm);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      try {
        const listRecords = await record.methods.getPatients().call();
        setForm({ ...form, listItem: listRecords });
      } catch (error) {
        alert("Có lỗi khi lấy dữ liệu!");
      }
    }
    if (form.listItem.length === 0) {
      fetchUser();
    }
  });
  const onSearch = () => {
    if (!form.search) return;
    navigate(`/benh-nhan/${form.search}`);
  };
  return (
    <Layouts title={"Danh sách bệnh nhân"}>
      <Card
        title={
          <Typography.Title level={3}>Danh sách bệnh nhân</Typography.Title>
        }
      >
        <Input
          value={form.search}
          placeholder="Địa chỉ của bệnh nhân"
          onChange={(e) => {
            setForm({ ...form, search: e.target.value });
          }}
        />
        <Button style={{ marginTop: "20px" }} type="primary" onClick={onSearch}>
          Tìm kiếm
        </Button>
        <div style={{ marginTop: "30px" }}>
          {form.listItem.length > 0 &&
            form.listItem.map((item) => {
              return (
                <Card
                  key={item}
                  style={{ width: 500, height: 120 }}
                  title={item || ""}
                  extra={<Link to={`/benh-nhan/${item}`}>Xem thêm</Link>}
                ></Card>
              );
            })}
        </div>
      </Card>
    </Layouts>
  );
};

export default ListPatient;
