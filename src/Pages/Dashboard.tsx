import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Input,
  Layout,
  Menu,
  Row,
  Slider,
  Space,
  Typography,
} from "antd";
import moment from "moment";

import { useValues, useActions } from "kea";
import { CloseCircleFilled, FilterFilled } from "@ant-design/icons";

import Logo from "../Assets/etisalat_digital.png";
import DashboardLogic from "../Logics/DashboardLogic";

const { Meta } = Card;
const { Header, Content, Footer } = Layout;

const Login = () => {
  const { dashboardLoading, products } = useValues(DashboardLogic);

  const [filterBy, setFilterBy] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const closeFilter = () => {
    setFilterBy("");
    setFilteredProducts(products);
  };

  const changeFilterBy = (filter: string) => {
    setFilterBy(filter);
    setFilteredProducts(products);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={() => changeFilterBy("name")}>Name</Menu.Item>
      <Menu.Item onClick={() => changeFilterBy("date")}>Expiry</Menu.Item>
      <Menu.Item onClick={() => changeFilterBy("price")}>Price</Menu.Item>
    </Menu>
  );

  const filterProducts = (value: any) => {
    switch (filterBy) {
      case "name":
        const filteredByName: any = _.filter(products, (each) =>
          _.includes(_.toLower(each.product_name), value)
        );
        setFilteredProducts(filteredByName as any);
        break;

      case "date":
        const filteredByDate: any = _.filter(
          products,
          (each) => each.expiry_date === value.format("DD-MM-YYYY")
        );
        setFilteredProducts(filteredByDate as any);
        break;

      case "price":
        const filteredByPrice: any = _.filter(
          products,
          (each) => each.discount_price <= value
        );
        setFilteredProducts(filteredByPrice as any);
        break;
    }
  };

  const getComponent = () => {
    switch (filterBy) {
      case "name":
        return (
          <Input
            className="width-radius"
            placeholder="Filter by name..."
            onChange={({ target }) => filterProducts(target.value)}
          />
        );

      case "date":
        return (
          <DatePicker
            className="width-radius"
            onChange={filterProducts}
            format={"LL"}
          />
        );

      case "price":
        return (
          <Slider
            defaultValue={0}
            onChange={filterProducts}
            className="width-radius"
          />
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Avatar shape="square" className="dashboard-logo" src={Logo} />
      </Header>
      <Content className="site-layout" style={{ marginTop: 60 }}>
        <div className="site-layout-background" style={{ minHeight: 380 }}>
          <Card
            title={
              <Row style={{ width: "90%" }}>
                <Col span={12}>{getComponent()}</Col>
                {filterBy !== "" && (
                  <Col span={6} style={{ alignSelf: "center" }}>
                    <Space size="large">
                      <CloseCircleFilled onClick={closeFilter} />
                    </Space>
                  </Col>
                )}
              </Row>
            }
            extra={
              <Dropdown
                overlay={menu}
                placement="bottomLeft"
                trigger={["click"]}
              >
                <Button shape="circle" className="filter-button">
                  <FilterFilled />
                </Button>
              </Dropdown>
            }
          >
            <Row gutter={[16, 48]}>
              {_.map(filteredProducts, (eachProduct: any) => (
                <Col span={6}>
                  <Card
                    className="product-card"
                    loading={dashboardLoading}
                    hoverable
                    style={{ width: 300, borderRadius: "8px" }}
                    cover={<img alt="example" src={eachProduct.imageUrl} />}
                  >
                    <Meta
                      title={
                        <Row>
                          <Col span={24}>
                            <Typography.Text style={{ fontSize: "1em" }}>
                              {eachProduct.product_name}
                            </Typography.Text>
                          </Col>
                          <Col span={24}>
                            <Typography.Text>
                              AED{" "}
                              <strong style={{ fontSize: "1.3em" }}>
                                {eachProduct.discount_price}
                              </strong>
                            </Typography.Text>
                          </Col>
                          <Col span={24} style={{ fontSize: "0.7em" }}>
                            <Typography.Text delete>
                              AED {eachProduct.price}
                            </Typography.Text>
                          </Col>
                        </Row>
                      }
                      description={
                        <Row justify="space-between">
                          <Col span={24}>
                            <Typography.Text>
                              Expires on{" "}
                              {moment(
                                eachProduct.expiry_date,
                                "DD-MM-YYYY"
                              ).format("LL")}
                            </Typography.Text>
                          </Col>
                        </Row>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </div>
      </Content>
      <Footer className="footer">
        Etisalat Assignmaent ©2021 Created by Mohammed Arqam Ali Saad
      </Footer>
    </Layout>
  );
};

export default Login;
