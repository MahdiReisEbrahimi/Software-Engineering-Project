export default {
  navigation: {
    aiChat: 'هوش مصنوعی',
    map: 'نقشه',
    lowyers: 'وکلا',
    weblog: 'وبلاگ',
    profile: 'پروفایل',
    login: 'ورود',
    aboutUs: 'درباره ما',
  },
  mapPage: {
    findYourNearLoawyer: 'وکیل نزدیکتو پیدا کن',
  },
  auth: {
    login: 'ورود',
    signup: 'ثبت نام',
    reset: 'پاک کردن',
    email: 'ایمیل',
    password: 'رمز عبور',
    passwordConfirm: 'تایید رمز عبور',
    loginCartMessage: 'نقش خود را انتخاب کنید:',
    loading: 'در حال بررسی...',
    hints: {
      password: 'باید شامل حداقل 8 کاراکتر باشد',
      passwordConfirm: 'رمز  عبور را تکرار کنید',
    },
    errors: {
      enterValidEmail: 'ایمیل معتبر وارد کنید',
      passRequired: 'پسورد اجباری است',
      emailRequired: 'ایمیل اجباری است',
      passLength: 'طول رمز عبور باید حداقل 8 کاراکتر باشد',
      confirmPassRequired: 'تایید رمز عبور اجباری است',
      passwordsDoesNotMatch: 'پسوردها همخوانی ندارند',
    },
  },
} as const
