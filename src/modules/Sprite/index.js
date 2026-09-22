import fs from 'node:fs'
import path from 'node:path'

const spritePath = path.resolve(process.cwd(), 'public/images/iconography.svg')
const svgSpriteContent = fs.readFileSync(spritePath, 'utf8')

export default function Sprite() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        display: 'none',
        visibility: 'hidden',
      }}
      dangerouslySetInnerHTML={{ __html: svgSpriteContent }}
    />
  )
}
