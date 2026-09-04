import { useEffect, useState, useTransition } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { apiRequest } from '@/app/actions/api'

import { imageError } from '@/helpers/image'

import Action from '@/components/Action'
import Loader from '@/components/Loader'
import Empty from '@/modules/Empty'

import style from './index.module.scss'

const CryptoModal = () => {
  const t = useTranslations()
  const [data, setData] = useState([])
  const [meta, setMeta] = useState(null)
  const [isPending, startTransition] = useTransition()

  const handleLoad = async () => {
    const res = await apiRequest('crypto/bonuses/', {
      method: 'GET',
    })

    if (res) {
      const { data: resData, meta: resMeta } = res

      setData(resData)
      setMeta(resMeta)
    }
  }

  useEffect(() => {
    startTransition(() => {
      handleLoad().catch()
    })
  }, [])

  return (
    <div className={style.block}>
      {
        isPending
          ?
            <Loader />
          :
            meta?.results !== '0'
              ?
                <div className={style.list}>
                  {
                    data?.map((el, idx) =>
                      <div
                        key={idx}
                        className={style.card}
                      >
                        <Image
                          src={el?.icon}
                          alt={el?.name || 'Crypto image'}
                          width={108}
                          height={108}
                          decoding="async"
                          sizes="108px"
                          onError={imageError}
                          unoptimized
                        />
                        <h5>{el?.name}</h5>
                        <Action
                          tag={'p'}
                          classes={['tertiary', 'md', 'wide']}
                          placeholder={el?.bonus}
                        />
                      </div>
                    )}
                </div>
              :
                <Empty />
      }
    </div>
  )
}

export default CryptoModal
