import { Button, Form, Row, Col, Input } from "antd";
import { ChromePicker } from "react-color";

const NewOrEditEstadoEventosForm = ({
  handleOnSubmit,
  loadingButton,
  form,
  colorState,
  handleChangeColor,
}) => {
  return (
    <Form
      labelCol={{ span: 18 }}
      wrapperCol={{ span: 24 }}
      form={form}
      onFinish={handleOnSubmit}
      layout="vertical"
    >
      <Row align="middle" justify="space-between">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[
              { required: true, message: "Te faltó completar el nombre!!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            name="color"
            label="Color"
            rules={[
              { required: true, message: "Te faltó completar el color!!" },
            ]}
          >
            <ChromePicker color={colorState} onChange={handleChangeColor} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          block={true}
          loading={loadingButton}
        >
          {loadingButton ? "Guardando..." : "Guardar"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewOrEditEstadoEventosForm;
