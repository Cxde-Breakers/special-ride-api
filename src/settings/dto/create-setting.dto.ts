import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateSettingDto {
    @ApiProperty()
    @IsNotEmpty()
    siteLogo: string;

    @ApiProperty()
    @IsNotEmpty()
    seoImage: string;

    @ApiProperty()
    @IsNotEmpty()
    favicon: string;

    @ApiProperty()
    @IsNotEmpty()
    appName: string;

    @ApiProperty()
    @IsNotEmpty()
    appVersion: string;

    @ApiProperty()
    @IsNotEmpty()
    siteName: string;

    @ApiProperty()
    @IsNotEmpty()
    siteTitle: string;

    @ApiProperty()
    @IsNotEmpty()
    seoMetaDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    seoKeywords: string;

    @ApiProperty()
    @IsNotEmpty()
    mainMotto: string;

    @ApiProperty()
    @IsNotEmpty()
    termsAndConditions: string;

    @ApiProperty()
    @IsNotEmpty()
    privacyPolicy: string;

    @ApiProperty()
    @IsNotEmpty()
    licenses: string;
}
