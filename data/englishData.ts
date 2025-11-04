import { EnglishExercise } from '../types';

export const englishExercises: EnglishExercise[] = [
  {
    sentence_start: {
      ru: 'Перед поездкой разумно забронировать ваше ______ заранее, особенно в пик сезона.',
      en: "Before you travel, it's wise to book your ______ in advance, especially during peak season.",
    },
    sentence_end: { ru: '', en: '' },
    options: ["souvenir", "accommodation", "layover", "currency"],
    correct_option: "accommodation",
    explanation: {
      ru: 'Accommodation (жилье) - это место для проживания, например, отель или апартаменты.',
      en: 'Accommodation refers to a place to stay, like a hotel or an apartment.',
    },
  },
  {
    sentence_start: {
      ru: 'Убедитесь, что у вас готов ваш ______, чтобы показать его у выхода на посадку.',
      en: 'Make sure you have your ______ ready to show at the gate.',
    },
    sentence_end: { ru: '', en: '' },
    options: ["itinerary", "customs", "boarding pass", "receipt"],
    correct_option: "boarding pass",
    explanation: {
      ru: 'Boarding pass (посадочный талон) - это документ, который вам нужен, чтобы сесть в самолет.',
      en: 'A boarding pass is the document you need to board the plane.',
    },
  },
  {
    sentence_start: {
      ru: 'Нам пришлось пройти через ______ прежде чем мы смогли забрать наш багаж.',
      en: 'We had to go through ______ before we could collect our luggage.',
    },
    sentence_end: { ru: '', en: '' },
    options: ["check-in", "customs", "departure", "lounge"],
    correct_option: "customs",
    explanation: {
      ru: 'Customs (таможня) - это место в аэропорту, где проверяют ваш багаж на предмет запрещенных товаров.',
      en: 'Customs is the place at an airport where officials check your luggage for illegal goods.',
    },
  },
  {
    sentence_start: {
      ru: 'У нас была шестичасовая ______ в Амстердаме по пути в Нью-Йорк.',
      en: 'We had a six-hour ______ in Amsterdam on our way to New York.',
    },
    sentence_end: { ru: '', en: '' },
    options: ["delay", "journey", "layover", "trip"],
    correct_option: "layover",
    explanation: {
      ru: 'Layover (пересадка) - это короткая остановка в путешествии, обычно при смене самолетов.',
      en: 'A layover is a short stop in a journey, usually when you are changing planes.',
    },
  },
  {
    sentence_start: {
      ru: 'Можете подсказать, где находится ближайший пункт ______?',
      en: 'Could you tell me where the nearest ______ desk is?',
    },
    sentence_end: { ru: '', en: '' },
    options: ["souvenir", "ticket", "currency exchange", "reservation"],
    correct_option: "currency exchange",
    explanation: {
      ru: 'Currency exchange (обмен валюты) - это место, где вы можете обменять деньги одной страны на деньги другой.',
      en: 'A currency exchange is a place where you can change money from one country for that of another.',
    },
  },
  {
    sentence_start: {
      ru: 'Я всегда составляю подробный ______ перед поездкой, чтобы ничего не пропустить.',
      en: "I always make a detailed ______ before a trip so I don't miss anything.",
    },
    sentence_end: { ru: '', en: '' },
    options: ["destination", "itinerary", "package", "souvenir"],
    correct_option: "itinerary",
    explanation: {
      ru: 'Itinerary (маршрут) - это подробный план или расписание вашего путешествия.',
      en: 'An itinerary is a detailed plan or schedule of your journey.',
    },
  },
  {
    sentence_start: {
        ru: 'Вам нужно ______ как минимум за два часа до вылета вашего международного рейса.',
        en: 'You need to ______ at least two hours before your international flight departs.',
    },
    sentence_end: { ru: '', en: '' },
    options: ["check in", "book", "board", "land"],
    correct_option: "check in",
    explanation: {
        ru: 'Check in (зарегистрироваться) - это процесс регистрации на рейс в аэропорту или онлайн.',
        en: 'To check in is the process of registering for your flight at the airport or online.',
    },
  },
  {
    sentence_start: {
        ru: 'Не забудьте купить ______ для своих друзей и семьи.',
        en: "Don't forget to buy some ______ for your friends and family.",
    },
    sentence_end: { ru: '', en: '' },
    options: ["luggage", "souvenirs", "tickets", "receipts"],
    correct_option: "souvenirs",
    explanation: {
        ru: 'Souvenirs (сувениры) - это вещи, которые вы покупаете, чтобы помнить о месте, которое вы посетили.',
        en: 'Souvenirs are things you buy to remind you of a place you have visited.',
    },
  },
];
