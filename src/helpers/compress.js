import imageCompression from 'browser-image-compression'

import { consoleHelper } from '@/helpers/console'

export const compress = async (file) => {
  if (!file || !file.type.startsWith('image/') || file.size <= 1024 * 1024) {
    return file
  }

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: file.type,
  }

  try {
    const compressedBlob = await imageCompression(file, options)

    return new File([compressedBlob], file.name, {
      type: file.type,
      lastModified: Date.now(),
    })
  } catch (error) {
    consoleHelper.error('Compress error:', error)
    return file
  }
}
