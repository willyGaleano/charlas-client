import { Col, message, PageHeader, Row, Spin } from "antd";
import { Column } from "@ant-design/charts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MisEventosAPI } from "../../services/api";
import { useState } from "react";
import history from "../../utils/history";
import moment from "moment";

const MisEstadisticas = () => {
  const { user } = useSelector((state) => state.auth);
  const [dataResponse, setDataResponse] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        console.log(user.id);
        const resp = await MisEventosAPI.listMisEstadisticas(user.id);
        console.log(resp.data);
        if (resp.succeeded) setDataResponse(resp.data);
        else message.error(resp.message);
      } catch (error) {
        message.error(error.message);
      }
    })();
  }, []);

  const config = {
    data: dataResponse,
    isGroup: true,
    xField: "mes",
    yField: "cant",
    seriesField: "estado",

    /** 设置颜色 */
    //color: ['#1ca9e6', '#f88c24'],

    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: "interval-adjust-position",
        }, // 数据标签防遮挡
        {
          type: "interval-hide-overlap",
        }, // 数据标签文颜色自动调整
        {
          type: "adjust-color",
        },
      ],
    },
  };
  return (
    <>
      <PageHeader
        onBack={() => history.push("/")}
        title="Mis Estadísticas"
        subTitle={moment().format("DD-MM-YYYY")}
      />
      <Row align="middle" justify="center">
        <Col xxl={20} xl={20} lg={20} md={22} sm={24} xs={24}>
          {dataResponse === [] ? <Spin /> : <Column {...config} />}
        </Col>
      </Row>
    </>
  );
};

export default MisEstadisticas;
