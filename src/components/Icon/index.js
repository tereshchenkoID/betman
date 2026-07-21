import classNames from 'classnames'

const Icon = ({
  name,
  size = 'md',
  classes= [],
  ...rest
}) => {
  return (
    <i
      className={
        classNames(
          'icon',
          name,
          size,
          classes && classes.map(el => el),
        )
      }
      {...rest}
    />
  )
}

export default Icon
