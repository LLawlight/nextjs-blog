import { NextApiRequest, NextApiResponse } from "next";
const Mock = require("mockjs");

const data = Mock.mock({
  "items|30": [
    {
      id: "@id",
      title: "@sentence(10, 20)",
      "status|1": ["published", "draft", "deleted"],
      author: "name",
      display_time: "@datetime",
      pageviews: "@integer(300, 5000)",
    },
  ],
});

export default (_: NextApiRequest, res: NextApiResponse) => {
  const items = data.items;

  res.status(200).json({
    code: 20000,
    data: {
      total: items.length,
      items: items,
    },
  });
};
