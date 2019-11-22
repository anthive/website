export const state = () => ({
    locales: [
      {
        code: 'en',
        name: 'EN'
      },
      {
        code: 'ru',
        name: 'RU'
      }
    ],
    locale: 'en'
  });
  
  export const mutations = {
    SET_LANG(state, locale) {
      if (state.locales.find(el => el.code === locale)) {
        state.locale = locale
      }
    }
  };