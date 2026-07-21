export const runRules = (value, rules = []) => {
  for (const rule of rules) {
    const err = rule(value)
    if (err) return err
  }
  return null
}
