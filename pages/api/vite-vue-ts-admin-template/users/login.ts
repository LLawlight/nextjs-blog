import { NextApiRequest, NextApiResponse } from "next";

const tokens = {
  admin: {
    token: "admin-token",
  },
  editor: {
    token: "editor-token",
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.body;
  const { token } = tokens[username] ? tokens[username] : { token: undefined };

  let data = token
    ? {
        errcode: "success",
        errmsg: "成功",
        errno: 0,
        data: {},
      }
    : {
        errcode: "login_error",
        errmsg: "用户名或密码错误，请确认后重新登录!",
        errno: 20060,
      };

  res.writeHead(200, "zhaoyuxiang.cn", [
    ["Content-Type", "application/json;charset=utf-8"],
    ["Set-Cookie", `JSESSIONID=${token};Path=/;HttpOnly`],
  ]);

  res.write(JSON.stringify(data));
  res.end();
};
