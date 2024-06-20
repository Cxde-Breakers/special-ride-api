import { Status } from "src/shared/enums/status.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('countries')
export class Country { 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    iso: string;

    @Column('decimal', { precision: 100, scale: 2 })
    commissionForDriver: number;

    @Column('decimal', { precision: 1, scale: 2 })
    commissionFromDriverPercentage: number;

    @Column('decimal', { precision: 10, scale: 2 })
    commission: number;

    @Column()
    paystack: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00})
    localEarnings: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
    usdEarnings: number;

    @Column()
    ambulanceNumber: string;

    @Column()
    policeNumber: string;

    @Column()
    managerNumber: string;

    @Column()
    supportMail: string;

    @Column('decimal', { precision: 10, scale: 2 })
    driverCreditLimit: number;

    @Column()
    maxDriverRadius: number;

    @Column()
    cashPaymentDirection: string;

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}


