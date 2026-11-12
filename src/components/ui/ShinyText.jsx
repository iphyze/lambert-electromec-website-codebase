import './ShinyText.css'

const ShinyText = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
}) => {
  const safeSpeed = Number.isFinite(Number(speed)) && Number(speed) > 0 ? Number(speed) : 5

  return (
    <span
      className={`shiny-text${disabled ? ' shiny-text-disabled' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--shiny-speed': `${safeSpeed}s` }}
      data-text={text}
    >
      {text}
    </span>
  )
}

export default ShinyText
