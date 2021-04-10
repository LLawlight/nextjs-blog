import { NextApiRequest, NextApiResponse } from "next";

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Super Admin",
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "I am an editor",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal Editor",
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers["x-access-token"] as string;
  const info = users[token];

  let data = info
    ? {
        code: 20000,
        data: {
          user: info,
        },
      }
    : {
        code: 50008,
        message: "Login failed, unable to get user details.",
      };

  res.status(200).json(data);
};
