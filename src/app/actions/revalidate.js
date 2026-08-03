'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateAction(tag) {
  if (tag) {
    revalidateTag(tag, 'max')
    return { success: true }
  }
  return { success: false }
}
