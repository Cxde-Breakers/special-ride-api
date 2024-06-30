import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Between, FindOptionsWhere, Like, Repository } from 'typeorm';
import { Status } from 'src/shared/enums/status.enum';
import { ActiveUserData } from 'src/iam/interfaces/active-user.interface';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { TransactionQueryDto } from './dto/transaction-query.dto';
import { Role } from 'src/users/enums/role.enum';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) { }

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const transaction = this.transactionRepository.create({
        ...createTransactionDto,
        paymentBy: {
          id: createTransactionDto.paymentBy
        }
      });

      await this.transactionRepository.save(transaction);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Transaction created successfully',
        data: transaction
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(transactionQuery: TransactionQueryDto, paginationQuery: PaginationQueryDto, activeUser: ActiveUserData) {
    const { limit, offset } = paginationQuery;
    const { paymentMethod, amountPaidMin, amountPaidMax, country, paymentBy } = transactionQuery;

    try {
      const conditions: FindOptionsWhere<Transaction> | FindOptionsWhere<Transaction[]> = {
        ...(paymentMethod ? { paymentMethod: Like(`%${paymentMethod}%`) } : {}),
        ...(amountPaidMin && amountPaidMax ? { amountPaid: Between(amountPaidMin, amountPaidMax) } : {}),
        ...(country ? { country: Like(`%${country}%`) } : {}),
        ...(paymentBy ? { paymentBy: { id: paymentBy } } : {}),
        ...(activeUser.role === Role.Driver ? { paymentBy: { id: activeUser.sub } } : {}),
        ...(activeUser.role === Role.Passenger ? { paymentBy: { id: activeUser.sub } } : {}),
      }

      const transactions = await this.transactionRepository.find({
        where: conditions,
        take: limit,
        skip: offset,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Transactions retrieved successfully',
        data: transactions
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findOne(id: string) {
    try {
      const transaction = this.transactionRepository.findOneBy({ id });

      if (!transaction) {
        throw new NotFoundException(`Transaction not found`);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Transaction retrieved successfully',
        data: transaction
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    try {
      const transaction = await this.transactionRepository.findOneBy({ id });

      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      await this.transactionRepository.update(
        transaction.id, {
          ...updateTransactionDto,
          paymentBy: {
            id: updateTransactionDto.paymentBy
          }
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Transaction updated successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
   try {
     const transaction = await this.transactionRepository.findOneBy({ id });
     
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
     }
     
     await this.transactionRepository.update(transaction.id, {
        status: Status.Inactive
      });
   } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
     }
     throw new BadRequestException(error.message);
   }
  }
}
