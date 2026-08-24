import clsx from 'clsx'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const Modal = ({
  children,
  onClose,
  title,
  size,
  isPointer,
  zIndex = 10
}) => {
  const isTiny = !title
  const titleId = 'modal-title'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={!isTiny ? titleId : undefined}
      aria-label={'Dialog'}
      className={
        clsx(
          style.block,
          style[size],
          isTiny && style.tiny,
          isPointer && style.lock
        )
      }
      style={{ zIndex }}
    >
      <div
        className={style.shadow}
        onClick={onClose}
      />
      <div className={style.content}>
        <div className={style.wrapper}>
          {
            !isTiny &&
            <div className={style.header}>
              <h3 id={titleId} className={style.title}>{title}</h3>
              {
                !isPointer &&
                <Action
                  classes={['secondary', 'sm', 'square', style.close]}
                  onChange={onClose}
                >
                  <Icon name="navigation-close" />
                </Action>
              }
            </div>
          }
          <div className={style.body}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
