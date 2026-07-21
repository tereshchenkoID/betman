import ProviderCard from '@/modules/Cards/ProviderCard'

import style from './index.module.scss'

const ProvidersModal = ({ providers }) => {
  return (
    <div className={style.block}>
      {
        providers?.map((el, idx) =>
          <ProviderCard
            key={idx}
            data={el}
            size={'sm'}
          />
        )
      }
    </div>
  )
}

export default ProvidersModal
