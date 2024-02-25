import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import { en, es } from "./translations";

export const i18n = new I18n({
    en: en,
    es: es,
  });

  // Set the locale once at the beginning of your app.
// Set the locale once at the beginning of your app.
i18n.locale = Localization.getLocales()[0].languageCode!;

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment the line below to force the app to use the Japanese language.
// i18n.locale = 'ja';


console.log(i18n.t('welcome'));