import style from './index.module.scss'

const Progress = ({
  data = 0,
  size = 120,
  strokeWidth = 10,
}) => {
  const progress = Math.min(Math.max(data, 0), 100)

  const center = size / 2
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div
      className={style.block}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth / 2 + 1}
          className={style.circle}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          className={style.track}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={style.progress}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>

      <span className={style.text}>{Math.round(progress)}%</span>
    </div>
  )
}

export default Progress
