import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Mensagem from "../models/Mensagem";

export default class MensagensController {
  public async readAll(req: Request, res: Response) {
    return res.json(
      await getRepository(Mensagem).find({
        order: {
          updated_at: "DESC",
        },
      })
    );
  }

  public async readOne(req: Request, res: Response){

    function randomId(num: number){
      return Math.random() * num
    }

    const length = await getRepository(Mensagem).count()
    //console.log(length);

    const id = Math.floor(randomId(length) + 1)
    //console.log(id);

    return res.json(
      await getRepository(Mensagem).find({
        where: {
          id
        }
      })
    );
  }
}
