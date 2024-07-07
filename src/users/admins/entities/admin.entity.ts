import { Country } from "src/countries/entities/country.entity";
import { Status } from "src/shared/enums/status.enum";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('admins')
export class Admin { 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    profilePicture: string;

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @ManyToOne(() => Country, country => country.admins)
    country: Country;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
