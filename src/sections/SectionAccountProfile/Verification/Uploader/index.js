import {startTransition, useEffect, useState} from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Select from '@/components/Select'

import style from './index.module.scss'

const Uploader = ({
  id = 'upload',
  data = [],
  onChange,
  settings,
}) => {
  const t = useTranslations()
  const [blobs, setBlobs] = useState([])

  const handlePhotoChange = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newBlobs = []

      for (let i = 0; i < files.length; i++) {
        newBlobs.push({
          file: files[i],
          type: null
        })
      }

      const updatedList = [...blobs, ...newBlobs]
      setBlobs(updatedList)
      onChange(updatedList)
    }

    e.target.value = ''
  }

  const handleTypeChange = (index, selectedValue) => {
    const updatedBlobs = blobs.map((item, idx) => {
      if (idx === index) {
        return { ...item, type: selectedValue }
      }
      return item
    })
    setBlobs(updatedBlobs)
    onChange(updatedBlobs)
  }

  const handleRemove = (index) => {
    const updatedBlobs = blobs.filter((_, idx) => idx !== index)
    setBlobs(updatedBlobs)
    onChange(updatedBlobs)
  }

  useEffect(() => {
    startTransition(() => {
      setBlobs(data || [])
    })
  }, [data])

  return (
    <div
      className={
        clsx(
          style.block,
          blobs.length > 0 && style.active
        )
      }
    >
      <div className={style.upload}>
        <label htmlFor={id} className={style.label}>
          <Icon name="icon-navigation-add" />
          <span>{t('upload_file')}</span>
        </label>
        <input
          id={id}
          type={'file'}
          accept={'image/*'}
          onChange={handlePhotoChange}
          className={style.input}
          multiple
        />
      </div>

      {
        blobs.length > 0 &&
        <div className={style.previews}>
          {
            blobs.map((item, idx) =>
            <div
              key={idx}
              className={style.wrapper}
            >
              <div className={style.preview}>
                <div className={style.media}>
                  {
                    item.file &&
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      className={style.img}
                      src={URL.createObjectURL(item.file)}
                      alt={`Preview ${idx}`}
                    />
                  }
                </div>
                <Action
                  classes={['primary', 'md', 'square', style.close]}
                  onChange={() => handleRemove(idx)}
                >
                  <Icon name={'icon-navigation-close'} />
                </Action>
              </div>
              <Select
                placeholder={t('doctype')}
                data={settings?.doctype?.map(el => ({ value: el.code, label: t(`docs.${el.text}`) })) || []}
                value={item.type}
                onChange={value => handleTypeChange(idx, value)}
                isRequired={true}
              />
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default Uploader
