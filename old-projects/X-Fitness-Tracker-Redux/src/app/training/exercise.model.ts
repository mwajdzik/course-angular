import * as moment from 'moment';

export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: moment.Moment;
  state?: 'completed' | 'cancelled' | null;
}
