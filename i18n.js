import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        Home: "Home",
        Create: "Create",
        Search: "Search",
        Login: "Login",
        Logout: "Logout",
        Share: "Share",
        Add: "Add a comment",
        Open: "Open",
        Comments: "Comments:",
        Click: "Click to Upload",
        Title: "Add your title",
        Tell: "The first 40 Charaters are what usually show up in feeds",
        TellAbout: "Tell everyone what your pin is about",
        Link: "Add a Destination Link",
        Save: "Save",
      },
    },
    ru: {
      translation: {
        Home: "Главная",
        Create: "Создать",
        Search: "Поиск",
        Login: "Войти",
        Logout: "Выйти",
        Share: "Поделиться",
        Add: "Добавить комментрий",
        Open: "Открыть",
        Comments: "Комментарии:",
        Click: "Нажмите, чтобы загрузить",
        Title: "Добавь свой заголовок",
        Tell: "Первые 40 символов обычно отображаются в лентах",
        TellAbout: "Расскажите всем, о чем ваш значок",
        Link: "Добавить целевую ссылку",
        Save: "Сохранить",
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
