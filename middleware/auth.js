import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized! Please login again.",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!token_decode?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token! Please login again.",
      });
    }

    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired! Please login again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Not authorized! Please login again.",
    });
  }
};

export default authUser;