import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Not authorized! Please login again.",
      });
    }

    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      token_decoded.id !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.status(400).json({
        success: false,
        message: "Not authorized! Please login again.",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
