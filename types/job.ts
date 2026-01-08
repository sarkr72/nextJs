// types/job.ts
export type JobStatus = 'pending' | 'scheduled' | 'completed';

export type Job = {
  id: number;
  title: string;
  customerName: string;
  status: JobStatus;
  createdAt: string; 
};
