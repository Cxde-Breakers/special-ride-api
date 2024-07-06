import { Booking } from "src/bookings/entities/booking.entity";
import { Country } from "src/countries/entities/country.entity";
import { User } from "src/users/entities/user.entity";
import { Gender } from "src/users/enums/gender.enum";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


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

    @Column()
    age: number;

    @Column('enum', { enum: Gender })
    gender: Gender;

    @Column()
    idFront: string;

    @Column()
    idBack: string;

    @Column()
    address: string;

    @OneToMany(() => Booking, booking => booking.passenger)
    bookings: Booking[];

    @OneToOne(() => User)
    user: User;

    @ManyToOne(() => Country, country => country.passengers)
    country: Country;
}
