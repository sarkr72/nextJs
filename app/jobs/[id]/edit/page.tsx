import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { JobForm } from '@/app/components/JobForm';
import { Job } from '@/types/job';

type Props = {
  params: Promise<{ id: string }>;
};

async function getJob(id: number): Promise<Job | null> {
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) return null;

  return {
    id: job.id,
    title: job.title,
    customerName: job.customerName,
    status: job.status as Job['status'],
    createdAt: job.createdAt.toISOString(),
  };
}

export default async function EditJobPage({ params }: Props) {
  const { id } = await params;        
  const jobId = Number(id);

  if (!Number.isInteger(jobId)) {
    return (
      <main className="p-8">
        <p className="text-red-600">Invalid job ID</p>
      </main>
    );
  }

  const job = await getJob(jobId);

  if (!job) {
    return (
      <main className="p-8">
        <p className="text-red-600">Job not found</p>
        <Link href="/jobs">Back</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <JobForm mode="edit" initialJob={job} />
    </main>
  );
}
