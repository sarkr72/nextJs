import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Job Tracker
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        Simple FSM-style app for practice.
      </p>

      <div className="mt-4">
        <Link
          href="/jobs"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Go to Jobs
        </Link>
      </div>
    </main>
  );
}
