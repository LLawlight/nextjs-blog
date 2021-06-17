import { NextApiRequest, NextApiResponse } from "next";
import checkLogged from "../../../utils/middlewares/checkLogged";

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
    avatar:
      "https://zhaoyuxiang.cn/_next/image?url=%2Fimages%2Fprofile.jpg&w=256&q=75",
    name: "Super Admin",
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "I am an editor",
    avatar:
      "https://zhaoyuxiang.cn/_next/image?url=%2Fimages%2Fprofile.jpg&w=256&q=75",
    name: "Normal Editor",
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await checkLogged(req, res);

    const token = req.cookies["JSESSIONID"] as string;
    const info = users[token];

    res.status(200).json({
      errcode: "success",
      errmsg: "成功",
      errno: 0,
      data: {
        user: info,
      },
    });
  } catch (e) {}
};
