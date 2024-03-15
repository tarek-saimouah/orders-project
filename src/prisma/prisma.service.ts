import {
  Injectable,
  OnModuleInit,
  INestApplication,
  Logger,
} from '@nestjs/common';

import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger: Logger = new Logger(PrismaService.name);
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'info' },
      ],
    });
    this.$on('error' as never, async (e: Prisma.LogEvent) => {
      this.logger.error(
        { time: e.timestamp.getTime(), target: e.target },
        e.message,
      );
    });
    this.$on('warn' as never, async (e: Prisma.LogEvent) => {
      this.logger.warn(
        { time: e.timestamp.getTime(), target: e.target },
        e.message,
      );
    });
    this.$on('info' as never, async (e: Prisma.LogEvent) => {
      this.logger.log(
        { time: e.timestamp.getTime(), target: e.target },
        e.message,
      );
    });
    this.$on('query' as never, async (e: Prisma.QueryEvent) => {
      this.logger.debug(
        {
          time: e.timestamp.getTime(),
          params: e.params,
          duration: e.duration,
        },
        e.query,
      );
      //console.log('Query: ' + e.query);
      //console.log('Params: ' + e.params);
      //console.log('Duration: ' + e.duration + 'ms');
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}
