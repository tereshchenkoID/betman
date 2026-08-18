export const mergeCredits = (prev, incoming) => {
  const payload = incoming?.credits || incoming
  return {
    ...prev,
    ...payload,
    bonus: payload?.bonus ? { ...prev?.bonus, ...payload.bonus } : prev?.bonus,
  }
}
