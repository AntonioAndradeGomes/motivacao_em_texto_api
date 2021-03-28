import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("mensagens")
export default class Mensagem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  texto: string;

  @Column()
  autor: string;

  @Column()
  cor: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
