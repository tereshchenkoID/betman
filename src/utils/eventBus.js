const eventCache = new Map()

export const eventBus = {
  emit(event, data) {
    eventCache.set(event, data)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(event, { detail: data }))
    }
  },

  subscribe(event, callback) {
    if (typeof window === 'undefined') return () => {}

    const handler = (e) => callback(e.detail)
    window.addEventListener(event, handler)

    if (eventCache.has(event)) {
      callback(eventCache.get(event))
    }

    return () => window.removeEventListener(event, handler)
  },
}
