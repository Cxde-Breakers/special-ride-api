import { Status } from "../../shared/enums/status.enum";
import { Subcategory } from "../../subcategories/entities/subcategory.entity";
import { Driver } from "../../users/drivers/entities/driver.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @Column({ nullable: true })
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Subcategory, subcategory => subcategory.category)
    subcategories: Subcategory[];

    @OneToMany(() => Driver, driver => driver.category)
    drivers: Driver[];
}