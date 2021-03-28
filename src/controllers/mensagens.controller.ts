import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import AppError from "../errors/AppError";
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

  public async readOne(req: Request, res: Response) {
    //const {ignoreIds} = req.body;

    //if(!ignoreIds || ignoreIds.length == 0){
      //console.log('Sem ids');
      const sql = await getManager().query('SELECT * FROM mensagens ORDER BY RAND() LIMIT 1');
      return res.json(sql[0]);
    /*}
    //console.log(ignoreIds.length);
    if( ignoreIds.length == 1){
      const sql = await getManager().query(`SELECT * FROM mensagens WHERE id NOT IN (\'${ignoreIds[0]}\') ORDER BY RAND() LIMIT 1`);
      return res.json(sql[0]);
    }else if (ignoreIds.length == 2){
      const sql = await getManager().query(`SELECT * FROM mensagens WHERE id NOT IN (\'${ignoreIds[0]}\', \'${ignoreIds[1]}\') ORDER BY RAND() LIMIT 1`);
      return res.json(sql[0]);
    }else {
      const sql = await getManager().query(`SELECT * FROM mensagens WHERE id NOT IN (\'${ignoreIds[0]}\', \'${ignoreIds[1]}\', \'${ignoreIds[2]}\') ORDER BY RAND() LIMIT 1`);
      return res.json(sql[0]);
    }*/

  }

  public async insert(req: Request, res: Response) {
    const mensagensRepository = getRepository(Mensagem);
    const { texto, autor, cor } = req.body;
    if (!texto || texto.length == 0) {
      throw new AppError("Insira o texto");
    }
    if (!autor || autor.length == 0) {
      throw new AppError("Insira o autor");
    }
    if (!cor || cor.length == 0) {
      throw new AppError("Insira uma cor");
    }

    const mensagemCheck = await getRepository(Mensagem).findOne({where :{texto : texto}});
    if(mensagemCheck){
      throw new AppError("Mensagem já existe");
    }
    const mensagem = mensagensRepository.create({
      texto,
      autor,
      cor,
    });
    await mensagensRepository.save(mensagem);
    return res.status(201).json(mensagem);
  }
}
