import { teamConfig } from '../data/products'

const getLuminance = (hex) => {
  const h = hex.replace('#', '')
  const r = parseInt(h.substr(0, 2), 16) / 255
  const g = parseInt(h.substr(2, 2), 16) / 255
  const b = parseInt(h.substr(4, 2), 16) / 255
  return 0.299 * r + 0.587 * g + 0.114 * b
}

const getContrastText = (bgColor) => (getLuminance(bgColor) > 0.45 ? '#1a1a2e' : '#ffffff')

export default function JerseyImage({ team, number, size = 200 }) {
  const config = teamConfig[team]
  if (!config) return null

  const { primaryColor, secondaryColor, pattern } = config
  const patternId = `jp-${team}-${number}-${size}`
  const clipId = `jc-${team}-${number}-${size}`
  const textColor = pattern === 'solid' ? getContrastText(primaryColor) : getContrastText(primaryColor)
  const height = Math.round(size * 1.1)

  const jerseyPath =
    'M55,20 C70,5 130,5 145,20 L175,10 L195,55 L162,67 L162,210 L38,210 L38,67 L5,55 L25,10 Z'
  const collarPath =
    'M55,20 C65,38 80,45 100,42 C120,45 135,38 145,20 C130,12 118,8 100,10 C82,8 70,12 55,20 Z'

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 200 220"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Camisa ${config.name} número ${number}`}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={jerseyPath} />
        </clipPath>

        {pattern === 'stripes' && (
          <pattern id={patternId} width="24" height="220" patternUnits="userSpaceOnUse">
            <rect width="12" height="220" fill={primaryColor} />
            <rect x="12" width="12" height="220" fill={secondaryColor} />
          </pattern>
        )}

        {pattern === 'checker' && (
          <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill={primaryColor} />
            <rect x="10" width="10" height="10" fill={secondaryColor} />
            <rect y="10" width="10" height="10" fill={secondaryColor} />
            <rect x="10" y="10" width="10" height="10" fill={primaryColor} />
          </pattern>
        )}

        {pattern === 'split' && (
          <linearGradient id={patternId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor={primaryColor} />
            <stop offset="50%" stopColor={secondaryColor} />
          </linearGradient>
        )}

        <filter id={`shadow-${patternId}`} x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Jersey body */}
      <path
        d={jerseyPath}
        fill={
          pattern === 'solid'
            ? primaryColor
            : `url(#${patternId})`
        }
        filter={`url(#shadow-${patternId})`}
      />

      {/* Subtle highlight on shoulder area */}
      <path
        d="M55,20 L25,10 L5,55 L38,67 L38,90 L55,85 Z"
        fill="rgba(255,255,255,0.08)"
        clipPath={`url(#${clipId})`}
      />
      <path
        d="M145,20 L175,10 L195,55 L162,67 L162,90 L145,85 Z"
        fill="rgba(255,255,255,0.08)"
        clipPath={`url(#${clipId})`}
      />

      {/* Collar */}
      <path
        d={collarPath}
        fill={secondaryColor}
        stroke={primaryColor === '#FFFFFF' ? '#cccccc' : primaryColor}
        strokeWidth="1"
      />

      {/* Player number */}
      <text
        x="100"
        y="148"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textColor}
        fontSize="58"
        fontWeight="900"
        fontFamily="Arial Black, Arial, sans-serif"
        opacity="0.9"
      >
        {number}
      </text>

      {/* Subtle shine overlay */}
      <path
        d={jerseyPath}
        fill="url(#shine)"
        opacity="0.08"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  )
}
