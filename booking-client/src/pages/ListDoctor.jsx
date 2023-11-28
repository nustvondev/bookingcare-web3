import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "semantic-ui-react";
import ListCard from "../components/ListCard";
import { record } from "../constants";
import Layout from "../layouts/Layout";
const initForm = {
  search: "",
  listItem: [],
};
const ListDoctor = () => {
  const [form, setForm] = useState(initForm);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      try {
        const listRecords = await record.methods.getDoctors().call();
        setForm({ ...form, listItem: listRecords });
      } catch (error) {
        alert("Có lỗi khi lấy dữ liệu!");
      }
    }

    fetchUser();
  });
  const onSearch = (event) => {
    event.preventDefault();
    if (!form.search) return;
    navigate(`/bac-si/${form.search}`);
  };
  return (
    <div>
      <Layout>
        <div>
          <Form onSubmit={onSearch}>
            <Form.Field>
              <Input
                fluid
                action={{ icon: "search" }}
                placeholder="Tìm kiếm..."
                onChange={(event) =>
                  setForm({ ...form, search: event.target.value })
                }
              />
              <br />
            </Form.Field>
          </Form>
          <h2>Danh sách bác sĩ</h2>
          <ListCard
            listItem={form.listItem}
            endpoint={"bac-si"}
            ob={"bác sĩ"}
          />
        </div>
      </Layout>
    </div>
  );
};

export default ListDoctor;
