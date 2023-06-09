import { BellFilled, UserSwitchOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { getData } from "../../API";


function AppHeader() {
  const [data, setData] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getData().then((res) => {
      setData(res.data);
      setFilteredData(res.data.filter((item) => item.category === 'caida'));
    });
  }, []);

  return (
    <div className="AppHeader">
      <Image src='../../../public/logo2.jpg' />
      <Space>
        <Badge count={filteredData.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
        <Badge>
          <UserSwitchOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
            }}
          />
        </Badge>
      </Space>
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={data}
          renderItem={(item) => {
            if (item.category === 'caida') {
              return (
                <List.Item>
                  <Typography.Text strong>Registro de Evento de posible caida </Typography.Text> para el nodo {item.node_id} (ID : {item.id}) el {item.creationDate}
                </List.Item>
              );
            } else {
              return null; // No hacer nada si no es la categoría de caída
            }
          }}
        ></List>
      </Drawer>
    </div>
  );
}
export default AppHeader;
