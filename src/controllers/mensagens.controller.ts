import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Mensagem from '../models/Mensagem';


export default class MensagensController{

  public async readAll(req : Request, res: Response){
    return res.json(
      await getRepository(Mensagem).find({
        order: {
          updated_at : "DESC",
        }
      })
    );
  }
}
