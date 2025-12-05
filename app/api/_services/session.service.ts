import { UserSession } from '@/generated/prisma/client';

export function isSessionExpired(session: UserSession): boolean {
  if (!session.expiresAt) return false;
  return session.expiresAt < new Date();
}
