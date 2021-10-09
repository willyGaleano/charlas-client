import { Table, Tag, Row, Col } from "antd";
import Search from "antd/lib/input/Search";

const MisCharlasPage = () => {
  const expandedRowRender = () =>
    `Descripción Descripción Descripción Descripción Descripción 
    Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción`;

  const columns = [
    { title: "Charla", dataIndex: "name", key: "name" },
    { title: "Fecha", dataIndex: "platform", key: "platform" },
    { title: "Duración", dataIndex: "version", key: "version" },
    {
      title: "Estado",
      key: "upgradeNumss",
      render: () => <Tag color="red">red</Tag>,
    },
    {
      title: "Asistencia",
      key: "upgradeNum",
      render: () => <Tag color="red">red</Tag>,
    },
  ];

  const data = [];
  for (let i = 0; i < 20; ++i) {
    data.push({
      key: i,
      name: "Screem",
      platform: "iOS",
      version: "10.3.4.5654",
      upgradeNum: 500,
    });
  }

  return (
    <>
      <Row align="middle" justify="center" style={{ marginBottom: "10px" }}>
        <Col xxl={12} xl={18} lg={20} md={18} sm={22} xs={20}>
          <Search
            placeholder="buscar charla"
            //onSearch={onSearch}
          />
        </Col>
      </Row>
      <Row align="middle" justify="center">
        <Col xxl={16} xl={20} lg={20} md={18} sm={22} xs={20}>
          <Table
            className="components-table-demo-nested"
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={data}
            scroll={{ x: 650 }}
          />
        </Col>
      </Row>
    </>
  );
};

export default MisCharlasPage;
