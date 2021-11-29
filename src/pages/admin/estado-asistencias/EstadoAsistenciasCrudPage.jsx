import {
  Table,
  Row,
  Col,
  message,
  Popconfirm,
  Space,
  Modal,
  notification,
  PageHeader,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import Search from "antd/lib/input/Search";
import { useEffect, useState } from "react";
import {
  CreateIcon,
  DeleteIcon,
  DeletePopop,
  EditIcon,
} from "../../../components/svg/IconSvg";
import { AdminAPI } from "../../../services/api";
import history from "../../../utils/history";
import NewOrEditEstadoAsistenciasForm from "./NewOrEditEstadoAsistenciasForm";

const initialRequest = {
  nombre: "",
  pageNumber: 1,
  pageSize: 6,
};

const EstadoAsistenciasCrudPage = () => {
  const [form] = useForm();
  const [visibleModal, setVisibleModal] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [request, setRequest] = useState(initialRequest);
  const [detailId, setDetailId] = useState("");
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

  useEffect(() => {
    (async () => {
      try {
        setLoadingTable(true);
        const resp = await AdminAPI.listEstadoAsistencias(request);
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
      const resp = await AdminAPI.deleteLogEstadoAsistencias(
        item.estadoAsistenciaId
      );
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
    setDetailId(item.estadoAsistenciaId);
    form.setFields([
      {
        name: "nombre",
        value: item.nombre,
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
      if (detailId === "") resp = await AdminAPI.createEstadoAsistencias(value);
      else resp = await AdminAPI.editEstadoAsistencias(detailId, value);
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
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    {
      title: "Acciones",
      key: "acciones",
      render: (item) => (
        <Space>
          <EditIcon
            style={{ cursor: "pointer" }}
            onClick={() => openModalEdit(item)}
          />
          <Popconfirm
            placement="right"
            title="¿Eliminar estado?"
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
        title="Estados Asistencia"
        subTitle="admin"
      />
      <Row align="middle" justify="center" style={{ marginBottom: "10px" }}>
        <Col xxl={10} xl={18} lg={18} md={18} sm={18} xs={24}>
          <Search
            placeholder="estado..."
            onSearch={onSearch}
            enterButton="buscar"
          />
        </Col>
      </Row>
      <Row align="middle" justify="center">
        <Col xxl={12} xl={20} lg={20} md={22} sm={24} xs={24}>
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
            rowKey="estadoAsistenciaId"
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
        title={detailId === "" ? "Crear estado" : "Editar estado"}
        onOk={handleOnSubmit}
        onCancel={handleCancel}
        footer={null}
      >
        <NewOrEditEstadoAsistenciasForm
          handleOnSubmit={handleOnSubmit}
          loadingButton={loadingButton}
          form={form}
        />
      </Modal>
    </>
  );
};

export default EstadoAsistenciasCrudPage;
