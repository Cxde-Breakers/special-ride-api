import { Booking } from "src/bookings/entities/booking.entity";
import { Country } from "src/countries/entities/country.entity";
import { Status } from "src/shared/enums/status.enum";
import { User } from "src/users/entities/user.entity";
import { Gender } from "src/users/enums/gender.enum";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


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

    @Column({ nullable: true })
    age: number;

    @Column('enum', { enum: Gender, nullable: true })
    gender: Gender;

    @Column({ nullable: true })
    idFront: string;

    @Column({ nullable: true })
    idBack: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    profilePicture: string;

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @OneToMany(() => Booking, booking => booking.passenger)
    bookings: Booking[];

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Country, country => country.passengers)
    country: Country;
}
