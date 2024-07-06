import { Country } from "src/countries/entities/country.entity";
import { Status } from "src/shared/enums/status.enum";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('superadmins')
export class Superadmin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @ManyToOne(() => Country, country => country.superadmins)
    country: Country;

    @OneToOne(() => User)
    user: User;
}
