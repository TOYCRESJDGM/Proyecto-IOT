import {
  DollarCircleOutlined,
  AimOutlined,
  ContainerOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography, Switch } from "antd";
import { useEffect, useState } from "react";
import { getData, getOrders, getRevenue, getAllNode, getUsers } from "../../API";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [nodes, setNode] = useState(0);
  const [data, setData] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getAllNode().then((res) => {
      setNode(res.total);
      setRevenue(res.discountedTotal);
    });
    getData().then((res) => {
      setData(res.total);
    });
    getUsers().then((res) => {
      setCustomers(res.total);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={3}>Page / Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <AimOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Nodos"}
          value={nodes}
        />
        <DashboardCard
          icon={
            <ContainerOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Data"}
          value={data}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Customer"}
          value={customers}
        />
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Revenue"}
          value={revenue}
        />
      </Space>
      <Space direction="vertical">
      <Space>
          <RecentUsers />
          <RecentNodes />
        </Space>
        <DashboardChart />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentUsers() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsers().then((res) => {
      const sorted = res.data.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
      setDataSource(sorted.slice(0,10));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Title level={4}>Usuarios Recientes</Typography.Title>
      <Table
        columns={[
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
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function RecentNodes() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllNode().then((res) => {
      const sorted = res.data.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
      setDataSource(sorted.slice(0,10));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Title level={4}>Nodos Recientes</Typography.Title>
      <Table
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Nombre",
            dataIndex: "name",
          },
          {
            title: "Ubicación",
            dataIndex: "location",
          },
          {
            title: "Usuario ID",
            dataIndex: "id_user",
            
          },
          {
            title: "Fecha",
            dataIndex: "creationDate",
          },
          {
            title: "Estado",
            dataIndex: "state",
            render: (state) => {
              const isChecked = state === 'habilitado';
              return <Switch checked={isChecked} />;
            },
          },
          {
            title: "Status",
            dataIndex: "state",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function DashboardChart() {
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getData().then((res) => {
      let recordsByCategory = {};
      const categories = new Set();
      res.data.forEach((item) => {
        const { category } = item;
        categories.add(category);
      });
      const labels = Array.from(categories);
      res.data.forEach((item) => {
        const { category } = item;
        if (recordsByCategory[category]) {
          recordsByCategory[category]++;
        } else {
          recordsByCategory[category] = 1;
        }
      });

      console.log(recordsByCategory)

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Categoría",
            data: recordsByCategory,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };

      setReveneuData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "DATOS POR CATEGORIA",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={reveneuData} />
    </Card>
  );
}
export default Dashboard;
