import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";

import { Link, useNavigate } from "react-router-dom";
import { PATH_ROUTE } from "../constants/defineRoute";
import { web3 } from "../constants";

const MenuBar = (props) => {
  const navigate = useNavigate();
  const onClickedPatient = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    navigate(`/benh-nhan/${accounts[0]}`);
  };

  const onClickedDoctor = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    navigate(`/bac-si/${accounts[0]}`);
  };
  return (
    <Menu size="large" inverted>
      <Link to={PATH_ROUTE.root} className="item">
        Trang chủ
      </Link>

      <Menu.Menu position="right">
        <Link className="item" to={PATH_ROUTE.dashboard}>
          Thống kê dữ liệu
        </Link>
        <Link className="item" to={PATH_ROUTE.listRecord}>
          Danh sách bệnh nhân
        </Link>

        <Link className="item" to={PATH_ROUTE.listDoctor}>
          Danh sách bác sĩ
        </Link>
        <Link className="item" to={PATH_ROUTE.listBooking}>
          Danh sách booking
        </Link>
        <Dropdown item text="Bác sĩ">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link style={{ color: "black" }} onClick={onClickedDoctor}>
                Thông tin cá nhân
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={PATH_ROUTE.editDoctor} style={{ color: "black" }}>
                Chỉnh sữa thông tin
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={PATH_ROUTE.booking} style={{ color: "black" }}>
                Tạo lịch khám
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={PATH_ROUTE.updateBooking} style={{ color: "black" }}>
                Cập nhật thông tin lịch khám
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Bệnh nhân">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link style={{ color: "black" }} onClick={onClickedPatient}>
                Thông tin cá nhân
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={PATH_ROUTE.editPaitient} style={{ color: "black" }}>
                Chỉnh sữa thông tin
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={PATH_ROUTE.acceptDoctor} style={{ color: "black" }}>
                Cấp quyền
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={PATH_ROUTE.revokeDoctor} style={{ color: "black" }}>
                Thu hồi quyền
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Đăng kí">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to={PATH_ROUTE.patientRegister} style={{ color: "black" }}>
                Bệnh nhân
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={PATH_ROUTE.doctorRegister} style={{ color: "black" }}>
                Bác sĩ
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};

export default MenuBar;
