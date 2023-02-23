export const Gradient = () => (
  <svg width='32px' height='32px' style={{ position: 'absolute' }}>
    <defs>
      <linearGradient id='btn-hover' gradientUnits='userSpaceOnUse' x1='105.04%' y1='6.35%' x2='-5.04%' y2='93.65%'>
        <stop stopColor='#f83600' />
        <stop offset='2.978' stopColor='#f9d423' />
      </linearGradient>
      <linearGradient id='btn-pressed' gradientUnits='userSpaceOnUse' x1='106.35%' y1='8.65%' x2='-6.35%' y2='91.35%'>
        <stop stopColor='#f83600' />
        <stop offset='3.274' stopColor='#f9d423' />
      </linearGradient>
    </defs>
  </svg>
);
