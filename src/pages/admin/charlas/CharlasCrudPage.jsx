import {
  Table,
  Image,
  Row,
  Col,
  Modal,
  Space,
  Popconfirm,
  message,
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

import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import NewOrEditCharlaForm from "./NewOrEditCharlaForm";
import AdminPage from "../AdminPage";

const initialRequest = {
  nombre: "",
  pageNumber: 1,
  pageSize: 10,
};

const CharlasCrudPage = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [request, setRequest] = useState(initialRequest);
  const [imgUrl, setImgUrl] = useState("");
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

  const [form] = useForm();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:48948/notify")
      .configureLogging(LogLevel.Information)
      .build();

    connection
      .start()
      .then((response) => console.log("Se conecto al hub"))
      .catch((error) => console.log(error.toString()));

    connection.on("BroadcastMessage", async () => {
      await getAllCharlas();
    });
    return () => {
      console.log("Se desconectó");
      connection.stop();
    };
  }, []);

  const getAllCharlas = async () => {
    try {
      setLoadingTable(true);
      const resp = await AdminAPI.listCharla(request);
      console.log(resp);
      if (resp.succeeded) setRespPaginated(resp);
      else message.error(resp.message);
      setLoadingTable(false);
    } catch (error) {
      setLoadingTable(false);
      message.error(error.message);
    }
  };

  useEffect(() => {
    //(async () => {})();
    getAllCharlas();
  }, [request]);

  const handleOk = async (value) => {
    let formData = new FormData();
    try {
      setLoading(true);
      formData.append("NombreCharla", value.nombre);
      formData.append("DescripcionCharla", value.descripcion);
      value.image === undefined
        ? formData.append("File", null)
        : formData.append("File", value.image[0]);

      let resp;
      if (detailId === "") resp = await AdminAPI.sendCharlaMedia(formData);
      else {
        const newFormData = {
          id: detailId,
          form: formData,
        };
        resp = await AdminAPI.editCharlaMedia(newFormData);
      }

      if (resp.succeeded) {
        handleCancel();
        setLoading(false);
        message.success(resp.message);
        //setRequest((prevState) => ({ ...prevState }));
      } else {
        setLoading(false);
        notification.error({
          message: "Error! :c",
          description: resp.message,
        });
      }
    } catch (error) {
      handleCancel();
      setLoading(false);
      notification.error({
        message: "Error! :c",
        description: error.message,
      });
    }
  };

  const handleDelete = async (item) => {
    try {
      setLoadingTable(true);
      const resp = await AdminAPI.deshabilitarCharla(item.charlaId);
      console.log(resp);
      if (resp.succeeded) message.success(resp.message);
      else message.error(resp.message);
      setLoadingTable(false);
    } catch (error) {
      setLoadingTable(false);
      message.error(error.message);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setImgUrl("");
    setDetailId("");
    setVisible(false);
  };

  const openModalCreate = () => {
    form.resetFields();
    setImgUrl("");
    setVisible(true);
  };

  const openModalEdit = (item) => {
    setDetailId(item.charlaId);
    form.setFields([
      {
        name: "nombre",
        value: item.nombre,
      },
      {
        name: "descripcion",
        value: item.descripcion,
      },
    ]);

    setImgUrl(item.urlImage);
    setVisible(true);
  };

  const onPaginatedChange = (page) => {
    setRequest((prevState) => ({
      ...prevState,
      pageNumber: page,
    }));
  };

  const columns = [
    { title: "Charla", dataIndex: "nombre", key: "nombre" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    {
      title: "Portada",
      dataIndex: "urlImage",
      key: "urlImage",
      render: (item) => <Image src={item} width={70} preview={false} />,
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
            placement="top"
            title="¿Eliminar charla?"
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
        visible={visible}
        title={
          imgUrl === "" && fileList.length === 0
            ? "Crear charla"
            : "Editar charla"
        }
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <NewOrEditCharlaForm
          handleOk={handleOk}
          loading={loading}
          fileList={fileList}
          setFileList={setFileList}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          form={form}
        />
      </Modal>
    </>
  );
};

export default CharlasCrudPage;
