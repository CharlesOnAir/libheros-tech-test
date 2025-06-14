import { BaseEntity } from 'src/utils/types';

export interface TasksList extends BaseEntity {
  title: string;
  description: string;
}
