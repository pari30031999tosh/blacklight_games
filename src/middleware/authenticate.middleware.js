import jwt from "jsonwebtoken"


export const authenticate = async (req, res, next) => {
    try {
          const token = req.cookies[process.env.AUTH_TOKEN_HEADER];
         
         
          try {
              var decoded = jwt.verify(token, process.env.AUTH_JWT_SECRET);
             
              
          } catch(err) {
            console.log("error=====", err)
              return res.send("unauthorized");
          }
          
          
          
         
          return next();
      } catch(err) {
          console.log("error in auth", err)
          return res.send("unauthorized====");
      }
}