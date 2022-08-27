import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @OneToOne(()=>User,(user)=>user.profile,{
        onDelete:"CASCADE"
    })
    user:User

}