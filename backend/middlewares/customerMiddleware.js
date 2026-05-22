const customerMiddleware = async (req, res, next) => { try 
  {
     // role check 
     if (req.role !== "customer") {
       return res.status(403).json({ message: "Only customers allowed", });
       } next(); 
      } catch (error) {
         //console.log(error);
         res.status(500).json({ message: "Server Error", });
       } 
      };
       module.exports = customerMiddleware;