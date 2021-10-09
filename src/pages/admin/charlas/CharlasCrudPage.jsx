import {
  Table,
  Image,
  Row,
  Col,
  Modal,
  Space,
  Popconfirm,
  message,
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
import NewOrEditCharlaForm from "./NewOrEditCharlaForm";

const initialRequest = {
  nombre: "",
  pageNumber: 1,
  pageSize: 3,
};

const CharlasCrudPage = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [request, setRequest] = useState(initialRequest);
  const [imgUrl, setImgUrl] = useState("");
  const [loadingTable, setLoadingTable] = useState(false);
  const [respDetail, setRespDetail] = useState({
    nombre: "",
    descripcion: "",
    urlImage: "",
  });

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
    (async () => {
      try {
        setLoadingTable(true);
        const resp = await AdminAPI.listCharla(request);
        if (resp.succeeded) setRespPaginated(resp);
        else message.error(resp.message);
        setLoadingTable(false);
      } catch (error) {
        setLoadingTable(false);
        message.error(error.message);
      }
    })();
  }, [request]);

  const handleOk = (value) => {
    console.log(value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFileList([]);
      setImgUrl("");
      form.resetFields();
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    form.resetFields();
    setImgUrl("");
    setVisible(false);
  };

  const openModalCreate = () => {
    setRespDetail(null);
    setImgUrl("");
    setVisible(true);
  };

  const openModalEdit = (item) => {
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
          />
        </Col>
      </Row>

      <Modal
        visible={visible}
        title={imgUrl === "" ? "Crear charla" : "Editar charla"}
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
