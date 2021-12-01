import { Form, Input, Button, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerAction } from "../../../redux/actions/authAction";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { loadingApp } = useSelector((state) => state.app);

  const onSubmit = (values) => {
    dispatch(registerAction(values));
  };

  return (
    <Form layout="vertical" name="register" onFinish={onSubmit}>
      <Row justify="center" align="middle">
        <Col xxl={14} xl={16} lg={18} md={14} sm={16} xs={18}>
          <Form.Item
            name="email"
            label="E-mail"
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
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xxl={14} xl={16} lg={18} md={14} sm={16} xs={18}>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
        </Col>
        <Col xxl={14} xl={16} lg={18} md={14} sm={16} xs={18}>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
        <Col xxl={14} xl={16} lg={18} md={14} sm={16} xs={18}>
          <Form.Item
            name="userName"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xxl={14} xl={16} lg={18} md={14} sm={16} xs={18}>
          <Form.Item>
            <Button block loading={loadingApp} type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <Link to="/login">volver a login</Link>
        </Col>
      </Row>
    </Form>
  );
};

export default RegisterPage;
