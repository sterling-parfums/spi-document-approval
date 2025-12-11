import { findLoggedInUser } from '@/app/api/_services/auth.service';
import { prisma } from '@/app/api/prisma';

export async function POST(
  _: unknown,
  { params }: { params: Promise<{ requestId: string }> }
): Promise<Response> {
  const user = await findLoggedInUser();
  if (!user) {
    return new Response(null, { status: 401 });
  }

  const { requestId } = await params;
  const request = await prisma.request.findUnique({
    where: {
      id: requestId,
      approvals: { some: { approverId: user.id } },
    },
    include: { approvals: { include: { approver: true } } },
  });

  if (!request) {
    return new Response(null, { status: 404 });
  }

  await prisma.approval.updateMany({
    where: {
      requestId: requestId,
      approverId: user.id,
    },
    data: {
      decision: 'PENDING',
      updatedAt: new Date(),
    },
  });

  return Response.json(null, { status: 204 });
}
