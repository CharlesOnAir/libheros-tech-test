import { BaseEntity } from 'src/utils/types';

export interface TaskList extends BaseEntity {
  title: string;
  description: string;
}
