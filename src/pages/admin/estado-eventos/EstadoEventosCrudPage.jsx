import {
  Table,
  Row,
  Col,
  message,
  Popconfirm,
  Space,
  Modal,
  notification,
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
import NewOrEditEstadoEventos from "./NewOrEditEstadoEventos";

const initialRequest = {
  nombre: "",
  pageNumber: 1,
  pageSize: 3,
};

const EstadoEventosCrudPage = () => {
  const [form] = useForm();
  const [visibleModal, setVisibleModal] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [request, setRequest] = useState(initialRequest);
  const [detailId, setDetailId] = useState("");
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
  const [colorState, setColorState] = useState("#fff");

  useEffect(() => {
    (async () => {
      try {
        setLoadingTable(true);
        const resp = await AdminAPI.listEstadoEventos(request);
        if (resp.succeeded) setRespPaginated(resp);
        else message.error(resp.message);
        setLoadingTable(false);
      } catch (error) {
        setLoadingTable(false);
        message.error(error.message);
      }
    })();
  }, [request]);

  const handleChangeColor = (color, event) => {
    // color = {
    //   hex: '#333',
    //   rgb: {
    //     r: 51,
    //     g: 51,
    //     b: 51,
    //     a: 1,
    //   },
    //   hsl: {
    //     h: 0,
    //     s: 0,
    //     l: .20,
    //     a: 1,
    //   },
    // }

    setColorState(color.hex);
  };

  const handleDelete = async (item) => {
    try {
      setLoadingTable(true);
      const resp = await AdminAPI.deleteLogEstadoEventos(item.estadoEventoId);
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
    setDetailId(item.estadoEventoId);
    form.setFields([
      {
        name: "nombre",
        value: item.nombre,
      },
    ]);
    setColorState(item.color);

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
      if (detailId === "") resp = await AdminAPI.createEstadoEventos(value);
      else resp = await AdminAPI.editEstadoEventos(detailId, value);
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
    setColorState("#fff");
    setVisibleModal(true);
  };

  const columns = [
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (item) => (
        <div style={{ width: 60, height: 20, background: `${item}` }}></div>
      ),
    },
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

  return (
    <>
      <Row align="middle" justify="center" style={{ marginBottom: "10px" }}>
        <Col xxl={12} xl={18} lg={20} md={18} sm={22} xs={20}>
          <Search
            placeholder="buscar estado"
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
            <CreateIcon
              onClick={openModalCreate}
              style={{ cursor: "pointer", paddingBottom: 5 }}
            />
          </div>
          <Table
            loading={loadingTable}
            rowKey="estadoEventoId"
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
        <NewOrEditEstadoEventos
          handleOnSubmit={handleOnSubmit}
          loadingButton={loadingButton}
          form={form}
          colorState={colorState}
          handleChangeColor={handleChangeColor}
        />
      </Modal>
    </>
  );
};

export default EstadoEventosCrudPage;
