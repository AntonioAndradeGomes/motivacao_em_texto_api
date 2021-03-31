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
    const ignore = req.params;
   // console.log(ignore);
    if(!ignore.ignore1){
      //console.log('sem ignorados');
      const sql = await getManager().query('SELECT * FROM mensagens ORDER BY RAND() LIMIT 1');
      return res.json(sql[0]);
    } else if(ignore.ignore3 && ignore.ignore2 && ignore.ignore1){
      //console.log('3 ignorados');
      const sql = await getManager().query(`SELECT * FROM mensagens WHERE id NOT IN (\'${ignore.ignore3}\', \'${ignore.ignore2}\', \'${ignore.ignore1}\') ORDER BY RAND() LIMIT 1`);
      return res.json(sql[0]);
    }else if(ignore.ignore2 && ignore.ignore1){
      //console.log('2 ignorados');
      const sql = await getManager().query(`SELECT * FROM mensagens WHERE id NOT IN (\'${ignore.ignore2}\', \'${ignore.ignore1}\') ORDER BY RAND() LIMIT 1`);
      return res.json(sql[0]);
    }else {
     // console.log('1 ignorado');
      const sql = await getManager().query(`SELECT * FROM mensagens WHERE id NOT IN (\'${ignore.ignore1}\') ORDER BY RAND() LIMIT 1`);
      return res.json(sql[0]);
    }
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
