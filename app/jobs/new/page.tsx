import Link from 'next/link';
import { JobForm } from '@/app/components/JobForm';

export default function NewJobPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white-900">
            New Job
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Create a new job for a customer.
          </p>
        </div>
        <Link
          href="/jobs"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Back to Jobs
        </Link>
      </div>

      <JobForm mode="create" />
    </main>
  );
}
