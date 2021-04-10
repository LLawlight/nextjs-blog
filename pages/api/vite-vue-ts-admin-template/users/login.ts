import { NextApiRequest, NextApiResponse } from "next";

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    code: 20000,
    data: {
      accessToken: "vue-typescript-vite-admin-template_token",
    },
  });
};
