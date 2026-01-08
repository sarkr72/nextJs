import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { JobStatus } from '@/types/job';

type CreateJobBody = {
  title: string;
  customerName: string;
};

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const serialized = jobs.map((job) => ({
      ...job,
      createdAt: job.createdAt.toISOString(),
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error('GET /api/jobs error', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateJobBody>;

    if (!body.title || !body.customerName) {
      return NextResponse.json(
        { error: 'Title and customerName are required' },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        title: body.title,
        customerName: body.customerName,
        status: 'pending' as JobStatus,
      },
    });

    return NextResponse.json(
      { ...job, createdAt: job.createdAt.toISOString() },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/jobs error', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
