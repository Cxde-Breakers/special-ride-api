import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import e from 'express';
import { Status } from 'src/shared/enums/status.enum';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) { }

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const transaction = this.transactionRepository.create({
        ...createTransactionDto
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

  async findAll() {
    try {
      const transactions = await this.transactionRepository.find();

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
        ...updateTransactionDto
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
