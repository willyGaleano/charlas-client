import { Row, Col, Grid, PageHeader, Card, Avatar } from "antd";

import { Link, useRouteMatch } from "react-router-dom";
import Meta from "antd/lib/card/Meta";
import {
  CharlaIcon,
  CharlaIconPortada,
  EstadoIcon,
  EstadoIconPortada,
  EventoIcon,
  EventoIconPortada,
  UsuarioIcon,
  UsuarioIconPortada,
} from "../../components/svg/IconSvg";

const { useBreakpoint } = Grid;

const AdminPage = () => {
  const { url } = useRouteMatch();
  const screens = useBreakpoint();

  return (
    <>
      <PageHeader
        onBack={() => null}
        title={!screens.md ? "EAPP ADMIN" : "EVENTOS APP ADMIN"}
        subTitle={!screens.md ? "" : "EAPP"}
      />
      <Row
        justify="center"
        style={{ background: "#fafafa", paddingBottom: 20 }}
      >
        <Col span={22}>
          <Row
            gutter={[16, 16]}
            justify="center"
            style={{ marginTop: "20px", marginBottom: "10px" }}
          >
            <Col xxl={8} xl={8} lg={12} md={12} sm={20} xs={24}>
              <Link to={`${url}/charlas`}>
                <Card
                  hoverable
                  cover={<CharlaIconPortada style={{ marginTop: 10 }} />}
                  style={{
                    borderBottom: "2px solid",
                    borderBottomColor: "#002766",
                  }}
                >
                  <Meta
                    avatar={<Avatar icon={<CharlaIcon />} />}
                    title="Charlas"
                    description="Listado de charlas"
                  />
                </Card>
              </Link>
            </Col>
            <Col xxl={8} xl={8} lg={12} md={12} sm={20} xs={24}>
              <Link to={`${url}/eventos`}>
                <Card
                  hoverable
                  cover={<EventoIconPortada style={{ marginTop: 10 }} />}
                  style={{
                    borderBottom: "2px solid",
                    borderBottomColor: "#002766",
                  }}
                >
                  <Meta
                    avatar={<Avatar icon={<EventoIcon />} />}
                    title="Eventos"
                    description="Listado de eventos"
                  />
                </Card>
              </Link>
            </Col>
            <Col xxl={8} xl={8} lg={12} md={12} sm={20} xs={24}>
              <Link to={`${url}/estado-asistencias`}>
                <Card
                  hoverable
                  cover={<EstadoIconPortada style={{ marginTop: 10 }} />}
                  style={{
                    borderBottom: "2px solid",
                    borderBottomColor: "#002766",
                  }}
                >
                  <Meta
                    avatar={<Avatar icon={<EstadoIcon />} />}
                    title="Estado-Asistencias"
                    description="Listado de estado de asistencias"
                  />
                </Card>
              </Link>
            </Col>
            <Col xxl={8} xl={8} lg={12} md={12} sm={20} xs={24}>
              <Link to={`${url}/estado-eventos`}>
                <Card
                  hoverable
                  cover={<EstadoIconPortada style={{ marginTop: 10 }} />}
                  style={{
                    borderBottom: "2px solid",
                    borderBottomColor: "#002766",
                  }}
                >
                  <Meta
                    avatar={<Avatar icon={<EstadoIcon />} />}
                    title="Estado-Eventos"
                    description="Listado de estado de eventos"
                  />
                </Card>
              </Link>
            </Col>
            <Col xxl={8} xl={8} lg={12} md={12} sm={20} xs={24}>
              <Link to={`${url}/usuarios`}>
                <Card
                  hoverable
                  cover={<UsuarioIconPortada style={{ marginTop: 10 }} />}
                  style={{
                    borderBottom: "2px solid",
                    borderBottomColor: "#002766",
                  }}
                >
                  <Meta
                    avatar={<Avatar icon={<UsuarioIcon />} />}
                    title="Usuarios"
                    description="Listado de usuarios"
                  />
                </Card>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default AdminPage;
