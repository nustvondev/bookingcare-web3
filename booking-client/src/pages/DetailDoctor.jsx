import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { record, web3 } from "../constants";
import Layout from "../layouts/Layout";
import { Grid, Segment, Header, Image } from "semantic-ui-react";
import { PATH_ROUTE } from "../constants/defineRoute";
const initUser = {
  ic: "",
  name: "",
  phone: "",
  gender: "",
  dob: "",
  qualification: "",
  major: "",
  imgPro: "",
};
const DetailDoctor = () => {
  const { _addr } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(initUser);
  useEffect(() => {
    async function fetchUser() {
      try {
        const address = _addr;
        const accounts = await web3.eth.getAccounts();
        const doctor = await record.methods
          .searchDoctor(address)
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
          imgPro: doctor[7],
        });
      } catch (error) {
        alert("Bạn không có quyền xem tài khoản này");
        navigate(PATH_ROUTE.root);
      }
    }

    fetchUser();
  });
  return (
    <div>
      <Layout>
        <div>
          <Grid columns={2} stackable className="fill-content">
            <Grid.Row>
              <Grid.Column width={1} />
              <Grid.Column width={14}>
                <Segment>
                  <Image
                    style={{ marginBottom: "25px" }}
                    className="centered"
                    src={user.imgPro}
                    size="small"
                    circular
                  />
                  <Segment>
                    <h2 style={{ textAlign: "center" }}>{user.name}</h2>
                  </Segment>
                </Segment>
                <Segment>
                  <Header as="h3" color="grey" style={{ marginBottom: "25px" }}>
                    Thông tin cá nhân
                  </Header>
                  <Grid columns={3} verticalAlign="top">
                    <Grid.Row>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Họ tên</b>
                        <div>{user.name}</div>
                      </Grid.Column>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Mã định danh</b>
                        <div>{user.ic}</div>
                      </Grid.Column>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Giới tính</b>
                        <div>{user.gender === "Female" ? "Nữ" : "Nam"}</div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={2} verticalAlign="top">
                    <Grid.Row>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Số điện thoại</b>
                        <div>{user.phone}</div>
                      </Grid.Column>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Ngày sinh</b>
                        <div>{user.dob}</div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Header
                    as="h3"
                    color="grey"
                    style={{ marginTop: "35px", marginBottom: "25px" }}
                  >
                    Học vấn
                  </Header>
                  <Grid columns={2} verticalAlign="top">
                    <Grid.Row>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Trình độ chuyên môn</b>
                        <div>{user.qualification}</div>
                      </Grid.Column>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Ngành</b>
                        <div>{user.major}</div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
              <Grid.Column width={1} />
            </Grid.Row>
          </Grid>
        </div>
      </Layout>
    </div>
  );
};

export default DetailDoctor;
