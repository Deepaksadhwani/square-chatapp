import  express  from "express";
import { verifyToken } from "../middlewares/auth-middleware";
import { getContactForDmListController, searchContactsController } from "../controllers/contact-controller";

const contactRouter = express.Router();


contactRouter.post("/search", verifyToken, searchContactsController)
contactRouter.get("/get-contacts-for-dm", verifyToken, getContactForDmListController)



export default contactRouter