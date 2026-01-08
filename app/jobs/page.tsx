import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { JobTable } from '@/app/components/JobTable';
import { Job } from '@/types/job';

export const dynamic = 'force-dynamic';

async function getJobs(): Promise<Job[]> {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return jobs.map((job) => ({
    id: job.id,
    title: job.title,
    customerName: job.customerName,
    status: job.status as Job['status'],
    createdAt: job.createdAt.toISOString(),
  }));
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Jobs
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage jobs for your field service team.
          </p>
        </div>
        <Link
          href="/jobs/new"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          New Job
        </Link>
      </div>

      <JobTable jobs={jobs} />
    </main>
  );
}
