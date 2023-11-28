import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, Image, Segment, Statistic } from "semantic-ui-react";
import { record, web3 } from "../constants";
import { monthName } from "../constants/global";
import Layout from "../layouts/Layout";
const init = {
  patGrowthColor: "green",
  apptGrowthColor: "green",
  patientMonthOverMonthChange: 0,
  appointmentMonthOverMonthChange: 0,
  patientCount: 0,
  doctorCount: 0,
  appointmentCount: 0,
  permissionGrantedCount: 0,
  data: [],
  pieData: [],
  lineData: [],
};
const Dashboard = () => {
  const [chart, setChart] = useState(init);
  useEffect(() => {
    async function fetchData() {
      try {
        let data = [];
        let pieData = [];
        const accounts = await web3.eth.getAccounts();
        const allPatients = await record.methods.getPatients().call();
        const allDoctors = await record.methods.getDoctors().call();
        const allAppointments = await record.methods.getAppointments().call();

        let patientCount = Number(
          await record.methods.getPatientCount().call()
        );
        let doctorCount = Number(await record.methods.getDoctorCount().call());
        let appointmentCount = Number(
          await record.methods.getAppointmentCount().call()
        );
        let permissionGrantedCount = Number(
          await record.methods.getPermissionGrantedCount().call()
        );

        let dict = {
          January: 0,
          February: 0,
          March: 0,
          April: 0,
          May: 0,
          June: 0,
          July: 0,
          August: 0,
          September: 0,
          October: 0,
          November: 0,
          December: 0,
        };
        let docdict = {
          January: 0,
          February: 0,
          March: 0,
          April: 0,
          May: 0,
          June: 0,
          July: 0,
          August: 0,
          September: 0,
          October: 0,
          November: 0,
          December: 0,
        };
        let apptdict = {
          January: 0,
          February: 0,
          March: 0,
          April: 0,
          May: 0,
          June: 0,
          July: 0,
          August: 0,
          September: 0,
          October: 0,
          November: 0,
          December: 0,
        };

        //dữ liệu bệnh nhân được lấy từ blockchain để sử dụng trong biểu đồ vùng
        for (let i = 0; i < allPatients.length; i++) {
          let addr = allPatients[i];
          let unixDate = await record.methods
            .searchRecordDate(addr)
            .call({ from: accounts[0] });
          let month = monthName[new Date(Number(unixDate) * 1000).getMonth()];
          dict[month] = (dict[month] || 0) + 1;
        }

        //dữ liệu bác sĩ được lấy từ chuỗi khối để sử dụng trong biểu đồ vùng
        for (let i = 0; i < allDoctors.length; i++) {
          let addr = allDoctors[i];
          let unixDate = await record.methods
            .searchDoctorDate(addr)
            .call({ from: accounts[0] });
          let month = monthName[new Date(Number(unixDate) * 1000).getMonth()];
          docdict[month] = (docdict[month] || 0) + 1;
        }
        //dữ liệu booking được lấy từ chuỗi khối để sử dụng trong biểu đồ dạng đường
        for (let i = 0; i < allAppointments.length; i++) {
          let addr = allAppointments[i];
          let unixDate = await record.methods
            .searchAppointmentDate(addr)
            .call({ from: accounts[0] });
          let month = monthName[new Date(Number(unixDate) * 1000).getMonth()];
          apptdict[month] = (apptdict[month] || 0) + 1;
        }
        //mảng booking với dữ liệu được lấy từ chuỗi khối để sử dụng trong biểu đồ hình tròn
        for (let i = 0; i < allPatients.length; i++) {
          let addr = allPatients[i];
          let count = await record.methods
            .getAppointmentPerPatient(addr)
            .call({ from: accounts[0] });

          if (addr === 0 && addr === null) {
            pieData[i] = { 0: 0 };
          }

          //dữ liệu biểu đồ hình tròn
          pieData[i] = { Name: addr, Count: parseInt(count) };
        }
        let today = new Date();
        let mm = String(today.getMonth());
        let resultPat,
          resultAppt,
          patientMonthOverMonthChange,
          appointmentMonthOverMonthChange;

        // Truy xuất và hiển thị sự tăng trưởng của bệnh nhân hàng tháng
        for (let i = 0; i < 12; i++) {
          if (monthName[mm] === Object.entries(dict)[i][0]) {
            resultPat =
              parseInt(Object.entries(dict)[i][1]) -
              parseInt(Object.entries(dict)[--i][1]);
            patientMonthOverMonthChange = (resultPat * 100).toFixed(2);
            break;
          }
        }

        // Truy xuất và hiển thị mức tăng trưởng booking hàng tháng
        for (let i = 0; i < 12; i++) {
          if (monthName[mm] === Object.entries(apptdict)[i][0]) {
            resultAppt =
              parseInt(Object.entries(apptdict)[i][1]) -
              parseInt(Object.entries(apptdict)[--i][1]);
            appointmentMonthOverMonthChange = (resultAppt * 100).toFixed(2);
            break;
          }
        }

        let patGrowthColor = patientMonthOverMonthChange > 0 ? "green" : "red";
        let apptGrowthColor =
          appointmentMonthOverMonthChange > 0 ? "green" : "red";

        data = [
          {
            Name: Object.entries(dict)[0][0],
            Patients: Object.entries(dict)[0][1],
            Doctors: Object.entries(docdict)[0][1],
          },
          {
            Name: Object.entries(dict)[1][0],
            Patients: Object.entries(dict)[1][1],
            Doctors: Object.entries(docdict)[1][1],
          },
          {
            Name: Object.entries(dict)[2][0],
            Patients: Object.entries(dict)[2][1],
            Doctors: Object.entries(docdict)[2][1],
          },
          {
            Name: Object.entries(dict)[3][0],
            Patients: Object.entries(dict)[3][1],
            Doctors: Object.entries(docdict)[3][1],
          },
          {
            Name: Object.entries(dict)[4][0],
            Patients: Object.entries(dict)[4][1],
            Doctors: Object.entries(docdict)[4][1],
          },
          {
            Name: Object.entries(dict)[5][0],
            Patients: Object.entries(dict)[5][1],
            Doctors: Object.entries(docdict)[5][1],
          },
          {
            Name: Object.entries(dict)[6][0],
            Patients: Object.entries(dict)[6][1],
            Doctors: Object.entries(docdict)[6][1],
          },
          {
            Name: Object.entries(dict)[7][0],
            Patients: Object.entries(dict)[7][1],
            Doctors: Object.entries(docdict)[7][1],
          },
          {
            Name: Object.entries(dict)[8][0],
            Patients: Object.entries(dict)[8][1],
            Doctors: Object.entries(docdict)[8][1],
          },
          {
            Name: Object.entries(dict)[9][0],
            Patients: Object.entries(dict)[9][1],
            Doctors: Object.entries(docdict)[9][1],
          },
          {
            Name: Object.entries(dict)[10][0],
            Patients: Object.entries(dict)[10][1],
            Doctors: Object.entries(docdict)[10][1],
          },
          {
            Name: Object.entries(dict)[11][0],
            Patients: Object.entries(dict)[11][1],
            Doctors: Object.entries(docdict)[11][1],
          },
        ];
        let dataFm = [];
        for (let i = 0; i < data.length; i++) {
          let newItem = {
            Name: `Tháng ${i + 1}`,
            "Bệnh nhân": data[i].Patients,
            "Bác sĩ": data[i].Doctors,
          };
          dataFm.push(newItem);
        }

        setChart({
          ...chart,
          patientCount: patientCount,
          doctorCount: doctorCount,
          appointmentCount: appointmentCount,
          permissionGrantedCount: permissionGrantedCount,
          data: dataFm,
          pieData: pieData,
          patientMonthOverMonthChange: patientMonthOverMonthChange,
          appointmentMonthOverMonthChange: appointmentMonthOverMonthChange,
          patGrowthColor: patGrowthColor,
          apptGrowthColor: apptGrowthColor,
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  });

  return (
    <div>
      <Layout>
        <>
          <Card.Group centered itemsPerRow="2">
            <Card color={chart.patGrowthColor}>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://cdn-icons-png.flaticon.com/512/858/858736.png"
                />
                <Card.Header>Tăng trưởng bệnh nhân hàng tháng</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Statistic size="small" color={chart.patGrowthColor}>
                  <Statistic.Value>
                    {chart.patientMonthOverMonthChange}%
                  </Statistic.Value>
                </Statistic>
              </Card.Content>
            </Card>

            <Card color={chart.apptGrowthColor}>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://cdn-icons-png.flaticon.com/512/858/858736.png"
                />
                <Card.Header>Tăng trưởng booking hàng tháng</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Statistic size="small" color={chart.apptGrowthColor}>
                  <Statistic.Value>
                    {chart.appointmentMonthOverMonthChange}%
                  </Statistic.Value>
                </Statistic>
              </Card.Content>
            </Card>
          </Card.Group>

          <Card.Group centered itemsPerRow="4">
            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://cdn-icons-png.flaticon.com/128/1512/1512910.png"
                />
                <Card.Header>Số hồ sơ bệnh nhân</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Statistic size="small">
                  <Statistic.Value>{chart.patientCount}</Statistic.Value>
                </Statistic>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://cdn-icons-png.flaticon.com/128/3481/3481061.png"
                />
                <Card.Header>Số lượng bác sĩ</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Statistic size="small">
                  <Statistic.Value>{chart.doctorCount}</Statistic.Value>
                </Statistic>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://cdn-icons-png.flaticon.com/128/2693/2693507.png"
                />
                <Card.Header>Số lượng booking</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Statistic size="small">
                  <Statistic.Value>{chart.appointmentCount}</Statistic.Value>
                </Statistic>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://cdn-icons-png.flaticon.com/128/1642/1642097.png"
                />
                <Card.Header>Số lượng quyền được cấp</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Statistic size="small">
                  <Statistic.Value>
                    {chart.permissionGrantedCount}
                  </Statistic.Value>
                </Statistic>
              </Card.Content>
            </Card>
          </Card.Group>

          <Segment padded>
            <h3 style={{ textAlign: "center" }}>
              Số lượng bệnh nhân so với bác sĩ năm 2023
            </h3>
            <ResponsiveContainer width="100%" aspect={3}>
              <AreaChart
                width={500}
                height={300}
                data={chart.data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient
                    id="colorPatients"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDoctors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#89cff0" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#89cff0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="Name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Bác sĩ"
                  stroke="#89cff0"
                  fillOpacity={1}
                  fill="url(#colorDoctors)"
                />
                <Area
                  type="monotone"
                  dataKey="Bệnh nhân"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorPatients)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Segment>
        </>
      </Layout>
    </div>
  );
};

export default Dashboard;
