import { Category } from "../../categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Country } from "./country.entity";
import { Subcategory } from "../../subcategories/entities/subcategory.entity";

@Entity()
export class CountryPerKmCost {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
    perKmPrice: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
    minPrice: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Country, country => country.countryPerKmCost)
    country: Country;

    @OneToOne(() => Category)
    category: Category;

    @OneToOne(() => Subcategory)
    subcategory: Subcategory;


}