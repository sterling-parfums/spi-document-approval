import { enqueueSnackbar } from 'notistack';
import { ApprovalResponse } from '../_services/approval.service';
import { UserMinimalResponse } from '../_services/user.service';
import { apiFetch } from './apiFetch';
import { getSignedFile } from './file.client';

export async function approveRequest(requestId: string) {
  const res = await apiFetch(`/api/requests/${requestId}/approve`, {
    method: 'POST',
  });

  if (!res.ok) {
    return { success: false, status: res.status };
  }

  const approval = await res.json();

  const signed = await getSignedFile(requestId);

  if (!signed.success) {
    enqueueSnackbar('Unable to generate signed file', { variant: 'warning' });
  }

  return { success: true, status: res.status, data: approval };
}

export async function rejectRequest(requestId: string) {
  const res = await apiFetch(`/api/requests/${requestId}/reject`, {
    method: 'POST',
  });

  if (!res.ok) {
    return { success: false, status: res.status };
  }

  const rejection = await res.json();

  return { success: true, data: rejection };
}

type ApprovalResult =
  | { success: true; data: ApprovalResponse[]; canApprove: boolean }
  | { success: false; status: number };

export async function getApprovalsForRequest(
  requestId: string
): Promise<ApprovalResult> {
  const res = await apiFetch(`/api/requests/${requestId}/approvals`);
  if (!res.ok) {
    return { success: false, status: res.status };
  }

  const json = await res.json();

  return {
    success: true,
    data: json.data,
    canApprove: json.canApprove,
  };
}

type ApproversResult =
  | { success: true; data: UserMinimalResponse[] }
  | { success: false; status: number };

export async function getApproversForRequest(
  requestId: string
): Promise<ApproversResult> {
  const res = await apiFetch(`/api/requests/${requestId}/approvals`);
  if (!res.ok) {
    return { success: false, status: res.status };
  }

  const json = (await res.json()) as { data: ApprovalResponse[] };

  const approvers: UserMinimalResponse[] = json.data.map((a) => ({
    name: a.approver.name,
    id: a.approver.id,
  }));

  return {
    success: true,
    data: approvers,
  };
}
