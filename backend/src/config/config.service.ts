import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

@Injectable()
export class ConfigService {
  private readonly env = process.env as Record<string, string>;

  constructor() {
    this.validate();
  }

  private validate() {
    const required = ['PORT', 'DATABASE_URL'];
    const missing = required.filter((key) => !this.env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing environment variables: ${missing.join(', ')}`);
    }
  }

  get(key: string): string {
    return this.env[key];
  }

  getNumber(key: string): number | undefined {
    const value = this.get(key);
    if (!value) {
      return undefined;
    }
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      throw new Error(`Environment variable ${key} must be a number`);
    }
    return parsed;
  }
}
