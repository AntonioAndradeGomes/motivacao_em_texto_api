import { Router } from "express";
import MensagensController from "../controllers/mensagens.controller";

const messagesRouter = Router();

const mensagensController = new MensagensController();

messagesRouter.get("/", mensagensController.readOne);
messagesRouter.get("/all", mensagensController.readAll);

export default messagesRouter;
