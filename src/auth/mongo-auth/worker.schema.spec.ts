import { WorkerSchema } from './worker.schema';

describe('WorkerSchema', () => {
  it('should be defined', () => {
    expect(new WorkerSchema()).toBeDefined();
  });
});
