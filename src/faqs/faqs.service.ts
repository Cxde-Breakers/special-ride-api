import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from './entities/faq.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Faq) private readonly faqRepository: Repository<Faq>,
  ) { }

  async create(createFaqDto: CreateFaqDto) {
    try {
      const faq = this.faqRepository.create({
        ...createFaqDto
      });

      await this.faqRepository.save(faq);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'FAQ created successfully',
        data: faq
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const faqs = await this.faqRepository.find();

      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'FAQs retrieved successfully',
        data: faqs
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const faq = await this.faqRepository.findOneBy({id});

      if (!faq) {
        throw new NotFoundException('FAQ not found');
      }

      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'FAQ retrieved successfully',
        data: faq
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    try {
      const faq = await this.faqRepository.findOneBy({ id });

      if (!faq) {
        throw new NotFoundException('FAQ not found');
      }

      await this.faqRepository.update(faq.id, {
        ...updateFaqDto
      });

      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'FAQ was updated successfully'
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
      const faq = await this.faqRepository.findOneBy({ id })

      if (!faq) {
        throw new NotFoundException('FAQ not found')
      }

      await this.faqRepository.remove(faq);

      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'FAQ was deleted successfully'
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
