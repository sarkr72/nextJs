'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Job } from '@/types/job';

type JobTableProps = {
  jobs: Job[];
};

export function JobTable({ jobs }: JobTableProps) {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Delete this job?');
    if (!confirmed) return;

    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      alert('Failed to delete job');
      return;
    }

    router.refresh();
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: 'short',
      timeStyle: 'short',
    });

  return (
    <div className="mt-4 overflow-x-auto rounded border border-gray-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Title
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Customer
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Status
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Created
            </th>
            <th className="px-4 py-2 text-right font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-4 text-center dark:text-gray-800"
              >
                No jobs yet.
              </td>
            </tr>
          )}
          {jobs.map((job) => (
            <tr key={job.id} className="border-t dark:text-gray-800 border-gray-100">
              <td className="px-4 py-2">{job.title}</td>
              <td className="px-4 py-2">{job.customerName}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-flex rounded px-2 py-1 text-xs font-semibold ${
                    job.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : job.status === 'scheduled'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {job.status}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-500">
                {formatDate(job.createdAt)}
              </td>
              <td className="px-4 py-2 text-right">
                <Link
                  href={`/jobs/${job.id}/edit`}
                  className="mr-2 rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="rounded bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
