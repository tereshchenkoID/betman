export const date = (data, type) => {
  const value = new Date(Number(data))
  const day = String(value.getDate()).padStart(2, '0')
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const year = value.getFullYear()
  const hours = String(value.getHours()).padStart(2, '0')
  const minutes = String(value.getMinutes()).padStart(2, '0')
  const seconds = String(value.getSeconds()).padStart(2, '0')

  switch (type) {
    case 0: return `${hours}:${minutes}:${seconds}`
    case 1: return `${minutes}:${seconds}`
    case 2: return `${year}-${month}-${day}T${hours}:${minutes}`
    case 3: return `${day}/${month}/${year}`
    case 4: return `${month}/${year}`
    case 5: return `${day}/${year}`
    case 6: return `${hours}:${minutes}`
    default: return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
  }
}
