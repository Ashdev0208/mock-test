import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const messages = {
  en: {
    common: {
      language: 'Language',
      yes: 'Yes',
      no: 'No',
      loading: 'Loading...',
      back_to_dashboard: 'Back to Dashboard',
      submit_test: 'Submit Test',
      submitting: 'Submitting...',
      no_questions: 'No questions available',
      answer_at_least_one: 'Please answer at least one question.',
      practice_test: 'Practice Test',
      free: 'free',
      premium: 'PREMIUM',
    },
    languages: {
      en: 'English',
      ru: 'Русский',
      uz: 'Oʻzbek',
    },
    home: {
      nav: {
        product: 'Product',
        features: 'Features',
        marketplace: 'Marketplace',
        company: 'Company',
      },
      announce: 'Announcing our next round of funding.',
      read_more: 'Read more',
      hero_title: 'Data to enrich your online business',
      hero_description:
        'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.',
      get_started: 'Get started',
      learn_more: 'Learn more',
      active_students: 'Active Students',
      mock_challenges: 'Mock Challenges',
      avg_improvement: 'Avg. Improvement',
      expert_support: 'Expert Support',
      deploy_faster: 'Deploy faster',
      everything_you_need: 'Everything you need...',
      features: {
        feature1: {
          name: 'Push to deploy',
          description:
            'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
        },
        feature2: {
          name: 'SSL certificates',
          description:
            'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
        },
        feature3: {
          name: 'Simple queues',
          description:
            'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
        },
        feature4: {
          name: 'Advanced security',
          description:
            'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
        },
      },
      real_time_feedback: 'Real-Time Feedback',
      direct_communication: 'Direct Communication With Your Instructors.',
      instant_updates:
        'Experience instant updates. When admins push a message, it hits your dashboard in real-time. Stay informed about syllabus changes, mock schedules, and special broadcasts.',
      push_notifications: 'Instant Push Notifications',
      syllabus_alerts: 'Syllabus Update Alerts',
      instructor_support: 'Direct Instructor Support',
      system_broadcast: 'System Broadcast',
      broadcast_message:
        'Admin: New SAT reading practice sets are going live this Friday at 6 PM. Keep your streaks active!',
    },
    auth: {
      create_account: 'Create your account',
      join_students: 'Join thousands of students mastering TOPIK.',
      full_name: 'Full Name',
      email_address: 'Email Address',
      password: 'Password',
      create_account_button: 'Create Account',
      creating_account: 'Creating account...',
      quick_sign_up: 'Quick Sign Up',
      google: 'Google',
      github: 'GitHub',
      already_account: 'Already have an account?',
      sign_in_here: 'Sign in here',
      sign_in_heading: 'Sign in to your account',
      remember_me: 'Remember me',
      forgot_password: 'Forgot password?',
      sign_in_button: 'Sign In',
      or_continue: 'Or continue with',
      not_a_member: 'Not a member?',
      sign_up_here: 'Sign up here',
      fill_all_fields: 'Please fill in all fields.',
      account_created: 'Account created successfully!',
      login_successful: 'Login successful! Redirecting...',
      login_failed: 'Login failed. Please try again.',
      unable_sign_in: 'Unable to sign in. Please try again.',
    },
    dashboard: {
      title: 'Dashboard',
      welcome: "Welcome back, {name}. Ready for today's challenge?",
      premium_member: 'Premium Member',
      loading_dashboard: 'Loading dashboard...',
      unable_load: 'Unable to load dashboard data',
      next_challenge: 'Next challenge coming soon...',
      check_back_later:
        'Admin is currently preparing your next TOPIK mock. Check back later today!',
      total_mocks: 'Total Mocks',
      entered_mocks: 'Entered Mocks',
      my_performance: 'My Performance',
      avg_accuracy: 'Avg. Accuracy',
      day_streak: 'Day Streak',
      active: 'Active',
      global_broadcast: 'Global Broadcast',
      rankings: 'Rankings',
      archive: 'Archive',
      support: 'Support',
      logout: 'Logout',
      start_practice: 'Start Practice',
    },
    result: {
      title: 'Test Results',
      review_performance: 'Review your performance and answers',
      your_score: 'Your Score',
      loading_results: 'Loading results...',
      excellent_work: 'Excellent work!',
      good_job: 'Good job!',
      keep_practicing: 'Keep practicing!',
      correct: 'Correct',
      incorrect: 'Incorrect',
      accuracy: 'Accuracy',
      test_summary: 'Test Summary',
      recent_test: 'Recent Test',
      take_another_test: 'Take Another Test',
      back_to_dashboard: 'Back to Dashboard',
      performance: 'Performance:',
      excellent: 'Excellent!',
      good: 'Good job!',
      keep_practicing_short: 'Keep practicing!',
    },
    mock: {
      title: 'TOPIK Test',
      practice_test: 'Practice Test',
      loading_questions: 'Loading questions...',
      passage: 'Passage:',
      submit_test: 'Submit Test',
      submitting: 'Submitting...',
      no_questions: 'No questions available',
      no_test_questions: "This test doesn't have any questions yet.",
      back_to_dashboard: 'Back to Dashboard',
      answer_at_least_one: 'Please answer at least one question.',
    },
  },
  ru: {
    common: {
      language: 'Язык',
      yes: 'Да',
      no: 'Нет',
      loading: 'Загрузка...',
      back_to_dashboard: 'Назад на панель',
      submit_test: 'Отправить тест',
      submitting: 'Отправка...',
      no_questions: 'Вопросы отсутствуют',
      answer_at_least_one: 'Пожалуйста, ответьте хотя бы на один вопрос.',
      practice_test: 'Практический тест',
      free: 'бесплатно',
      premium: 'ПРЕМИУМ',
    },
    languages: {
      en: 'English',
      ru: 'Русский',
      uz: 'Oʻzbek',
    },
    home: {
      nav: {
        product: 'Продукт',
        features: 'Функции',
        marketplace: 'Рынок',
        company: 'Компания',
      },
      announce: 'Анонсируем следующий раунд финансирования.',
      read_more: 'Читать далее',
      hero_title: 'Данные для улучшения вашего онлайн-бизнеса',
      hero_description:
        'Аним ауте ид магна аликуа ад ад нон десерунт сунт. Кви ирюре кьи лорем купидат комодо. Элит сунт амет фугиат вениам occaecat.',
      get_started: 'Начать',
      learn_more: 'Узнать больше',
      active_students: 'Активные студенты',
      mock_challenges: 'Мок-вызовы',
      avg_improvement: 'Среднее улучшение',
      expert_support: 'Экспертная поддержка',
      deploy_faster: 'Развертывай быстрее',
      everything_you_need: 'Всё, что нужно...',
      features: {
        feature1: {
          name: 'Быстрый деплой',
          description:
            'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
        },
        feature2: {
          name: 'SSL сертификаты',
          description:
            'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
        },
        feature3: {
          name: 'Простые очереди',
          description:
            'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
        },
        feature4: {
          name: 'Продвинутая безопасность',
          description:
            'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
        },
      },
      real_time_feedback: 'Обратная связь в реальном времени',
      direct_communication: 'Прямое общение с вашими преподавателями.',
      instant_updates:
        'Получайте мгновенные обновления. Когда админы отправляют сообщения, они появляются на вашей панели в реальном времени. Будьте в курсе изменений учебной программы, расписания тестов и специальных трансляций.',
      push_notifications: 'Мгновенные push-уведомления',
      syllabus_alerts: 'Уведомления об обновлении учебной программы',
      instructor_support: 'Прямая поддержка преподавателя',
      system_broadcast: 'Системный трансляция',
      broadcast_message:
        'Админ: новые наборы для чтения SAT появятся в эту пятницу в 18:00. Поддерживайте свою серию!',
    },
    auth: {
      create_account: 'Создайте аккаунт',
      join_students: 'Присоединяйтесь к тысячам студентов, осваивающих TOPIK.',
      full_name: 'Полное имя',
      email_address: 'Адрес электронной почты',
      password: 'Пароль',
      create_account_button: 'Создать аккаунт',
      creating_account: 'Создание аккаунта...',
      quick_sign_up: 'Быстрая регистрация',
      google: 'Google',
      github: 'GitHub',
      already_account: 'Уже есть аккаунт?',
      sign_in_here: 'Войдите сюда',
      sign_in_heading: 'Войдите в свой аккаунт',
      remember_me: 'Запомнить меня',
      forgot_password: 'Забыли пароль?',
      sign_in_button: 'Войти',
      or_continue: 'Или продолжить с',
      not_a_member: 'Нет аккаунта?',
      sign_up_here: 'Зарегистрируйтесь здесь',
      fill_all_fields: 'Пожалуйста, заполните все поля.',
      account_created: 'Аккаунт успешно создан!',
      login_successful: 'Вход выполнен! Перенаправление...',
      login_failed: 'Ошибка входа. Пожалуйста, попробуйте снова.',
      unable_sign_in: 'Не удалось войти. Попробуйте снова.',
    },
    dashboard: {
      title: 'Панель',
      welcome: 'С возвращением, {name}. Готовы к сегодняшнему вызову?',
      premium_member: 'Премиум участник',
      loading_dashboard: 'Загрузка панели...',
      unable_load: 'Не удалось загрузить данные панели',
      next_challenge: 'Следующий вызов скоро...',
      check_back_later:
        'Администратор готовит ваш следующий TOPIK-мок. Загляните позже сегодня!',
      total_mocks: 'Всего моков',
      entered_mocks: 'Прохождённых моков',
      my_performance: 'Моя производительность',
      avg_accuracy: 'Средняя точность',
      day_streak: 'Дневная серия',
      active: 'Активный',
      global_broadcast: 'Глобальная трансляция',
      rankings: 'Рейтинги',
      archive: 'Архив',
      support: 'Поддержка',
      logout: 'Выйти',
      start_practice: 'Начать практику',
    },
    result: {
      title: 'Результаты теста',
      review_performance: 'Просмотрите свои результаты и ответы',
      your_score: 'Ваш результат',
      loading_results: 'Загрузка результатов...',
      excellent_work: 'Отличная работа!',
      good_job: 'Хорошая работа!',
      keep_practicing: 'Продолжайте практиковаться!',
      correct: 'Правильно',
      incorrect: 'Неправильно',
      accuracy: 'Точность',
      test_summary: 'Итоги теста',
      recent_test: 'Недавний тест',
      take_another_test: 'Пройти еще тест',
      back_to_dashboard: 'Назад на панель',
      performance: 'Результат:',
      excellent: 'Отлично!',
      good: 'Хорошая работа!',
      keep_practicing_short: 'Продолжайте практиковаться!',
    },
    mock: {
      title: 'TOPIK тест',
      practice_test: 'Практический тест',
      loading_questions: 'Загрузка вопросов...',
      passage: 'Пассаж:',
      submit_test: 'Отправить тест',
      submitting: 'Отправка...',
      no_questions: 'Вопросы отсутствуют',
      no_test_questions: 'В этом тесте пока нет вопросов.',
      back_to_dashboard: 'Назад на панель',
      answer_at_least_one: 'Пожалуйста, ответьте хотя бы на один вопрос.',
    },
  },
  uz: {
    common: {
      language: 'Til',
      yes: 'Ha',
      no: 'Yoʻq',
      loading: 'Yuklanmoqda...',
      back_to_dashboard: 'Boshqaruv paneliga qaytish',
      submit_test: 'Testni yuborish',
      submitting: 'Yuborilmoqda...',
      no_questions: 'Savollar mavjud emas',
      answer_at_least_one: 'Iltimos, kamida bitta savolga javob bering.',
      practice_test: 'Amaliy test',
      free: 'bepul',
      premium: 'PREMIUM',
    },
    languages: {
      en: 'English',
      ru: 'Русский',
      uz: 'Oʻzbek',
    },
    home: {
      nav: {
        product: 'Mahsulot',
        features: 'Xususiyatlar',
        marketplace: 'Bozor',
        company: 'Kompaniya',
      },
      announce: 'Biz navbatdagi moliyalashtirish turini e’lon qildik.',
      read_more: 'Batafsil',
      hero_title: 'Online biznesingizni boyitish uchun ma’lumotlar',
      hero_description:
        'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.',
      get_started: 'Boshlash',
      learn_more: 'Batafsil o‘rganish',
      active_students: 'Faol talabalar',
      mock_challenges: 'Mock chaqiriqlari',
      avg_improvement: 'O‘rtacha yaxshilanish',
      expert_support: 'Mutaxassis yordam',
      deploy_faster: 'Tezroq joylashtiring',
      everything_you_need: 'Kerakli hamma narsa...',
      features: {
        feature1: {
          name: 'Joylashtirishni tezlashtirish',
          description:
            'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
        },
        feature2: {
          name: 'SSL sertifikatlari',
          description:
            'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
        },
        feature3: {
          name: 'Oddiy navbatlar',
          description:
            'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
        },
        feature4: {
          name: 'Oldindan xavfsizlik',
          description:
            'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
        },
      },
      real_time_feedback: 'Realtaym fikr-mulohaza',
      direct_communication: 'Instructorlaringiz bilan bevosita aloqa.',
      instant_updates:
        'Administratorlar xabar yuborganda, u real vaqtda boshqaruv panelingizga tushadi. O‘quv dasturi o‘zgarishlarini, mock jadvalini va maxsus efirlarni kuzatib boring.',
      push_notifications: 'Darhol push-bildirishnomalar',
      syllabus_alerts: 'O‘quv dasturi yangilanish xabarlari',
      instructor_support: 'Bevosita instruktor yordami',
      system_broadcast: 'Tizim e’lonlari',
      broadcast_message:
        'Admin: yangi SAT o‘qish mashqlari juma kuni soat 18:00 da chiqadi. Streaklaringizni faollashtiring!',
    },
    auth: {
      create_account: 'Hisob yarating',
      join_students:
        'TOPIKni o‘rganayotgan minglab talabalar qatoriga qo‘shiling.',
      full_name: 'To‘liq ism',
      email_address: 'Elektron pochta manzili',
      password: 'Parol',
      create_account_button: 'Hisob yaratish',
      creating_account: 'Hisob yaratilmoqda...',
      quick_sign_up: 'Tez ro‘yhatdan o‘tish',
      google: 'Google',
      github: 'GitHub',
      already_account: 'Allaqachon hisobingiz bormi?',
      sign_in_here: 'Bu yerga kiring',
      sign_in_heading: 'Hisobingizga kiring',
      remember_me: 'Meni eslab qol',
      forgot_password: 'Parolni unutdingizmi?',
      sign_in_button: 'Kirish',
      or_continue: 'Yoki davom ettirish',
      not_a_member: 'A’zo emasmisiz?',
      sign_up_here: 'Bu yerda ro‘yxatdan o‘ting',
      fill_all_fields: 'Iltimos, barcha maydonlarni to‘ldiring.',
      account_created: 'Hisob muvaffaqiyatli yaratildi!',
      login_successful: 'Kirish muvaffaqiyatli! Yo‘naltirilmoqda...',
      login_failed: 'Kirishda xatolik. Iltimos, qayta urinib ko‘ring.',
      unable_sign_in: 'Kirish mumkin emas. Qayta urinib ko‘ring.',
    },
    dashboard: {
      title: 'Boshqaruv paneli',
      welcome: 'Xush kelibsiz, {name}. Bugungi vazifaga tayyormisiz?',
      premium_member: 'Premium a’zo',
      loading_dashboard: 'Boshqaruv paneli yuklanmoqda...',
      unable_load: 'Boshqaruv paneli ma’lumotlarini yuklab bo‘lmadi',
      next_challenge: 'Keyingi chaqiriq tez orada...',
      check_back_later:
        'Administrator keyingi TOPIK mockingizni tayyorlamoqda. Bugun keyinroq tekshiring!',
      total_mocks: 'Jami mocklar',
      entered_mocks: 'Topshirilgan mocklar',
      my_performance: 'Mening natijalarim',
      avg_accuracy: 'O‘rtacha aniqlik',
      day_streak: 'Kunlik ketma-ketlik',
      active: 'Faol',
      global_broadcast: 'Global e’lon',
      rankings: 'Reytinglar',
      archive: 'Arxiv',
      support: 'Qo‘llab-quvvatlash',
      logout: 'Chiqish',
      start_practice: 'Mashqni boshlash',
    },
    result: {
      title: 'Test natijalari',
      review_performance: 'Natijangiz va javoblaringizni ko‘rib chiqing',
      your_score: 'Sizning natijangiz',
      loading_results: 'Natijalar yuklanmoqda...',
      excellent_work: 'Ajoyib ish!',
      good_job: 'Yaxshi ish!',
      keep_practicing: 'Amaliyotni davom ettiring!',
      correct: 'To‘g‘ri',
      incorrect: 'Noto‘g‘ri',
      accuracy: 'Aniqlik',
      test_summary: 'Test xulosasi',
      recent_test: 'So‘nggi test',
      take_another_test: 'Yana bir test oling',
      back_to_dashboard: 'Boshqaruv paneliga qaytish',
      performance: 'Natija:',
      excellent: 'Ajoyib!',
      good: 'Yaxshi ish!',
      keep_practicing_short: 'Amaliyotni davom ettiring!',
    },
    mock: {
      title: 'TOPIK testi',
      practice_test: 'Amaliy test',
      loading_questions: 'Savollar yuklanmoqda...',
      passage: 'Paragraf:',
      submit_test: 'Testni yuborish',
      submitting: 'Yuborilmoqda...',
      no_questions: 'Savollar mavjud emas',
      no_test_questions: 'Ushbu testda hali savollar mavjud emas.',
      back_to_dashboard: 'Boshqaruv paneliga qaytish',
      answer_at_least_one: 'Iltimos, kamida bitta savolga javob bering.',
    },
  },
};

function resolveKey(object, path) {
  return path.split('.').reduce((result, key) => {
    if (result && typeof result === 'object') {
      return result[key];
    }
    return undefined;
  }, object);
}

export const useLangStore = defineStore('lang', () => {
  const locale = ref(localStorage.getItem('app_locale') || 'en');

  const availableLocales = [
    { code: 'en', label: messages.en.languages.en },
    { code: 'ru', label: messages.ru.languages.ru },
    { code: 'uz', label: messages.uz.languages.uz },
  ];

  const localeLabel = computed(() => {
    return messages[locale.value]?.languages?.[locale.value] || locale.value;
  });

  const setLocale = (newLocale) => {
    if (messages[newLocale]) {
      locale.value = newLocale;
      localStorage.setItem('app_locale', newLocale);
    }
  };

  const t = (key, values = {}) => {
    const active = resolveKey(messages[locale.value], key);
    const fallback = resolveKey(messages.en, key);
    let text = active ?? fallback ?? key;
    if (typeof text === 'string') {
      Object.entries(values).forEach(([name, value]) => {
        text = text.replace(`{${name}}`, value);
      });
    }
    return text;
  };

  return {
    locale,
    localeLabel,
    availableLocales,
    setLocale,
    t,
  };
});
