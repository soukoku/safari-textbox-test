const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
        blue: colors.sky
      },
      transitionDuration: {
        250: '250ms'
      },
      fontSize: {
        xxs: '0.65rem'
      },
      height: {
        screen: ['100vh' /*fallback for old browser*/, '100dvh']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
