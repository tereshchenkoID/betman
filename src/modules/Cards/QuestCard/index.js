import Image from 'next/image'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { TASK_STATUS } from '@/constant/config'

import { useModal } from '@/context/ModalContext'

import { imageError } from '@/helpers/image'

import Action from '@/components/Action'

import style from './index.module.scss'

const QuestCard = ({ data }) => {
  const t = useTranslations()
  const { title, status, bonus, button, image } = data
  const { link, text, newtab } = button
  const { openModal } = useModal()

  return (
    <article
      className={
        clsx(
          style.block,
          status !== '0' && style.disable
        )
      }
    >
      {
        image &&
        <Image
          src={image}
          alt={title || 'Quest image'}
          className={style.picture}
          width={170}
          height={160}
          decoding="async"
          onError={(e) => imageError(e, false)}
          unoptimized
        />
      }
      <Action
        classes={['primary', 'sm', 'square', style.info]}
        placeholder={'i'}
        alt={'i'}
        onChange={() => {
          openModal('quest', { data: bonus?.info }, { title: bonus?.title })
        }}
      />
      <div className={style.content}>
        {
          (title && title !== '') &&
          <p className={style.title}>{title}</p>
        }
        {
          button &&
          <>
            {
              status === '0'
                ?
                  <Action
                    to={link}
                    classes={['primary', 'md']}
                    placeholder={text}
                    alt={text}
                    target={newtab === '1' ? '_blank' : undefined}
                    isDisabled={status === '1'}
                  />
                :
                  <Action
                    classes={['primary', 'md']}
                    placeholder={t(`quest_status.${TASK_STATUS[status]}`)}
                    alt={t(`quest_status.${TASK_STATUS[status]}`)}
                    isDisabled={true}
                  />
            }
          </>
        }
      </div>
    </article>
  )
}

export default QuestCard
