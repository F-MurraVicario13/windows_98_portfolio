module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        retro: ['"Press Start 2P"', 'cursive'],
      },
      imageRendering: {
        pixelated: 'pixelated',
      },
    },
  },
  plugins: [],
} 