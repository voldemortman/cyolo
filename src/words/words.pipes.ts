import { Injectable, PipeTransform } from '@nestjs/common';
import { PostWordsDTO } from './words.types';

@Injectable()
export class ParseWordListPipe
  implements PipeTransform<PostWordsDTO, string[]>
{
  transform(value: PostWordsDTO): string[] {
    if (!value) {
      return [];
    }
    const wordList = value.words.split(',').map((word) => word.trim());
    return wordList;
  }
}
