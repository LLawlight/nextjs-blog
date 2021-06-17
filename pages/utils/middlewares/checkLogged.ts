export default (req, res) => {
  return new Promise((resolve, reject) => {
    const token = req.cookies["JSESSIONID"] as string;

    if (["admin-token", "editor-token"].indexOf(token) > -1) {
      return resolve();
    }

    res.status(200).json({
      errcode: "error",
      errmsg: "登录已失效，请重新登录!",
      errno: 20030,
    });
    return reject();
  });
};
