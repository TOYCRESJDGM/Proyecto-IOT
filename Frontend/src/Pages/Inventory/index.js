import { Space, Table, Typography, Select  } from "antd";
import { useEffect, useState } from "react";
import { getData, getAllNode, getDataNode } from "../../API";

const { Option } = Select;

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeOptions, setNodeOptions] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (selectedNode) {
      getDataNode(selectedNode).then((res) => {
        setDataSource(res.data);
        setLoading(false);
      });
    } else {
      getData().then((res) => {
        setDataSource(res.data);
        setLoading(false);
      });
    }
  }, [selectedNode]);

  useEffect(() => {
    getAllNode().then((res) => {
      const options = res.data.map((node) => (
        <Option key={node.id} value={node.id}>
          {node.id}
        </Option>
      ));
      setNodeOptions(options);
    });
  }, []);

  const handleNodeChange = (value) => {
    setSelectedNode(value);
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={3}>Page / Data</Typography.Title>
      <Select
        style={{ width: 20 }}
        placeholder="Seleccionar nodo"
        onChange={handleNodeChange}
        allowClear
      >
        {nodeOptions}
      </Select>
      <Table
        loading={loading}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Aceleración en X",
            dataIndex: "ac_x",
          },
          {
            title: "Aceleración en Y",
            dataIndex: "ac_y",
          },
          {
            title: "Aceleración en Z",
            dataIndex: "ac_z",
          },
          {
            title: "Rotación en X",
            dataIndex: "rot_x",
          },
          {
            title: "Rotación en Y",
            dataIndex: "rot_y",
          },
          {
            title: "Rotación en Z",
            dataIndex: "rot_z",
          },
          {
            title: "Temperatura",
            dataIndex: "temperature",
          },
          {
            title: "Categoría",
            dataIndex: "category",
          },
          {
            title: "ID nodo",
            dataIndex: "node_id",
          },
          {
            title: "Fecha",
            dataIndex: "creationDate",
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 10,
        }}
      ></Table>
    </Space>
  );
}
export default Inventory;
