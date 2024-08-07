import { Status } from "../../shared/enums/status.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('settings')
export class Setting {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    siteLogo: string;

    @Column()
    seoImage: string;

    @Column()
    favicon: string;

    @Column()
    appName: string;

    @Column()
    appVersion: string;

    @Column()
    siteName: string;

    @Column()
    siteTitle: string;

    @Column()
    seoMetaDescription: string;

    @Column()
    seoKeywords: string;

    @Column()
    mainMotto: string;

    @Column()
    termsAndConditions: string;

    @Column()
    privacyPolicy: string;

    @Column()
    licenses: string;

    @Column('enum', { enum: Status, default: Status.Active })
    status: Status;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
