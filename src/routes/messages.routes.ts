import { Router } from "express";
import MensagensController from "../controllers/mensagens.controller";

const messagesRouter = Router();

const mensagensController = new MensagensController();

messagesRouter.get("/one/:ignore1?/:ignore2?/:ignore3?", mensagensController.readOne);
messagesRouter.get("/all", mensagensController.readAll);
messagesRouter.post('/', mensagensController.insert);

export default messagesRouter;
