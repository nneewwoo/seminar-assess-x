import { sha256 } from '@oslojs/crypto/sha2'
import {
  encodeBase32LowerCaseNoPadding,
  encodeBase64url,
  encodeHexLowerCase
} from '@oslojs/encoding'
import type { User, Session } from '@prisma/client'
import prisma from './prisma'
import type { RequestEvent } from '@sveltejs/kit'

const DAY_IN_MS = 1000 * 60 * 60 * 24

const generateSessionToken = (): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

const createSession = async (
  token: string,
  userId: string
): Promise<Session> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
  }
  await prisma.session.create({ data: session })

  return session
}

const validateSessionToken = async (token: string) => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const result = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true }
  })

  if (!result) {
    return { session: null, user: null }
  }

  const { user, ...session } = result

  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } })
    return { session: null, user: null }
  }

  if (Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15) {
    session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30)
    await prisma.session.update({
      where: { id: session.id },
      data: { expiresAt: session.expiresAt }
    })
  }
  return { session, user }
}

const invalidateSession = async (sessionId: string) => {
  await prisma.session.delete({ where: { id: sessionId } })
}

type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>

export {
  generateSessionToken,
  createSession,
  validateSessionToken,
  invalidateSession,
  type SessionValidationResult
}
