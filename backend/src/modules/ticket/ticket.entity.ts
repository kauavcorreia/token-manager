export interface Ticket {
  id: string;
  token: string;
  type: string;
  status: string;
  createdAt: Date;
  startedAt?: Date;
  finishedAt?: Date;
}
