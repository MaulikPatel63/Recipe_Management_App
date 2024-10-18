const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.startsWith("Bearer ")
    ? bearerHeader.split(" ")[1]
    : bearerHeader;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(400).json({
          ErrorCode: "INVALID TOKEN",
          ErrorMessage: "Token is invalid",
          Error: err,
        });
      } else {
        req.user = decoded.userId;

        next();
      }
    });
  } else {
    res
      .status(400)
      .json({ ErrorCode: "INVALID TOKEN", ErrorMessage: "Token not provided" });
  }
};
