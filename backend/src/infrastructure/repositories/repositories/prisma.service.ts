import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { APP_DATABASE } from '../../../app.constants';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
      datasources: {
        db: {
          url: APP_DATABASE,
        },
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //     "query",
    //     (e: { query: string; params: string[]; duration: number }) => {
    //         if (e.duration > 2000) {
    //             logger.log(
    //                 `Query: ${e.query};\nParams: ${e.params};\nDuration: ${e.duration}ms\n\n`,
    //             );
    //             return;
    //         }
    //         if (e.query.includes(`SELECT "public"."faults"`)) {
    //             logger.log(
    //                 `FAILURE QUERY: ${e.query};\nParams: ${e.params};\nDuration: ${e.duration}ms\n\n`,
    //             );
    //         }
    //     },
    // );
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async onApplicationShutdown() {
    await this.$disconnect();
  }
}
