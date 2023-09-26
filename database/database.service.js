import { PrismaClient } from "@prisma/client";

export class DatabaseService extends PrismaClient {
  async init() {
    await this.$connect();
  }
}
