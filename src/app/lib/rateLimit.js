const attempts = new Map()

export function checkRateLimit(key, { max = 5, windowMs = 60_000 } = {}) {
  const now = Date.now()
  const record = attempts.get(key) ?? { count: 0, resetAt: now + windowMs }

  if (now > record.resetAt) {
    record.count = 0
    record.resetAt = now + windowMs
  }

  record.count += 1
  attempts.set(key, record)

  return {
    allowed: record.count <= max,
    remaining: Math.max(0, max - record.count),
    resetAt: record.resetAt,
  }
}
