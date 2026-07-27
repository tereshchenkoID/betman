import { useTranslations } from 'next-intl'

import Action from '@/components/Action'
import Uploader from './Uploader'

import style from '../index.module.scss'

const Verification = ({
  settings,
  filter,
  handleSubmit,
  handleReset,
  uploadedPhotos,
  handlePhotoUpload
}) => {
  const t = useTranslations()

  const allPhotosHaveType = uploadedPhotos.every(photo => photo.type)
  const hasNewPhotos = uploadedPhotos.length > 0

  const isSave = hasNewPhotos && allPhotosHaveType

  return (
    <form
      onSubmit={handleSubmit}
      className={style.grid}
    >
      <div className={style.grid}>
        {
          filter.profile.isVerify < 3 &&
          <Uploader
            data={uploadedPhotos}
            onChange={handlePhotoUpload}
            settings={settings}
          />
        }
        <div className={style.actions}>
          <Action
            classes={['secondary', 'lg']}
            placeholder={t('reset')}
            onChange={handleReset}
            isDisabled={!hasNewPhotos}
          />
          <Action
            type={'submit'}
            placeholder={t('save')}
            isDisabled={!isSave}
          />
        </div>
      </div>
    </form>
  )
}

export default Verification
