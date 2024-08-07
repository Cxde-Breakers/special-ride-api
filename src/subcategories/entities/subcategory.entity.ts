import { Category } from "../../categories/entities/category.entity";
import { Status } from "../../shared/enums/status.enum";
import { Driver } from "../../users/drivers/entities/driver.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('subcategories')
export class Subcategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Category, category => category.subcategories)
    category: Category;

    @OneToMany(() => Driver, driver => driver.subcategory)
    drivers: Driver[];
}