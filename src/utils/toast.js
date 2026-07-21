import { toast as rtToast } from 'react-toastify'

export const toast = {
  success: (text, options = {}) => rtToast.success(text, options),
  error: (text, options = {}) => rtToast.error(text, options),
  info: (text, options = {}) => rtToast.info(text, options),
}
