import { Booking } from "src/bookings/entities/booking.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('passengers')
export class Passenger {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    phoneNumber: string;

    @OneToMany(() => Booking, booking => booking.passenger)
    bookings: Booking[];

    @OneToOne(() => User)
    user: User;
}
