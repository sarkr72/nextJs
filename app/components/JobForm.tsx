'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Job, JobStatus } from '@/types/job';

type JobFormProps = {
  mode: 'create' | 'edit';
  initialJob?: Job;
};

export function JobForm({ mode, initialJob }: JobFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialJob?.title ?? '');
  const [customerName, setCustomerName] = useState(
    initialJob?.customerName ?? '',
  );
  const [status, setStatus] = useState<JobStatus>(
    (initialJob?.status as JobStatus) ?? 'pending',
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = mode === 'edit';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const url = isEdit ? `/api/jobs/${initialJob?.id}` : '/api/jobs';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isEdit ? { title, customerName, status } : { title, customerName },
        ),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || 'Something went wrong');
        return;
      }

      router.push('/jobs');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 max-w-lg rounded border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <input
          type="text"
          className="w-full dark:text-gray-800 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Customer Name
        </label>
        <input
          type="text"
          className="w-full dark:text-gray-800 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>

      {isEdit && (
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={status}
            onChange={(e) => setStatus(e.target.value as JobStatus)}
          >
            <option value="pending">pending</option>
            <option value="scheduled">scheduled</option>
            <option value="completed">completed</option>
          </select>
        </div>
      )}

      {error && (
        <p className="mb-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {submitting
          ? isEdit
            ? 'Saving...'
            : 'Creating...'
          : isEdit
          ? 'Save Changes'
          : 'Create Job'}
      </button>
    </form>
  );
}
