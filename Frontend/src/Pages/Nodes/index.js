import { Form, Input, Button, Space, Table, Typography, Switch } from "antd";
import { useEffect, useState } from "react";
import { getData, getOrders, getAllNode, postDataNode } from "../../API";

const { Item } = Form;

function Nodes() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllNode().then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  }, []);

  const handleCreate = (values) => {
    const { nombre, estado, ubicacion } = values;

    const data = {
      name: nombre,
      state: estado,
      location: ubicacion,
    };

    postDataNode(data)
      .then((res) => {
        console.log("POST request successful:", res);
        getAllNode().then((res) => {
          setDataSource(res.data);
        });
        // Realiza cualquier acción adicional después de crear el nodo exitosamente
      })
      .catch((error) => {
        console.error("Error in POST request:", error);
        // Maneja el error de alguna manera apropiada en tu aplicación
      });
  };

return (
  <Space size={20} direction="vertical">
    <Typography.Title level={4}>Page / Nodos</Typography.Title>
    <Table
        loading={loading}
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
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    <Typography.Title level={4}>Crear Nodo</Typography.Title>
    <Form onFinish={handleCreate}>
      <Item
        label="Nombre"
        name="nombre"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el nombre",
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        label="Estado"
        name="estado"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el estado",
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        label="Ubicación"
        name="ubicacion"
        rules={[
          {
            required: true,
            message: "Por favor ingrese la ubicación",
          },
        ]}
      >
        <Input />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          Crear
        </Button>
      </Item>
    </Form>
  </Space>
);
}

export default Nodes;
