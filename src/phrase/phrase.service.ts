import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Phrase } from './phrase.entity';

@Injectable()
export class PhraseService {
  public constructor(
    @InjectRepository(Phrase)
    private readonly phraseRepository: Repository<Phrase>,
  ) {}

  public async getRandomPhrase(lang: 'en' | 'ua'): Promise<string | undefined> {
    const row = await this.phraseRepository
      .createQueryBuilder()
      .select('phrase')
      .from(Phrase, 'phrase')
      .where('phrase.lang=:lang', { lang })
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();

    return row?.phrase;
  }
}
