
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from '../../entities/user.entity';
import { Booking } from "src/bookings/entities/booking.entity";
import { Gender } from "src/users/enums/gender.enum";
import { Country } from "src/countries/entities/country.entity";
import { Category } from "src/categories/entities/category.entity";
import { Subcategory } from "src/subcategories/entities/subcategory.entity";

@Entity('drivers')
export class Driver {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column('enum', { enum: Gender })
    gender: Gender;

    @Column()
    address: string;

    @Column({ unique: true })
    registrationNumber: string;

    @Column({ unique: true })
    plateNumber: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
    balance: number;

    @Column({ unique: true })
    phoneNumber: string;

    @Column({ default: 0 })
    totalRides: number;

    @Column()
    age: number;

    @Column()
    vehicle: string;

    @Column()
    color: string;

    @Column()
    idFront: string;

    @Column()
    idBack: string;

    @Column({ nullable: true })
    profilePicture: string;

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
    @JoinColumn()
    user: User;

    @OneToMany(() => Booking, booking => booking.driver)
    bookings: Booking[];

    @ManyToOne(() => Country, country => country.drivers)
    country: Country;

    @ManyToOne(() => Category, category => category.drivers)
    category: Category;

    @ManyToOne(() => Subcategory, subcategory => subcategory.drivers)
    subcategory: Subcategory;
}
