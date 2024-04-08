import { BaseEntity } from "src/common/dto/baseEntity";
import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @DeleteDateColumn({ nullable: true })
  deleteAt: Date;
}
