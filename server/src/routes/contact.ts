import  express  from "express";
import { verifyToken } from "../middlewares/auth-middleware";
import { getAllContactsController, getContactForDmListController, searchContactsController } from "../controllers/contact-controller";

const contactRouter = express.Router();


contactRouter.post("/search", verifyToken, searchContactsController)
contactRouter.get("/get-contacts-for-dm", verifyToken, getContactForDmListController)
contactRouter.get("/get-all-contacts", verifyToken, getAllContactsController)



export default contactRouter