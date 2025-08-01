import axios from 'axios';
import { UserData } from '../data/UserData';

export abstract class DataExporter {
  protected data: UserData[] = [];
  protected result: string = '';

  public async export(): Promise<void> {
    await this.load();
    this.transform();
    this.beforeRender();
    this.render();
    this.afterRender();
    this.save();
  }

  private async load(): Promise<void> {
    const response = await axios.get<UserData[]>('https://jsonplaceholder.typicode.com/users');
    this.data = response.data;
  }

  private transform(): void {
    this.data = this.data
      .map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  protected beforeRender(): void {}
  protected abstract render(): void;
  protected afterRender(): void {}
  protected abstract save(): void;
}
