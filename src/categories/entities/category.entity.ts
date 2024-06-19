import { Subcategory } from "src/subcategories/entities/subcategory.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @Column({ default: true })
    status: boolean;

    @Column()
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Subcategory, subcategory => subcategory.category)
    subcategories: Subcategory[];
}