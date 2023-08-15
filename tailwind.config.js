const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
   theme: {
      extend: {
         colors: {
            primary: '#170f23'
         }
      }
   },
   corePlugins: {
      container: false //xoá class container ra khỏi tailwind
   },
   //tạo tại class container mới
   plugins: [
      plugin(({ addComponents }) => {
         addComponents({
            '.container': {
               maxWidth: '1248px',
               width: '100%',
               marginLeft: 'auto',
               marginRight: 'auto',
               paddingLeft: '12px',
               paddingRight: '12px'
            }
         })
      })
   ]
}
