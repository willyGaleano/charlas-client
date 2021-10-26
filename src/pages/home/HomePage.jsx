import {
  List,
  Row,
  Col,
  Input,
  Image,
  Typography,
  Badge,
  Popconfirm,
  message,
  Modal,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { HeartIcon, HeartPopop } from "../../components/svg/IconSvg.js";
import QRCode from "qrcode";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadingAppAction } from "../../redux/actions/appAction.js";
import { AdminAPI, HomeAPI } from "../../services/api.js";
import moment from "moment";
const { Text, Link } = Typography;
const { Search } = Input;

const initialRequest = {
  nombre: "",
  pageNumber: 1,
  pageSize: 3,
  isAdmin: false,
};

const HomePage = () => {
  const { loading } = useSelector((state) => state.app);
  const { user } = useSelector((state) => state.auth);
  const [request, setRequest] = useState(initialRequest);
  const [respPaginated, setRespPaginated] = useState({
    pageNumber: 1,
    pageSize: 3,
    total: 1,
    succeeded: false,
    message: "",
    errors: null,
    data: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingAppAction(true));
        const resp = await AdminAPI.listCharlaEvento(request);
        console.log(resp);
        setRespPaginated(resp);
        dispatch(loadingAppAction(false));
      } catch (error) {
        message.error(error.message);
        dispatch(loadingAppAction(false));
      }
    })();
  }, [dispatch, request]);

  const generateQrCode = async (eventoId) => {
    try {
      const respAsist = await HomeAPI.crearAsistencia({
        userAppId: user.id,
        eventoId,
        fecSesion: moment().format("YYYY-MM-DD"),
      });

      if (respAsist.succeeded) {
        const response = await QRCode.toDataURL(`${user.id}#${respAsist.data}`);

        Modal.info({
          title: "Descargue su QR",
          content: (
            <Link href={response} download>
              <Image preview={false} src={response} alt="qr" />
            </Link>
          ),
          onOk() {},
        });
      } else {
        notification.info({
          message: "Ups!",
          placement: "topLeft",
          description: respAsist.message,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error :c",
        description: error.message,
      });
    }
  };

  const onPaginatedChange = (page) => {
    setRequest((prevState) => ({
      ...prevState,
      pageNumber: page,
    }));
  };

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
        <Col xxl={16} xl={20} lg={20} md={18} sm={22} xs={20}>
          <List
            itemLayout="vertical"
            loading={loading}
            size="large"
            pagination={{
              total: respPaginated?.total,
              pageSize: respPaginated.pageSize,
              current: respPaginated.pageNumber,
              onChange: onPaginatedChange,
            }}
            dataSource={respPaginated.data}
            renderItem={(item) => (
              <Badge.Ribbon
                text={<Text strong>{item.nombreEstadoEvento}</Text>}
                color={item.colorEstadoEvento}
              >
                <List.Item
                  key={item.eventoId}
                  actions={
                    item.nombreEstadoEvento !== "Finalizado"
                      ? [
                          <Popconfirm
                            placement="topLeft"
                            title="¿Anotarse a la charla?"
                            icon={<HeartPopop />}
                            onConfirm={() => generateQrCode(item.eventoId)}
                            okText="Sí"
                            cancelText="No"
                          >
                            <HeartIcon style={{ cursor: "pointer" }} />
                          </Popconfirm>,
                        ]
                      : null
                  }
                  extra={
                    <Image
                      width={272}
                      alt={item.nombreCharla}
                      src={item.urlImage}
                    />
                  }
                >
                  <List.Item.Meta
                    title={
                      <Link href={item.urlImage}>{item.nombreCharla}</Link>
                    }
                    description={
                      <Text strong>
                        {moment(item.fechaIni).format("LLLL")}
                        <br />
                        Duración : {item.duracion}h
                        <br />
                        Aforo : {item.aforo}
                      </Text>
                    }
                  />
                  {item.descripcion}
                </List.Item>
              </Badge.Ribbon>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
