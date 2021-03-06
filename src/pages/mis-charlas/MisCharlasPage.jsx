import {
  Table,
  Tag,
  Row,
  Col,
  Image,
  Popconfirm,
  message,
  Tooltip,
  Modal,
  Typography,
} from "antd";
import Search from "antd/lib/input/Search";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CancelIcon,
  CancelPopop,
  DisabledIcon,
  HeartIcon,
  HeartPopop,
  QRIcon,
  QRPopop,
} from "../../components/svg/IconSvg";
import QRCode from "qrcode";
import { MisEventosAPI } from "../../services/api";

const { Link } = Typography;

const MisCharlasPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [request, setRequest] = useState({
    nombre: "",
    userId: user.id,
    pageNumber: 1,
    pageSize: 6,
  });
  const [loadingTable, setLoadingTable] = useState(false);
  const [respPaginated, setRespPaginated] = useState({
    pageNumber: 1,
    pageSize: 6,
    total: 1,
    succeeded: false,
    message: "",
    errors: null,
    data: [],
  });

  const generateQrCode = async (asistenciaId, nombreCharla) => {
    const response = await QRCode.toDataURL(`${user.id}#${asistenciaId}`);

    Modal.info({
      title: "Descargue su QR",
      content: (
        <Link href={response} download={nombreCharla}>
          <Image preview={false} src={response} alt="qr" />
        </Link>
      ),
      onOk() {},
    });
  };

  const columns = [
    {
      title: "Portada",
      dataIndex: "urlImage",
      key: "urlImage",
      render: (item) => <Image src={item} width={70} preview={false} />,
    },
    { title: "Charla", dataIndex: "nombreCharla", key: "nombreCharla" },
    { title: "Fecha inicio", dataIndex: "fechaIni", key: "fechaIni" },
    { title: "Duración(h)", dataIndex: "duracion", key: "duracion" },
    {
      title: "QR",
      key: "qr",
      render: (item) =>
        item.nombreEstadoEvento !== "Finalizado" ? (
          <Popconfirm
            placement="topLeft"
            title="Generar código QR"
            icon={<QRPopop />}
            onConfirm={() =>
              generateQrCode(item.asistenciaId, item.nombreCharla)
            }
            okText="Sí"
            cancelText="No"
          >
            <QRIcon style={{ cursor: "pointer" }} />
          </Popconfirm>
        ) : (
          <DisabledIcon />
        ),
    },
    {
      title: "Estado",
      dataIndex: "nombreEstadoAsistencia",
      key: "nombreEstadoAsistencia",
      render: (item) => <Tag color="geekblue">{item.toUpperCase()}</Tag>,
    },
    {
      title: "Cancelar",
      key: "cancelar",
      render: (item) =>
        item.nombreEstadoEvento.toUpperCase() === "FINALIZADO" ? (
          <Tooltip title={"Charla " + item.nombreEstadoEvento}>
            <DisabledIcon />
          </Tooltip>
        ) : (
          <Popconfirm
            placement="top"
            title="¿Cancelar evento?"
            icon={<CancelPopop />}
            onConfirm={() => handleCancelCharla(item.asistenciaId)}
            okText="Sí"
            cancelText="No"
          >
            <CancelIcon />
          </Popconfirm>
        ),
    },
  ];
  useEffect(() => {
    (async () => {
      try {
        setLoadingTable(true);
        const resp = await MisEventosAPI.listMisEventos(request);
        if (resp.succeeded) setRespPaginated(resp);
        else message.error(resp.message);
        setLoadingTable(false);
      } catch (error) {
        setLoadingTable(false);
        message.error(error.message);
      }
    })();
  }, [request]);

  const handleCancelCharla = async (asistenciaId) => {
    try {
      setLoadingTable(true);
      const resp = await MisEventosAPI.cancelarEvento(asistenciaId);
      if (resp.succeeded) {
        setRequest((prevState) => ({ ...prevState }));
        message.success(resp.message);
      } else message.error(resp.message);
      setLoadingTable(false);
    } catch (error) {
      setLoadingTable(false);
      message.error(error.message);
    }
  };

  const onPaginatedChange = (page) => {
    setRequest((prevState) => ({
      ...prevState,
      pageNumber: page,
    }));
  };
  const onSearch = (value) => {
    setRequest((prev) => ({ ...prev, nombre: value }));
  };
  return (
    <>
      <Row align="middle" justify="center" style={{ marginBottom: "10px" }}>
        <Col xxl={12} xl={18} lg={18} md={18} sm={18} xs={24}>
          <Search
            placeholder="charla..."
            onSearch={onSearch}
            enterButton="buscar"
          />
        </Col>
      </Row>
      <Row align="middle" justify="center">
        <Col xxl={16} xl={20} lg={20} md={22} sm={24} xs={24}>
          <Table
            rowKey="asistenciaId"
            loading={loadingTable}
            columns={columns}
            dataSource={respPaginated.data}
            scroll={{ x: 650 }}
            pagination={{
              total: respPaginated?.total,
              pageSize: respPaginated.pageSize,
              current: respPaginated.pageNumber,
              onChange: onPaginatedChange,
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default MisCharlasPage;
