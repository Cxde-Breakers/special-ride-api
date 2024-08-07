import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { TransactionStatus } from '../../shared/enums/transaction-status.enum';
import { Status } from '../../shared/enums/status.enum';

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    paymentMethod: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amountPaid: number;

    @Column()
    country: string;

    @Column('enum', { enum: TransactionStatus, default: TransactionStatus.Pending })
    TransactionStatus: TransactionStatus;

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => User)
    paymentBy: User;

    @ManyToOne(() => User, user => user.transactions)
    user: User;
}