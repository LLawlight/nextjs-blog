import { NextApiRequest, NextApiResponse } from "next";
import checkLogged from "../../utils/middlewares/checkLogged";
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await checkLogged(req, res);

    const items = data.items;

    res.status(200).json({
      errcode: "success",
      errmsg: "成功",
      errno: 0,
      data: {
        total: items.length,
        items: items,
      },
    });
  } catch (e) {}
};
