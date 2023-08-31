const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
   theme: {
      extend: {}
   },
   corePlugins: {
      container: false //xoá class container ra khỏi tailwind
   },
   //tạo tại class container mới
   plugins: [
      plugin(({ addComponents }) => {
         addComponents({})
      })
   ]
}
