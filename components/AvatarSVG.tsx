import { Player } from '@/app/page'

interface AvatarSVGProps {
  player: Player
  size?: number
  animate?: boolean
}

export default function AvatarSVG({ player, size = 64, animate = false }: AvatarSVGProps) {
  const { gender, skinTone, hairColor, outfitColor, shirtStyle, pantsColor, accessory, shoeColor } = player

  const scale = size / 100
  const bobAnim = animate && player.isMoving

  // Hair shapes per gender
  const hairPath = gender === 'girl'
    ? <><ellipse cx="50" cy="22" rx="22" ry="20" fill={hairColor} /><ellipse cx="28" cy="38" rx="7" ry="18" fill={hairColor} /><ellipse cx="72" cy="38" rx="7" ry="18" fill={hairColor} /></>
    : <ellipse cx="50" cy="22" rx="21" ry="16" fill={hairColor} />

  // Accessory
  let accessoryEl = null
  if (accessory === 'hat') {
    accessoryEl = (
      <g>
        <rect x="30" y="6" width="40" height="6" rx="3" fill="#e74c3c" />
        <rect x="34" y="-6" width="32" height="16" rx="4" fill="#c0392b" />
      </g>
    )
  } else if (accessory === 'bow') {
    accessoryEl = (
      <g>
        <ellipse cx="42" cy="8" rx="10" ry="6" fill="#e91e8c" transform="rotate(-20 42 8)" />
        <ellipse cx="58" cy="8" rx="10" ry="6" fill="#e91e8c" transform="rotate(20 58 8)" />
        <circle cx="50" cy="8" r="5" fill="#ff69b4" />
      </g>
    )
  } else if (accessory === 'glasses') {
    accessoryEl = (
      <g>
        <circle cx="40" cy="40" r="8" fill="none" stroke="#333" strokeWidth="2.5" />
        <circle cx="60" cy="40" r="8" fill="none" stroke="#333" strokeWidth="2.5" />
        <line x1="48" y1="40" x2="52" y2="40" stroke="#333" strokeWidth="2" />
        <line x1="28" y1="39" x2="32" y2="40" stroke="#333" strokeWidth="2" />
        <line x1="68" y1="40" x2="72" y2="39" stroke="#333" strokeWidth="2" />
      </g>
    )
  } else if (accessory === 'crown') {
    accessoryEl = (
      <g>
        <polygon points="30,14 38,2 50,10 62,2 70,14 30,14" fill="#FFD700" />
        <rect x="30" y="12" width="40" height="8" rx="2" fill="#FFC200" />
        <circle cx="38" cy="6" r="3" fill="#FF4444" />
        <circle cx="50" cy="4" r="3" fill="#44AAFF" />
        <circle cx="62" cy="6" r="3" fill="#44FF44" />
      </g>
    )
  }

  // Shirt shapes
  let shirtEl = null
  if (shirtStyle === 'dress' && gender === 'girl') {
    shirtEl = (
      <g>
        <path d="M30,58 Q28,72 26,90 L74,90 Q72,72 70,58 Q60,62 50,62 Q40,62 30,58Z" fill={outfitColor} />
        <path d="M30,58 Q28,68 26,90 L74,90 Q72,68 70,58 Q60,64 50,64 Q40,64 30,58Z" fill={outfitColor} opacity="0.6" />
      </g>
    )
  } else if (shirtStyle === 'hoodie') {
    shirtEl = (
      <g>
        <path d="M28,58 Q20,62 22,80 L78,80 Q80,62 72,58 Q62,64 50,64 Q38,64 28,58Z" fill={outfitColor} />
        <path d="M36,58 Q34,54 38,52 L62,52 Q66,54 64,58" fill="none" stroke={outfitColor} strokeWidth="3" />
        <circle cx="50" cy="60" r="3" fill="rgba(0,0,0,0.15)" />
      </g>
    )
  } else if (shirtStyle === 'jacket') {
    shirtEl = (
      <g>
        <path d="M28,58 Q20,62 22,80 L78,80 Q80,62 72,58 Q62,64 50,64 Q38,64 28,58Z" fill={outfitColor} />
        <line x1="50" y1="58" x2="50" y2="80" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
        <rect x="43" y="62" width="6" height="4" rx="1" fill="rgba(255,255,255,0.3)" />
        <rect x="43" y="68" width="6" height="4" rx="1" fill="rgba(255,255,255,0.3)" />
        <rect x="43" y="74" width="6" height="4" rx="1" fill="rgba(255,255,255,0.3)" />
      </g>
    )
  } else {
    // t-shirt default
    shirtEl = (
      <g>
        <path d="M28,58 Q20,62 22,80 L78,80 Q80,62 72,58 Q62,64 50,64 Q38,64 28,58Z" fill={outfitColor} />
      </g>
    )
  }

  // Pants (hidden if dress)
  const pantsEl = shirtStyle !== 'dress' ? (
    <g>
      <rect x="28" y="78" width="19" height="14" rx="3" fill={pantsColor} />
      <rect x="53" y="78" width="19" height="14" rx="3" fill={pantsColor} />
    </g>
  ) : null

  // Shoes
  const shoesEl = (
    <g>
      <ellipse cx="36" cy="93" rx="11" ry="6" fill={shoeColor} />
      <ellipse cx="64" cy="93" rx="11" ry="6" fill={shoeColor} />
    </g>
  )

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: player.direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
        transition: 'transform 0.1s',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
      }}
    >
      <style>{bobAnim ? `
        @keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        .avatar-body { animation: bob 0.4s ease-in-out infinite; }
      ` : ''}</style>
      <g className="avatar-body">
        {/* Legs */}
        {shirtStyle !== 'dress' && (
          <>
            <rect x="32" y="80" width="14" height="10" rx="2" fill={skinTone} />
            <rect x="54" y="80" width="14" height="10" rx="2" fill={skinTone} />
          </>
        )}
        {shoesEl}
        {pantsEl}
        {shirtEl}
        {/* Arms */}
        <rect x="16" y="58" width="12" height="22" rx="6" fill={skinTone} />
        <rect x="72" y="58" width="12" height="22" rx="6" fill={skinTone} />
        {/* Hands */}
        <circle cx="22" cy="82" r="6" fill={skinTone} />
        <circle cx="78" cy="82" r="6" fill={skinTone} />
        {/* Neck */}
        <rect x="43" y="52" width="14" height="10" rx="4" fill={skinTone} />
        {/* Head */}
        <ellipse cx="50" cy="36" rx="22" ry="24" fill={skinTone} />
        {/* Hair */}
        {hairPath}
        {/* Eyes */}
        <circle cx="42" cy="34" r="4" fill="white" />
        <circle cx="58" cy="34" r="4" fill="white" />
        <circle cx="43" cy="35" r="2.5" fill="#333" />
        <circle cx="59" cy="35" r="2.5" fill="#333" />
        <circle cx="43.8" cy="34.2" r="1" fill="white" />
        <circle cx="59.8" cy="34.2" r="1" fill="white" />
        {/* Eyelashes for girl */}
        {gender === 'girl' && (
          <>
            <line x1="38" y1="30" x2="40" y2="28" stroke="#333" strokeWidth="1.5" />
            <line x1="42" y1="29" x2="42" y2="27" stroke="#333" strokeWidth="1.5" />
            <line x1="46" y1="30" x2="47" y2="28" stroke="#333" strokeWidth="1.5" />
            <line x1="54" y1="30" x2="53" y2="28" stroke="#333" strokeWidth="1.5" />
            <line x1="58" y1="29" x2="58" y2="27" stroke="#333" strokeWidth="1.5" />
            <line x1="62" y1="30" x2="60" y2="28" stroke="#333" strokeWidth="1.5" />
          </>
        )}
        {/* Cheeks */}
        <circle cx="35" cy="42" r="6" fill="#ffb3ba" opacity="0.5" />
        <circle cx="65" cy="42" r="6" fill="#ffb3ba" opacity="0.5" />
        {/* Smile */}
        <path d="M43,44 Q50,50 57,44" fill="none" stroke="#c45" strokeWidth="2" strokeLinecap="round" />
        {/* Nose */}
        <circle cx="50" cy="40" r="2" fill="rgba(0,0,0,0.08)" />
        {/* Accessory on top */}
        {accessoryEl}
      </g>
    </svg>
  )
}
