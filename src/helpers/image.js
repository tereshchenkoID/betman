export const EMPTY_IMAGE_DATA_URL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export const imageError = (e, fallbackSrc = true) => {
  const img = e?.currentTarget
  if (!img) return

  img.srcset = ''

  if (fallbackSrc) {
    img.dataset.fallbackTried = 'true'
    img.style.objectFit = 'contain'
    img.style.padding = '10%'
    img.src = '/images/logo-desktop.svg'
    return
  }

  img.src = EMPTY_IMAGE_DATA_URL
  img.style.width = 'auto'
}
