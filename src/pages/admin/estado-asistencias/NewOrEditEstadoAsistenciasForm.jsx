import { Button, Form, Row, Col, Input } from "antd";

const NewOrEditEstadoAsistenciasForm = ({
  handleOnSubmit,
  loadingButton,
  form,
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

export default NewOrEditEstadoAsistenciasForm;
