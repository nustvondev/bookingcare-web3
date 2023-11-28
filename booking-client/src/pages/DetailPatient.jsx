import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { record, web3 } from "../constants";
import { PATH_ROUTE } from "../constants/defineRoute";
import Layout from "../layouts/Layout";
import { Grid, Segment, Header, Image } from "semantic-ui-react";

const DetailPatient = () => {
  const { _addr } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    ic: "",
    name: "",
    phone: "",
    dob: "",
    gender: "",
    imgPro: "",

    addressHome: "",
    bloodgroup: "",
    medication: "",

    doctoraddr: "",
    doctorname: "",
    date: "",
    time: "",
    diagnosis: "",
    prescription: "",
    description: "",
    status: "",
  });
  useEffect(() => {
    async function fetchUser() {
      try {
        const address = _addr;
        const accounts = await web3.eth.getAccounts();
        const records = await record.methods
          .searchPatientDemographic(address)
          .call({ from: accounts[0] });
        const records2 = await record.methods
          .searchPatientMedical(address)
          .call({ from: accounts[0] });
        const appointment = await record.methods
          .searchAppointment(address)
          .call({ from: accounts[0] });
        if (appointment[0].includes("0x00000000000")) appointment[0] = "";

        setUser({
          ic: records[0],
          name: records[1],
          phone: records[2],
          dob: records[3],
          gender: records[4],
          imgPro: records[5],

          addressHome: records2[0],
          bloodgroup: records2[1],
          medication: records2[2],

          doctoraddr: appointment[0],
          doctorname: appointment[1],
          date: appointment[2],
          time: appointment[3],
          diagnosis: appointment[4],
          prescription: appointment[5],
          description: appointment[6],
          status: appointment[7],
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
        <div style={{ fontFamily: "Helvetica" }}>
          <Grid columns={2} stackable className="fill-content">
            <Grid.Row>
              <Grid.Column width={1} />
              <Grid.Column width={5}>
                <Segment>
                  <Image
                    style={{ marginBottom: "25px" }}
                    className="centered"
                    src={user.imgPro || ""}
                    size="small"
                    circular
                  />
                  <Segment>
                    <h2 style={{ marginBottom: "25px" }}>{user.name}</h2>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column>
                          <b style={{ color: "grey" }}>Mã định danh</b>
                        </Grid.Column>
                        <Grid.Column>
                          <b>{user.ic}</b>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column>
                          <b style={{ color: "grey" }}>Số điện thoại</b>
                        </Grid.Column>
                        <Grid.Column>
                          <b>{user.phone}</b>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column>
                          <b style={{ color: "grey" }}>Giới tính</b>
                        </Grid.Column>
                        <Grid.Column>
                          <b>{user.gender === "Female" ? "Nữ" : "Nam"}</b>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </Segment>
              </Grid.Column>
              <Grid.Column width={9}>
                <Segment>
                  <Header as="h3" color="grey" style={{ marginBottom: "25px" }}>
                    Thông tin chi tiết
                  </Header>
                  <Grid columns={4} verticalAlign="top">
                    <Grid.Row>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Họ tên</b>
                        <div style={{ fontWeight: "bold" }}>{user.name}</div>
                      </Grid.Column>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Sinh nhật</b>
                        <div style={{ fontWeight: "bold" }}>{user.dob}</div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Địa chỉ</b>
                        <div style={{ fontWeight: "bold" }}>
                          {user.addressHome}
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Header
                    as="h3"
                    color="grey"
                    style={{ marginTop: "35px", marginBottom: "25px" }}
                  >
                    Chi tiết bệnh lý
                  </Header>
                  <Grid columns={2} verticalAlign="top">
                    <Grid.Row>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Nhóm máu</b>
                        <div style={{ fontWeight: "bold" }}>
                          {user.bloodgroup}
                        </div>
                      </Grid.Column>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Tiền sử bệnh</b>
                        <div style={{ fontWeight: "bold" }}>
                          {user.medication}
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>

                <Segment>
                  <Header as="h3" color="grey" style={{ marginBottom: "25px" }}>
                    Booking
                  </Header>
                  <Grid columns={1} verticalAlign="top">
                    <Grid.Row>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>ETH bác sĩ</b>
                        <div style={{ fontWeight: "bold" }}>
                          {user.doctoraddr}
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={3}>
                    <Grid.Row>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Tên bác sĩ</b>
                        <div style={{ fontWeight: "bold" }}>
                          {user.doctorname}
                        </div>
                      </Grid.Column>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Ngày</b>
                        <div style={{ fontWeight: "bold" }}>{user.date}</div>
                      </Grid.Column>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Giờ</b>
                        <div style={{ fontWeight: "bold" }}>{user.time}</div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Đơn thuốc</b>
                        <div style={{ fontWeight: "bold" }}>
                          {user.prescription}
                        </div>
                      </Grid.Column>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Mô tả</b>
                        <div style={{ fontWeight: "bold" }}>
                          {user.description}
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Chuẩn đoán</b>
                        <div style={{ fontWeight: "bold" }}>
                          {user.diagnosis}
                        </div>
                      </Grid.Column>
                      <Grid.Column>
                        <b style={{ color: "grey" }}>Trạng thái</b>
                        <div style={{ fontWeight: "bold" }}>{user.status}</div>
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

export default DetailPatient;
