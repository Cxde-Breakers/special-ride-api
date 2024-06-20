import { Booking } from "src/bookings/entities/booking.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('passengers')
export class Passenger {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Booking, booking => booking.driver)
    bookings: Booking[];

    @OneToOne(() => User)
    user: User;
}
