export const format = (
  value,
  options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
) => {
  const num = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(num)) return String(value ?? '')

  return num.toLocaleString('en-US', options)
}
