import { findLoggedInUser } from '../../_services/auth.service';
import { getRequestByIdAndUser } from '../../_services/request.service';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ requestId: string }> }
): Promise<Response> {
  const user = await findLoggedInUser();
  if (!user) {
    return new Response(null, { status: 401 });
  }

  const { requestId } = await params;
  const request = await getRequestByIdAndUser(requestId, user);
  if (!request) {
    return new Response(null, { status: 404 });
  }

  return Response.json(request, { status: 200 });
}
