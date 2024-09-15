import  express  from "express";
import { verifyToken } from "../middlewares/auth-middleware";
import { searchContactsController } from "../controllers/contact-controller";

const contactRouter = express.Router();


contactRouter.post("/search", verifyToken, searchContactsController)








export default contactRouter