import { Status } from "src/shared/enums/status.enum";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('superadmins')
export class Superadmin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    // @Column()
    // phoneNumber: string;

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @Column({ nullable: true })
    profilePicture: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
