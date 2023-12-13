import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PATH_ROUTE } from "../constants/defineRoute";
import Logo from "./Logo";
import { web3 } from "../constants";
const { Header } = Layout;

const splitPath = (str) => {
  return str.split("/")[1];
};
const HeaderLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  useEffect(() => {
    if (location.pathname.split("/").length > 1) {
      setCurrent(splitPath(location.pathname));
    }
  }, [location]);
  const onClickedDoctor = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    navigate(`/bac-si/${accounts[0]}`);
  };
  const onClickedPatient = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    navigate(`/benh-nhan/${accounts[0]}`);
  };
  return (
    <div>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Logo />

        <Menu
          mode="horizontal"
          theme="dark"
          items={[
            {
              key: "trang-chu",
              label: <Link to={PATH_ROUTE.home}>Trang chủ</Link>,
            },
            {
              key: "thong-ke",
              label: (
                <Link className="item" to={PATH_ROUTE.dashboard}>
                  Thống kê dữ liệu
                </Link>
              ),
            },
            {
              key: "danh-sach-benh-nhan",
              label: (
                <Link to={PATH_ROUTE.listRecord}> Danh sách bệnh nhân</Link>
              ),
            },
            {
              key: "danh-sach-bac-si",
              label: <Link to={PATH_ROUTE.listDoctor}> Danh sách bác sĩ</Link>,
            },
            {
              key: "danh-sach-cuoc-hen",
              label: (
                <Link to={PATH_ROUTE.listBooking}> Danh sách booking</Link>
              ),
            },
            {
              key: "subMenuDT",
              label: "Bác sĩ",
              children: [
                {
                  key: "bac-si",
                  label: (
                    <Link onClick={onClickedDoctor}>Thông tin cá nhân</Link>
                  ),
                },
                {
                  key: "chinh-sua-bac-si",
                  label: (
                    <Link to={PATH_ROUTE.editDoctor}>Chỉnh sữa thông tin</Link>
                  ),
                },
                {
                  key: "tao-lich-hen",
                  label: <Link to={PATH_ROUTE.booking}>Tạo lịch khám</Link>,
                },
                {
                  key: "chinh-sua-lich-hen",
                  label: (
                    <Link to={PATH_ROUTE.updateBooking}>
                      Cập nhật thông tin lịch khám
                    </Link>
                  ),
                },
              ],
            },
            {
              key: "subMenuPT",
              label: "Bệnh nhân",
              children: [
                {
                  key: "benh-nhan",
                  label: (
                    <Link onClick={onClickedPatient}>Thông tin cá nhân</Link>
                  ),
                },
                {
                  key: "chinh-sua-benh-nhan",
                  label: (
                    <Link to={PATH_ROUTE.editPaitient}>
                      Chỉnh sữa thông tin
                    </Link>
                  ),
                },
                {
                  key: "cap-quyen",
                  label: <Link to={PATH_ROUTE.acceptDoctor}>Cấp quyền</Link>,
                },
                {
                  key: "thu-hoi-quyen",
                  label: (
                    <Link to={PATH_ROUTE.revokeDoctor}>Thu hồi quyền</Link>
                  ),
                },
              ],
            },
            {
              key: "subMenuRT",
              label: "Đăng kí",
              children: [
                {
                  key: "dang-ky-benh-nhan",
                  label: <Link to={PATH_ROUTE.patientRegister}>Bệnh nhân</Link>,
                },
                {
                  key: "dang-ki-bac-si",
                  label: <Link to={PATH_ROUTE.doctorRegister}>Bác sĩ</Link>,
                },
              ],
            },
          ]}
          selectedKeys={[current]}
          style={{
            flex: 1,
            minWidth: 0,
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        />
      </Header>
    </div>
  );
};

export default HeaderLayout;
