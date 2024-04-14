import jwt from "jsonwebtoken";

export const verify = async (req, res, next) => {
  try {
    // console.log(req?.headers?.authorization?.includes("Bearer"), req?.headers?.authorization);
    const token = req?.headers?.authorization?.split(" ")[1];
    const custom = req?.headers?.authorization?.length < 500;

    let decodedData;

    if (token && custom && req?.headers?.authorization?.includes("Bearer")) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      // decodedData = jwt.decode(token);
      req.userId = req?.headers?.authorization;
    }

    next();
  } catch (error) {
    res.status(404).json({ message: "Unauthorized!" });
  }
};
