import { Gender } from "src/users/enums/gender.enum";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from '../../entities/user.entity';
import { Booking } from "src/bookings/entities/booking.entity";

@Entity('drivers')
export class Driver {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    registrationNumber: string;

    @Column({ unique: true })
    plateNumber: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
    balance: number;

    @Column({ unique: true })
    phoneNumber: string;

    @Column()
    registrationDate: Date;

    @Column({ default: 0 })
    totalRides: number;

    @Column()
    country: string;

    @Column('decimal', { precision: 10, scale: 6 })
    latitude: number;

    @Column('decimal', { precision: 10, scale: 6 })
    longitude: number;

    @Column()
    age: number;

    @Column('enum', { enum: Gender })
    gender: Gender;

    @Column()
    vehicle: string;

    @Column()
    color: string;

    @Column()
    idFront: string;

    @Column()
    idBack: string;

    @Column()
    vehiclePhoto: string;

    @Column()
    vehicleRegistrationPhotoFront: string;

    @Column()
    vehicleRegistrationPhotoBack: string;

    @Column()
    driversLicensePhotoFront: string;

    @Column()
    driversLicensePhotoBack: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => User)
    user: User;

    @OneToMany(() => Booking, booking => booking.driver)
    bookings: Booking[];
}
