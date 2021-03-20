import { Router } from "express";
import MensagensController from "../controllers/mensagens.controller";

const messagesRouter = Router();

const mensagensController = new MensagensController();
//essa Gabriel faz
messagesRouter
  .get("/", (req, res) => {
    return res.json({ message: "ok" });
  })
  .get("/all", mensagensController.readAll);

export default messagesRouter;
