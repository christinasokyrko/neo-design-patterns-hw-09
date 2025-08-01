import { DataExporter } from './DataExporter';
import * as fs from 'fs';

export class CsvExporter extends DataExporter {
  protected render(): void {
    const header = 'id,name,email,phone';
    const rows = this.data.map(u =>
      `${u.id},${u.name},${u.email},${u.phone}`
    );
    this.result = [header, ...rows].join('\n');
  }

  protected save(): void {
    fs.writeFileSync('./dist/users.csv', this.result, 'utf-8');
  }
}

