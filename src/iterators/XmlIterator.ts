import * as fs from 'fs';
import { UserData } from '../data/UserData';

export class XmlIterator implements Iterable<UserData> {
  private users: UserData[] = [];

  constructor(path: string) {
    const xml = fs.readFileSync(path, 'utf-8');
    const matches = [...xml.matchAll(/<user>[\s\S]*?<id>(.*?)<\/id>[\s\S]*?<name>(.*?)<\/name>[\s\S]*?<email>(.*?)<\/email>[\s\S]*?<phone>(.*?)<\/phone>[\s\S]*?<\/user>/g)];

    for (const match of matches) {
      const [, id, name, email, phone] = match;
      this.users.push({ id: +id, name, email, phone });
    }
  }

  *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.users) {
      yield user;
    }
  }
}
