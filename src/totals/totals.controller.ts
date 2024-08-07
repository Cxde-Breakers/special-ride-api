import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { TotalsService } from './totals.service';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';

@Roles(Role.SuperAdmin)
@Controller('totals')
export class TotalsController {
    constructor(private readonly totalsService: TotalsService) { }

    @HttpCode(HttpStatus.OK)
    @Get()
    totals() {
        return this.totalsService.totals();
    }

}
