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
  const token = tokens[username];

  let data = token
    ? {
        code: 20000,
        data: token,
      }
    : {
        code: 60204,
        message: "Account and password are incorrect.",
      };

  res.status(200).json(data);
};
