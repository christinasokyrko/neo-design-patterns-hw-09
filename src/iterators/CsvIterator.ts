import * as fs from 'fs';
import { UserData } from '../data/UserData';

export class CsvIterator implements Iterable<UserData> {
  private users: UserData[];

  constructor(path: string) {
    const content = fs.readFileSync(path, 'utf-8');
    const [_, ...lines] = content.split('\n');
    this.users = lines
      .filter(Boolean)
      .map(line => {
        const [id, name, email, phone] = line.split(',');
        return { id: +id, name, email, phone };
      });
  }

  *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.users) {
      yield user;
    }
  }
}
