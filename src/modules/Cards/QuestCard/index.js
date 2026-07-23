import { useTranslations } from 'next-intl'
import Image from 'next/image'
import classNames from 'classnames'

import { TASK_STATUS } from '@/constant/config'

import { useModal } from '@/context/ModalContext'

import Action from '@/components/Action'
import QuestModal from '@/modules/Modals/QuestModal'

import style from './index.module.scss'

const QuestCard = ({ data }) => {
  const t = useTranslations()
  const { title, status, bonus, button } = data
  const { openModal } = useModal()

  return (
    <div
      className={
        classNames(
          style.block,
          status !== '0' && style.disable
        )
      }
    >
      {
        data?.image &&
        <Image
          src={data?.image}
          alt={title}
          className={style.picture}
          width={170}
          height={160}
          decoding="async"
        />
      }
      <Action
        classes={['primary', 'sm', 'square', style.info]}
        placeholder={'i'}
        alt={'i'}
        onChange={() => {
          openModal({
            title: bonus?.title,
            body: <QuestModal data={bonus} />
          })
        }}
      />
      <div className={style.content}>
        <p className={style.title}>{title}</p>
        {
          button &&
          <>
            {
              status === '0'
                ?
                  <Action
                    to={button.link}
                    classes={['primary', 'md']}
                    placeholder={button.text}
                    alt={button.text}
                    target={button.newtab === '1' ? '_blank' : undefined}
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
    </div>
  )
}

export default QuestCard
