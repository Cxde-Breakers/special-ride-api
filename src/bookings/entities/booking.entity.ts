import { PaymentStatus } from "src/shared/enums/payment-status.enum";
import { Status } from "src/shared/enums/status.enum";
import { Driver } from "src/users/drivers/entities/driver.entity";
import { Passenger } from "src/users/passengers/entities/passenger.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    pickupPoint: string;

    @Column()
    dropoffPoint: string;

    @Column('decimal', { precision: 10, scale: 2 })
    distance: number;

    @Column('decimal', { precision: 10, scale: 2})
    suggestedFare: number;

    @Column('decimal', { precision: 10, scale: 2 })
    adminCommission: number;

    @Column()
    country: string;

    @Column('enum', {enum: PaymentStatus, default: PaymentStatus.Unpaid})
    paymentStatus: string;

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Passenger, passenger => passenger.bookings)
    passenger: Passenger;

    @ManyToOne(() => Driver, driver => driver.bookings)
    driver: Driver;
}
