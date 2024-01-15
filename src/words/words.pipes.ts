import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseWordListPipe implements PipeTransform<string, string[]> {
  transform(value: string): string[] {
    if (!value) {
      return [];
    }
    const wordList = value.split(',').map((word) => word.trim());
    return wordList;
  }
}
