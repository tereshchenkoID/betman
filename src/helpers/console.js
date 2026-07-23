const styles = {
  info:    'color:#2563eb;font-weight:600',
  success: 'color:#16a34a;font-weight:600',
  warn:    'color:#d97706;font-weight:600',
  error:   'color:#dc2626;font-weight:600',
  reset:   'color:inherit',
}

const time = () =>
  new Date().toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

const log = (type, label) => {
  console.log(
    `[${time()}] %c${label}`,
    styles[type]
  )
}

export const consoleHelper = {
  info:    (label) => log('info', label),
  success: (label) => log('success', label),
  warn:    (label) => log('warn', label),
  error:   (label) => log('error', label),
}
