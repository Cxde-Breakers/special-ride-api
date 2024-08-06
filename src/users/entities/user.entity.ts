import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enums/role.enum";
import { Transaction } from "src/transactions/entities/transaction.entity";
import { Status } from "src/shared/enums/status.enum";

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

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @Column({ nullable: true })
    emailVerifiedAt: Date;

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions: Transaction[];
}