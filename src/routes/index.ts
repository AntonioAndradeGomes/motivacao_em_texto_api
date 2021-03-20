import { Router } from "express";
import AppError from "../errors/AppError";
import messagesRouter from "../routes/messages.routes";

const routes = Router();

routes.use("/messages", messagesRouter);

routes.get("/", (req, res) => {
  throw new AppError("teste de erros", 401);
});

export default routes;
