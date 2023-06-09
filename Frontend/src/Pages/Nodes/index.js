import { Form, Input, Button, Space, Table, Typography, Switch, Select } from "antd";
import { useEffect, useState } from "react";
import { getAllNode, postDataNode, putDataNode } from "../../API";

const { Item } = Form;
const { Option } = Select;

function Nodes() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

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

  const handleUpdate = (values) => {
    const { idNodo, nombreNodo, estadoNodo, ubicacionNodo, userNodo } = values;

    const data = {
      name: nombreNodo,
      state: estadoNodo,
      location: ubicacionNodo,
      iduser: userNodo || null
    };

    putDataNode(idNodo,data)
      .then((res) => {
        console.log("PUT request successful:", res);
        getAllNode().then((res) => {
          setDataSource(res.data);
        });
        // Realiza cualquier acción adicional después de crear el nodo exitosamente
      })
      .catch((error) => {
        console.error("Error in PUT request:", error);
        // Maneja el error de alguna manera apropiada en tu aplicación
      });
  };

  const handleNodeSelect = (value) => {
    const selected = dataSource.find((node) => node.id === value);
    setSelectedNode(selected);
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={3}>Page / Node</Typography.Title>
      <Space size={120} direction="horizontal">
        <div style={{ flex: 5 }}>
          <Typography.Title level={3}>Actualizar Nodo</Typography.Title>
          <Form onFinish={handleUpdate} initialValues={selectedNode}>
            {/* Campos de actualización */}
            <Item
              label="ID del Nodo"
              name="idNodo"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione el ID del nodo",
                },
              ]}
            >
              <Select onChange={handleNodeSelect}>
                {dataSource.map((node) => (
                  <Option key={node.id} value={node.id}>
                    {node.id}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item
              label="Nombre"
              name="nombreNodo"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el nombre del nodo",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="Estado"
              name="estadoNodo"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el estado del nodo",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="Ubicación"
              name="ubicacionNodo"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese la ubicación del nodo",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="Usuario"
              name="userNodo"
            >
              <Input />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">
                Actualizar
              </Button>
            </Item>
          </Form>
        </div>
        <div style={{ flex: 5 }}>
          <Typography.Title level={3}>Crear Nodo</Typography.Title>
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
        </div>
      </Space>
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
    </Space>
  );
}

export default Nodes;
