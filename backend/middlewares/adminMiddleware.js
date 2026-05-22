const adminMiddleware =
  (req, res, next) => {
    try {

      // Check user exists

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message:
            "Unauthorized",
        });
      }

      // Check admin role

      if (
        req.user.role !==
        "admin"
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Access denied. Admin only",
        });
      }

      next();

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports =
  adminMiddleware;