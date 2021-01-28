import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phrase } from './phrase.entity';
import { PhraseService } from './phrase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Phrase])],
  providers: [PhraseService],
  exports: [PhraseService],
})
export class PhraseModule {}
