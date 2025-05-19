import '@mdi/font/css/materialdesignicons.css'
import { VDateInput } from 'vuetify/labs/VDateInput'
import 'vuetify/styles'

const vuetify = createVuetify({
  ssr: true,
  Comments:{
    VDateInput,
  },
  theme: {
    defaultTheme: 'light', // 👈 set this to 'light'
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          primary: '#1976D2',
          secondary: '#424242',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#1E1E1E',
        },
      },
    },
  },

})

export default vuetify;