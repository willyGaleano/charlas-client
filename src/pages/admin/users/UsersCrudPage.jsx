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
import NewOrEditUserForm from "./NewOrEditUserForm";

const initialRequest = {
  firstName: "",
  lastName: "",
  dni: 0,
  pageNumber: 1,
  pageSize: 6,
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
    pageSize: 6,
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
        const resp = await AdminAPI.listUsers(request);
        if (resp.succeeded) setRespPaginated(resp);
        else message.error(resp.message);
        setLoadingTable(false);
      } catch (error) {
        setLoadingTable(false);
        message.error(error.message);
      }
    })();
  }, [request]);

  const handleOk = async (value) => {
    let formData = new FormData();
    try {
      setLoading(true);
      formData.append("FirstName", value.firstName);
      formData.append("LastName", value.lastName);
      formData.append("Dni", value.dni);
      formData.append("UserName", value.userName);
      formData.append("Email", value.email);
      formData.append(
        "Password",
        value.password === undefined ? null : value.password
      );
      formData.append(
        "ConfirmPassword",
        value.confirmPassword === undefined ? null : value.confirmPassword
      );
      value.image === undefined
        ? formData.append("File", null)
        : formData.append("File", value.image[0]);

      let resp;
      if (detailId === "") resp = await AdminAPI.createUser(formData);
      else {
        const newFormData = {
          id: detailId,
          form: formData,
        };
        resp = await AdminAPI.editUser(newFormData);
      }

      if (resp.succeeded) {
        handleCancel();
        setLoading(false);
        message.success(resp.message);
        setRequest((prevState) => ({ ...prevState }));
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
      const resp = await AdminAPI.deshabilitarUser(item.id);
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

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setImgUrl("");
    setDetailId("");
    setVisible(false);
  };

  const openModalCreate = () => {
    form.resetFields();
    setDetailId("");
    setImgUrl("");
    setVisible(true);
  };

  const openModalEdit = (item) => {
    setDetailId(item.id);
    form.setFields([
      {
        name: "firstName",
        value: item.firstName,
      },
      {
        name: "lastName",
        value: item.lastName,
      },
      {
        name: "dni",
        value: item.dni,
      },
      {
        name: "userName",
        value: item.userName,
      },
      {
        name: "email",
        value: item.email,
      },
      {
        name: "password",
        value: "",
      },
      {
        name: "confirmPassword",
        value: "",
      },
    ]);

    setImgUrl(item.imgUrl);
    setVisible(true);
  };

  const onPaginatedChange = (page) => {
    setRequest((prevState) => ({
      ...prevState,
      pageNumber: page,
    }));
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (item) => <Image src={item} width={70} preview={false} />,
    },
    { title: "Nombre", dataIndex: "firstName", key: "firstName" },
    { title: "Apellido", dataIndex: "lastName", key: "lastName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "DNI", dataIndex: "dni", key: "dni" },
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
            title="¿Eliminar usuario?"
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
    setRequest((prev) => ({ ...prev, firstName: value }));
  };

  return (
    <>
      <Row align="middle" justify="center" style={{ marginBottom: "10px" }}>
        <Col xxl={12} xl={18} lg={18} md={18} sm={18} xs={24}>
          <Search
            placeholder="usuario..."
            onSearch={onSearch}
            enterButton="buscar"
          />
        </Col>
      </Row>
      <Row align="middle" justify="center">
        <Col xxl={16} xl={20} lg={20} md={22} sm={24} xs={24}>
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
            rowKey="id"
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
            ? "Crear usuario"
            : "Editar usuario"
        }
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <NewOrEditUserForm
          handleOk={handleOk}
          loading={loading}
          fileList={fileList}
          setFileList={setFileList}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          detailId={detailId}
          form={form}
        />
      </Modal>
    </>
  );
};

export default CharlasCrudPage;
