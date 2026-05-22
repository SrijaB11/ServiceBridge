const workerMiddleware =
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

      // Check worker role

      if (
        req.user.role !==
        "worker"
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Access denied. Worker only",
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
  workerMiddleware;