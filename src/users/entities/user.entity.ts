import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enums/role.enum";
import { Transaction } from "src/transactions/entities/transaction.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ enum: Role, default: Role.Passenger })
    role: Role;

    @Column({ default: false })
    isTfaEnabled: boolean;

    @Column({ nullable: true })
    tfaSecret: string;

    @Column()
    image: string;

    @Column()
    emailVerifiedAt: Date;

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions: Transaction[];
}