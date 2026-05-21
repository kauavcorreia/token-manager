import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueAlgorithmService {
  private readonly queue: string[] = [];

  enqueue(ticketId: string) {
    if (!this.queue.includes(ticketId)) {
      this.queue.push(ticketId);
    }
    return this.queue;
  }

  dequeue() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }

  reorder(priorityTicketIds: string[]) {
    const remaining = this.queue.filter((id) => !priorityTicketIds.includes(id));
    this.queue.splice(0, this.queue.length, ...priorityTicketIds, ...remaining);
  }
}
