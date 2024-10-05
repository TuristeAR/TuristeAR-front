module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#49A2EC',
      'primary-2': '#0F254C',
      'primary-3': '#235A90',
      'primary-4': '#4F94CD',
      white: '#fff',
      pink: '#db2777',
      'pink-50': '#fdf2f8',
      'gray-50': '#d1d5db',
      gray: '#545454',
      'gray-2': "rgb(250 250 250)",
      black: '#000',
    },
    extend: {
      screens: {
        'xs': '600px',
      },
    },
  },
  plugins: [],
};
