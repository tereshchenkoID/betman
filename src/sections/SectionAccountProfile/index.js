'use client'

import { startTransition, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { USER_VERIFY } from '@/constant/config'

import { useFilterState } from '@/hooks/useFilterState'
import { compress } from '@/helpers/compress'
import { toast } from '@/utils/toast'

import { action } from './action'

import Tabs from '@/modules/Tabs'
import Notification from '@/modules/Notification'
import General from './General'
import Address from './Address'
import Verification from './Verification'
import Security from './Security'

import style from './index.module.scss'

const DATA = [
  {
    key: 'profile',
    value: 0,
  },
  {
    key: 'address',
    value: 1,
  },
  {
    key: 'verification',
    value: 2,
  },
  {
    key: 'security',
    value: 3,
  },
]

const SectionAccountProfile = ({
  user,
  countries,
  data,
  settings,
  children
}) => {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [uploadedPhotos, setUploadedPhotos] = useState([])
  const [isCompressing, setIsCompressing] = useState(false)

  const { filter, setFilter, handlePropsChange } = useFilterState(data)

  const current = searchParams.get('tab') || DATA[0]?.key
  const active = useMemo(() => {
    return DATA.find((item) => item.key === current) || DATA[0]
  }, [current])

  const handleTabChange = (selectedTab) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', selectedTab.key)

    setFilter(data)
    setUploadedPhotos([])

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleSubmit = async (e) => {
    e && e.preventDefault()

    const params = {
      data: filter,
    }

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
        setIsCompressing(false)
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

  const handlePhotoUpload = (files) => {
    setUploadedPhotos(files)
  }

  return (
    <div className={style.block}>
      <Tabs
        options={DATA}
        data={active}
        action={handleTabChange}
      />
      <div className={style.container}>
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
            handlePhotoUpload={handlePhotoUpload}
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
              <br/>
            </>
          }
          {children}
        </div>
      </div>
    </div>
  )
}

export default SectionAccountProfile
