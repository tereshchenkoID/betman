import Image from 'next/image'
import classNames from 'classnames'

import { ROUTES_USER } from '@/constant/config'

import { useModal } from '@/context/ModalContext'
import { imageError } from '@/helpers/image'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const BonusQuestCard = ({ user, data }) => {
  const { status, button, bonus } = data
  const { openModal } = useModal()

  return (
    <article
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
          alt={bonus?.title || `Bonus ${bonus?.id}`}
          className={style.picture}
          width={170}
          height={160}
          decoding="async"
          onError={(e) => imageError(e, false)}
          unoptimized={true}
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
          status === '0'
            ?
              <Action
                to={`${ROUTES_USER.wallet.url}/${user?.payements?.[0].alias}/deposit`}
                classes={['primary', 'md']}
                placeholder={button}
                alt={button}
                isDisabled={status === '1'}
              />
            :
              <p className={style.title}>
                <Icon name={'icon-toggle-lock'} size={'sm'}/>
                {button}
              </p>
        }
      </div>
    </article>
  )
}

export default BonusQuestCard
