import React from "react";
import { kea } from "kea";
import axios from "axios";

const DashboardLogic = kea({
  path: () => ["kea", "dashboard"],

  events: ({ actions }) => ({
    afterMount: () => {
      actions.getProductList();
    },
  }),

  defaults: {
    dashboardLoading: true,
  },

  actions: {
    getProductList: true,
    setProductList: (products: any) => ({ products }),
  },

  listeners: ({ actions }) => ({
    getProductList: async () => {
      const { data } = await axios.get(
        "https://run.mocky.io/v3/d8c984f8-ccb2-4021-8fa9-4bbb466e7914"
      );
      actions.setProductList(data);
    },
  }),

  reducers: {
    dashboardLoading: {
      getProductList: () => true,
      setProductList: () => false,
    },
    products: [
      [],
      {
        setProductList: (_: any, { products }: any) => products,
      },
    ],
  },
});

export default DashboardLogic;
