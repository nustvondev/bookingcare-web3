import React from "react";
import Layout from "../layouts/Layout";
import { Button, Container, Header } from "semantic-ui-react";

const HomePage = () => {
  return (
    <div>
      <Layout>
        <Container>
          <Header size="huge" as="h1" className="centered">
            Hello, world!
          </Header>

          <p>
            Ứng dụng quản lý bệnh án bằng blockchain smart contract là một giải
            pháp hiện đại và an toàn, giúp tăng cường quản lý thông tin sức khỏe
            cá nhân. Sự kết hợp giữa blockchain và smart contract giúp đảm bảo
            tính bảo mật và minh bạch trong việc lưu trữ và chia sẻ dữ liệu y
            tế.
          </p>

          <p>
            Trong hệ thống này, mỗi bệnh án được lưu trữ dưới dạng các khối dữ
            liệu (blocks) trên chuỗi khối (blockchain). Mỗi khối chứa thông tin
            về lịch sử bệnh án, kết quả xét nghiệm, và các thông tin y tế quan
            trọng khác. Điều đặc biệt là smart contract được sử dụng để quản lý
            quyền truy cập vào thông tin, đồng thời xác nhận tính xác thực của
            dữ liệu.
          </p>

          <p>
            Nhờ vào tính chất phi tập trung của blockchain, dữ liệu y tế không
            chỉ được lưu trữ an toàn mà còn trở nên dễ dàng quản lý và chia sẻ
            giữa các bác sĩ, bệnh viện và bệnh nhân. Smart contract tự động thực
            hiện các quy trình như cập nhật thông tin, xác minh danh tính, và
            quản lý quyền truy cập, giảm thiểu rủi ro về sai sót hoặc lạm dụng
            thông tin.
          </p>

          <p>
            Với ứng dụng này, bệnh nhân có thể kiểm soát quyền truy cập vào dữ
            liệu cá nhân của mình và chia sẻ chúng một cách linh hoạt, trong khi
            các nhà y tế có thể dễ dàng tiếp cận thông tin cần thiết để đảm bảo
            chăm sóc y tế chất lượng và hiệu quả. Đồng thời, tính minh bạch của
            hệ thống giúp ngăn chặn gian lận thông tin và tăng cường sự tin
            tưởng từ cả bác sĩ và bệnh nhân.
          </p>
          <Button size="large" primary>
            Tìm hiểu ngay
          </Button>
        </Container>
      </Layout>
    </div>
  );
};

export default HomePage;
