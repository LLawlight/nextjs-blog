import { NextApiRequest, NextApiResponse } from "next";

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    code: 20000,
    data: {
      user: {
        roles: ["admin"],
        name: "vite-vue-ts-admin",
        avatar:
          "https://zhaoyuxiang.cn/_next/image?url=%2Fimages%2Fprofile.jpg&w=256&q=75",
        introduction: "https://zhaoyuxiang.cn",
      },
    },
  });
};
