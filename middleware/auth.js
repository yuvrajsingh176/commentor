import jwt from "jsonwebtoken";

const auth = async(req,res,next) => {
  const token = req.headers.authorization;
  const [, tokenWithoutBearer] = token.split(" ");

    if (!tokenWithoutBearer) {
      return res.status(401).json({ error: 'Invalid user' });
    }
    try {
      const payload = jwt.verify(tokenWithoutBearer, 'jai-shree-ram');
      req.user = { userId: payload.userId ,username:payload.username};
   
        next();
    }
    catch (e) {
      return res.status(401).json({ error: 'Invalid user' });
    }
}
export default auth;