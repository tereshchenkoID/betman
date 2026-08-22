'use client'

import { useTransition, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import { ROUTES_USER, USER_VERIFY } from '@/constant/config'

import { useFilterState } from '@/hooks/useFilterState'
import { compress } from '@/helpers/compress'
import { toast } from '@/utils/toast'

import { action } from './action'

import Tabs from '@/modules/Tabs'
import Notification from '@/modules/Notification'
import Loader from '@/components/Loader'
import General from './General'
import Address from './Address'
import Verification from './Verification'
import Security from './Security'

import style from './index.module.scss'

const SectionAccountProfile = ({
  settings,
  data,
  user,
  countries,
  tab,
  children
}) => {
  const t = useTranslations()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [uploadedPhotos, setUploadedPhotos] = useState([])
  const [_, setIsCompressing] = useState(false)

  const { filter, setFilter, handlePropsChange } = useFilterState(data)

  const OPTIONS = [
    {
      key: 'profile',
      value: 0,
      ...(user?.level === '1' && {
        verification: user?.level,
      }),
    },
    {
      key: 'address',
      value: 1,
    },
    {
      key: 'verification',
      value: 2,
      ...((user?.level === '1' || user?.level === '2') && {
        verification: user?.level,
      }),
    },
    {
      key: 'security',
      value: 3,
    },
  ]

  const active = OPTIONS.find(opt => opt.key === tab) || OPTIONS[0]

  const handleActive = (el) => {
    setFilter(data)
    setUploadedPhotos([])

    startTransition(() => {
      router.push(`${ROUTES_USER.profile.url}/${el.key}`, { scroll: false })
    })
  }

  const handleSubmit = async (e) => {
    e?.preventDefault()

    const params = { data: filter }

    if (uploadedPhotos.length > 0) {
      setIsCompressing(true)
      try {
        const compressedPhotos = await Promise.all(
          uploadedPhotos.map(async (item) => {
            if (!item.file) return item
            const compressedFile = await compress(item.file)
            return { ...item, file: compressedFile }
          })
        )

        compressedPhotos.forEach((item, index) => {
          if (item.file) {
            params[`file-${index + 1}`] = item.file
            params[`type-${index + 1}`] = item.type?.value || ''
          }
        })
      } catch (err) {
        toast.error('Error processing images')
        return
      } finally {
        setIsCompressing(false)
      }
    }

    startTransition(async () => {
      const res = await action(params)

      if (res?.code === '0') {
        toast.success(res?.message || t('success'))
        setUploadedPhotos([])
      } else {
        toast.error(res?.error_message || t('error'))
      }
    })
  }

  const handleReset = () => {
    setFilter(data)
    setUploadedPhotos([])
  }

  return (
    <>
      <section>
        <Tabs
          options={OPTIONS}
          data={active}
          action={handleActive}
        />
      </section>
      <section className={style.section}>
        <div className={style.container}>
          {
            isPending
              ?
                <Loader />
              :
                <>
                  {
                    active.value === 0 &&
                    <General
                      user={user}
                      initial={data}
                      filter={filter}
                      handlePropsChange={handlePropsChange}
                      handleSubmit={handleSubmit}
                      handleReset={handleReset}
                    />
                  }
                  {
                    active.value === 1 &&
                    <Address
                      initial={data}
                      filter={filter}
                      countries={countries?.data}
                      handlePropsChange={handlePropsChange}
                      handleSubmit={handleSubmit}
                      handleReset={handleReset}
                    />
                  }
                  {
                    active.value === 2 &&
                    <Verification
                      initial={data}
                      filter={filter}
                      settings={settings}
                      handlePropsChange={handlePropsChange}
                      handleSubmit={handleSubmit}
                      handleReset={handleReset}
                      handlePhotoUpload={setUploadedPhotos}
                      uploadedPhotos={uploadedPhotos}
                    />
                  }
                  {
                    active.value === 3 &&
                    <Security
                      initial={data}
                      filter={filter}
                      handlePropsChange={handlePropsChange}
                      handleSubmit={handleSubmit}
                      handleReset={handleReset}
                    />
                  }
                  <div>
                    {
                      active?.key === 'verification' &&
                      <>
                        <Notification
                          text={t(`verify_status.${USER_VERIFY[filter?.profile?.isVerify]}`)}
                          type={filter?.profile?.isVerify < 3 ? 'error' : 'success'}
                        />
                        <br />
                      </>
                    }
                    {children}
                  </div>
                </>
              }
        </div>
      </section>
    </>
  )
}

export default SectionAccountProfile
