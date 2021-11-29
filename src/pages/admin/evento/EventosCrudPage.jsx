import {
  Table,
  Tag,
  Row,
  Col,
  message,
  Popconfirm,
  Space,
  Tooltip,
  Modal,
  notification,
  PageHeader,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import Search from "antd/lib/input/Search";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  CreateIcon,
  DeleteIcon,
  DeletePopop,
  DisabledIcon,
  EditIcon,
} from "../../../components/svg/IconSvg";
import { AdminAPI } from "../../../services/api";
import history from "../../../utils/history";
import NewOrEditEventoForm from "./NewOrEditEventoForm";

const initialRequest = {
  nombre: "",
  pageNumber: 1,
  pageSize: 6,
  isAdmin: true,
};

const EventosCrudPage = () => {
  const [form] = useForm();
  const [visibleModal, setVisibleModal] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [request, setRequest] = useState(initialRequest);
  const [detailId, setDetailId] = useState("");
  const [loadingTable, setLoadingTable] = useState(false);
  const [respCharlasForm, setRespCharlasForm] = useState([]);
  const [respPaginated, setRespPaginated] = useState({
    pageNumber: 1,
    pageSize: 6,
    total: 1,
    succeeded: false,
    message: "",
    errors: null,
    data: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const resp = await AdminAPI.listCharlaForm();
        if (resp.succeeded) setRespCharlasForm(resp.data);
        else message.error(resp.message);
      } catch (error) {
        message.error(error.message);
      }
    })();
  }, []);

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

  const handleDelete = async (item) => {
    try {
      setLoadingTable(true);
      const resp = await AdminAPI.deleteLogEvento(item.eventoId);
      if (resp.succeeded) {
        message.success(resp.message);
        setRequest((prevState) => ({ ...prevState }));
      } else message.error(resp.message);
      setLoadingTable(false);
    } catch (error) {
      setLoadingTable(false);
      message.error(error.message);
    }
  };

  const openModalEdit = (item) => {
    setDetailId(item.eventoId);
    form.setFields([
      {
        name: "fechaIni",
        value: moment(item.fechaIni),
      },
      {
        name: "duracion",
        value: item.duracion,
      },
      {
        name: "aforo",
        value: item.aforo,
      },
      {
        name: "charlaId",
        value: item.charlaId,
      },
    ]);

    setVisibleModal(true);
  };

  const onPaginatedChange = (page) => {
    setRequest((prevState) => ({
      ...prevState,
      pageNumber: page,
    }));
  };

  const handleOnSubmit = async (value) => {
    console.log("Form: ", value);
    try {
      setLoadingButton(true);
      let resp;
      if (detailId === "") resp = await AdminAPI.createEvento(value);
      else resp = await AdminAPI.editarEvento(detailId, value);

      if (resp.succeeded) {
        handleCancel();
        setLoadingButton(false);
        message.success(resp.message);
        setRequest((prevState) => ({ ...prevState }));
      } else {
        setLoadingButton(false);
        notification.error({
          message: "Error! :c",
          description: resp.message,
        });
      }
    } catch (error) {
      handleCancel();
      setLoadingButton(false);
      notification.error({
        message: "Error! :c",
        description: error.message,
      });
    }
  };
  const handleCancel = () => {
    form.resetFields();
    setDetailId("");
    setVisibleModal(false);
  };

  const openModalCreate = () => {
    form.resetFields();
    setDetailId("");
    setVisibleModal(true);
  };

  const columns = [
    { title: "Charla", dataIndex: "nombreCharla", key: "nombreCharla" },
    { title: "Fecha Inicio", dataIndex: "fechaIni", key: "fechaIni" },
    { title: "Duración(h)", dataIndex: "duracion", key: "duracion" },
    { title: "Aforo", dataIndex: "aforo", key: "aforo" },
    {
      title: "Estado",
      dataIndex: "nombreEstadoEvento",
      key: "nombreEstadoEvento",
      render: (item) => <Tag color="geekblue">{item.toUpperCase()}</Tag>,
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (item) =>
        item.nombreEstadoEvento.toUpperCase() === "FINALIZADO" ? (
          <Tooltip title={"Charla " + item.nombreEstadoEvento}>
            <DisabledIcon />
          </Tooltip>
        ) : (
          <Space>
            <EditIcon
              style={{ cursor: "pointer" }}
              onClick={() => openModalEdit(item)}
            />
            <Popconfirm
              placement="right"
              title="¿Eliminar evento?"
              icon={<DeletePopop />}
              onConfirm={() => handleDelete(item)}
              okText="Sí"
              cancelText="No"
            >
              <DeleteIcon />
            </Popconfirm>
          </Space>
        ),
    },
  ];

  const onSearch = (value) => {
    setRequest((prev) => ({ ...prev, nombre: value }));
  };

  return (
    <>
      <PageHeader
        onBack={() => history.goBack()}
        title="Eventos"
        subTitle="admin"
      />
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
        <Col xxl={18} xl={20} lg={20} md={22} sm={24} xs={24}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <CreateIcon
              onClick={openModalCreate}
              style={{ cursor: "pointer", paddingBottom: 5 }}
            />
          </div>
          <Table
            loading={loadingTable}
            rowKey="charlaId"
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

      <Modal
        visible={visibleModal}
        title={detailId === "" ? "Crear evento" : "Editar evento"}
        onOk={handleOnSubmit}
        onCancel={handleCancel}
        footer={null}
      >
        <NewOrEditEventoForm
          handleOnSubmit={handleOnSubmit}
          loadingButton={loadingButton}
          respCharlasForm={respCharlasForm}
          form={form}
        />
      </Modal>
    </>
  );
};

export default EventosCrudPage;
