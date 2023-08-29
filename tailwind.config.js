const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
   theme: {
      extend: {
         colors: {
            tprimary: '#9B4DE0',
            secondary: '#ffffff80',
            grayDa: '#dadada',
            tertiary: '#34224F',
            modal: '#4B1178'
         },
         backgroundColor: {
            primary: '#170f23',
            secondary: '#130C1C'
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
