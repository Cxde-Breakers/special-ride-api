import { Country } from "src/countries/entities/country.entity";
import { Status } from "src/shared/enums/status.enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('admins')
export class Admin { 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    phoneNumber: string;

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @ManyToOne(() => Country, country => country.admins)
    country: Country;
}
