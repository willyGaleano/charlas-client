import { Button, Form, InputNumber, DatePicker, Select, Row, Col } from "antd";
import moment from "moment";

const { Option } = Select;

const NewOrEditEventoForm = ({
  handleOnSubmit,
  loadingButton,
  respCharlasForm,
  form,
}) => {
  function disabledDate(current) {
    // Can not select days before today and today
    return current < moment().endOf("day");
  }
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  function disabledDateTime() {
    return {
      disabledHours: () => [0, 1, 2, 3, 4, 5, 21, 22, 23],
      //disabledMinutes: () => range(30, 60),
      //disabledSeconds: () => [55, 56],
    };
  }

  return (
    <Form
      initialValues={{
        fechaIni: moment(),
        duracion: "",
        aforo: "",
        charlaId: "",
      }}
      labelCol={{ span: 18 }}
      wrapperCol={{ span: 24 }}
      form={form}
      onFinish={handleOnSubmit}
      layout="vertical"
    >
      <Row align="middle" justify="space-between">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            name="fechaIni"
            label="Fecha de inicio"
            rules={[
              {
                required: true,
                message: "Te faltó completar la fecha del evento!!",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
        </Col>
        <Col xxl={11} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            name="duracion"
            label="Duración"
            rules={[
              { required: true, message: "Te faltó completar la duración !!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={1} max={3} />
          </Form.Item>
        </Col>
        <Col xxl={11} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            name="aforo"
            label="Aforo"
            rules={[
              { required: true, message: "Te faltó completar el aforo !!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={5} max={100} />
          </Form.Item>
        </Col>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            name="charlaId"
            label="Charlas"
            rules={[{ required: true, message: "Escoge una charla !!" }]}
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Seleccionar charla"
              optionFilterProp="children"
              //onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {respCharlasForm.map((item) => (
                <Option key={item.charlaId} value={item.charlaId}>
                  {item.nombre}
                </Option>
              ))}
            </Select>
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

export default NewOrEditEventoForm;
