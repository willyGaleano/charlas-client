import { Table, Tag, Row, Col, message, Popconfirm, Space } from "antd";
import Search from "antd/lib/input/Search";
import { useEffect, useState } from "react";
import {
  CreateIcon,
  DeleteIcon,
  DeletePopop,
  EditIcon,
} from "../../../components/svg/IconSvg";
import { AdminAPI } from "../../../services/api";

const initialRequest = {
  nombre: "",
  pageNumber: 1,
  pageSize: 3,
};

const EstadosCrudPage = () => {
  const [request, setRequest] = useState(initialRequest);
  const [loadingTable, setLoadingTable] = useState(false);
  const [respPaginated, setRespPaginated] = useState({
    pageNumber: 1,
    pageSize: 3,
    total: 1,
    succeeded: false,
    message: "",
    errors: null,
    data: [],
  });

  useEffect(() => {
    (async () => {
      try {
        setLoadingTable(true);
        const resp = await AdminAPI.listCharlaEvento(request);
        if (resp.succeeded) setRespPaginated(resp);
        else message.error(resp.message);
        setLoadingTable(false);
      } catch (error) {
        setLoadingTable(false);
        message.error(error.message);
      }
    })();
  }, [request]);

  const columns = [
    { title: "Charla", dataIndex: "nombreCharla", key: "nombreCharla" },
    { title: "Fecha Inicio", dataIndex: "fechaIni", key: "fechaIni" },
    { title: "Duración(h)", dataIndex: "duracion", key: "duracion" },
    { title: "Aforo", dataIndex: "aforo", key: "aforo" },
    {
      title: "Estado",
      dataIndex: "nombreEstado",
      key: "estado",
      render: (item) => <Tag color="geekblue">{item.toUpperCase()}</Tag>,
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (item) => (
        <Space>
          <EditIcon
            style={{ cursor: "pointer" }}
            onClick={() => console.log(item)}
          />
          <Popconfirm
            placement="right"
            title="¿Eliminar evento?"
            icon={<DeletePopop />}
            onConfirm={() => console.log(item)}
            okText="Sí"
            cancelText="No"
          >
            <DeleteIcon />
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
        <Col xxl={18} xl={20} lg={20} md={18} sm={22} xs={20}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <CreateIcon style={{ cursor: "pointer", paddingBottom: 5 }} />
          </div>
          <Table
            rowKey="charlaEventoId"
            loading={loadingTable}
            columns={columns}
            dataSource={respPaginated?.data}
            scroll={{ x: 650 }}
          />
        </Col>
      </Row>
    </>
  );
};

export default EstadosCrudPage;
