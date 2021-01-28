import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phrase } from './phrase.entity';

@Injectable()
export class PhraseService {
  constructor(
    @InjectRepository(Phrase) private PhraseRepository: Repository<Phrase>,
  ) {}

  async getRandomPhrase(lang: 'en' | 'ua') {
    const row = await this.PhraseRepository.createQueryBuilder()
      .select('phrase')
      .from(Phrase, 'phrase')
      .where('phrase.lang=:lang', { lang })
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();

    return row?.phrase;
  }
}
