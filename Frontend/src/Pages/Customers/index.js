import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getUsers, getData } from "../../API";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getUsers().then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={3}>Page / Customers</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Photo",
            dataIndex: "image",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Nombre",
            dataIndex: "userName",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Rol",
            dataIndex: "rol",
          },
          {
            title: "Telefono",
            dataIndex: "phone",
            render: (phone) => {
              return '+' + phone;
            },
          },
          {
            title: "Fecha",
            dataIndex: "creationDate",
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Customers;
