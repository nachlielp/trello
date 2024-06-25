import { utilService } from '../services/util.service'

export function LetteredAvatar({
  name,
  size = '50px',
  radius = '100px',
  ...other
}) {
  let initials = name?.split(' ')[0][0].toUpperCase() + name?.split(' ')[1][0].toUpperCase()
  let color = utilService.getRandomColor(name)
  const customStyle = {
    display: 'flex',
    height: size,
    width: size,
    borderRadius: radius,
    color: 'white',
    backgroundColor: color,
    boxSizing: "border-box",
    alignContent: "center"
  }
  const spanStile = {
    margin: 'auto',
  }
  return (
    <div style={customStyle} {...other}>
      <span style={spanStile}>{initials}</span>
    </div>
  )
}
