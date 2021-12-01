import { Form, Input, Button, Row, Col, Space, Modal } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../redux/actions/authAction";
import { CuentaInfoIcon } from "../../../components/svg/IconSvg";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loadingApp } = useSelector((state) => state.app);

  const onSubmit = (values) => {
    dispatch(loginAction(values));
  };

  function info() {
    Modal.info({
      title: "Cuentas",
      content: (
        <div>
          <p>admin: willy@mail.com - Holamundo123*</p>
          <p>public: sofia@mail.com - Holamundo123*</p>
        </div>
      ),
      onOk() {},
    });
  }

  return (
    <Form name="formlogin" onFinish={onSubmit}>
      <Row justify="center" align="middle">
        <Col xxl={14} xl={16} lg={18} md={18} sm={14} xs={18}>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
        </Col>
        <Col xxl={14} xl={16} lg={18} md={18} sm={14} xs={18}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
        </Col>
        <Col xxl={14} xl={16} lg={18} md={18} sm={14} xs={18}>
          <Form.Item>
            <Button loading={loadingApp} block type="primary" htmlType="submit">
              Ingresar
            </Button>
          </Form.Item>
          O <Link to="/register">registrate ahora!</Link>
        </Col>
        <Col xxl={14} xl={16} lg={18} md={18} sm={14} xs={18}>
          <CuentaInfoIcon style={{ cursor: "pointer" }} onClick={info} />
        </Col>
      </Row>
    </Form>
  );
};

export default LoginPage;
