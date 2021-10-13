import { Row, Col, Tabs, Grid } from "antd";
import CharlasCrudPage from "./charlas/CharlasCrudPage";
import EstadosCrudPage from "./estados/EstadosCrudPage";
import EventosCrudPage from "./evento/EventosCrudPage";
import UsersCrudPage from "./users/UsersCrudPage";
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

const AdminPage = () => {
  const screen = useBreakpoint();
  return (
    <>
      <Row align="middle" justify="center" style={{ marginBottom: "10px" }}>
        <Col xxl={12} xl={18} lg={20} md={18} sm={22} xs={20}></Col>
      </Row>
      <Row align="middle" justify="center">
        <Col xxl={24} xl={20} lg={20} md={24} sm={22} xs={20}>
          <Tabs
            defaultActiveKey="1"
            centered
            tabPosition={screen.xl ? "left" : "top"}
          >
            <TabPane tab="Charlas" key="1">
              <CharlasCrudPage />
            </TabPane>
            <TabPane tab="Eventos" key="2">
              <EventosCrudPage />
            </TabPane>
            <TabPane tab="Estados" key="3">
              <EstadosCrudPage />
            </TabPane>
            <TabPane tab="Users" key="4">
              <UsersCrudPage />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default AdminPage;
