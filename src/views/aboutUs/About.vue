<template>
  <section class="about-page">
    <!-- Header -->
    <header class="about-header">
      <h1>درباره سامانه حقوقی هوشمند</h1>
      <p class="subtitle">
        پلی میان مردم و خدمات حقوقی، با تکیه بر فناوری‌های نوین
      </p>
    </header>

    <!-- Introduction -->
    <section class="about-section">
      <h2>معرفی سامانه</h2>
      <p>
        این سامانه با هدف تسهیل دسترسی عمومی به خدمات و آموزش حقوقی طراحی شده است.
        کاربران می‌توانند بدون نیاز به مراجعه حضوری، پاسخ سؤالات حقوقی اولیه خود را
        دریافت کرده و با وکلای متخصص آشنا شوند.
      </p>
    </section>

    <!-- Mission -->
    <section class="about-section">
      <h2>ماموریت ما</h2>
      <p>
        ماموریت اصلی این پروژه، افزایش آگاهی حقوقی جامعه و کاهش موانع دسترسی به
        اطلاعات قانونی است. این سامانه تلاش می‌کند با استفاده از هوش مصنوعی و
        محتوای آموزشی معتبر، فرآیند دریافت اطلاعات حقوقی را ساده، سریع و قابل فهم
        نماید.
      </p>
    </section>

    <!-- Services -->
    <section class="about-section">
      <h2>خدمات اصلی سامانه</h2>
      <ul>
        <li>پاسخ‌گویی هوشمند به سؤالات حقوقی با استفاده از هوش مصنوعی</li>
        <li>معرفی و نمایش وکلای ثبت‌نام‌شده بر اساس تخصص و موقعیت مکانی</li>
        <li>وبلاگ آموزشی حقوقی با محتوای دسته‌بندی‌شده و کاربردی</li>
      </ul>
    </section>

    <!-- Vision -->
    <section class="about-section">
      <h2>چشم‌انداز</h2>
      <p>
        چشم‌انداز این پروژه، تبدیل شدن به یک سامانه بومی و قابل اعتماد در حوزه
        خدمات حقوقی آنلاین است؛ به‌گونه‌ای که تمامی اقشار جامعه بتوانند از آن
        بهره‌مند شوند و گامی در جهت عدالت اجتماعی دیجیتال برداشته شود.
      </p>
    </section>
  </section>
</template>

<script setup lang="ts">
/*
  این صفحه فعلاً استاتیک است.
  اگر در آینده API اضافه شد:
  - می‌توان داده‌ها را از backend دریافت کرد
  - یا از CMS استفاده کرد
*/
</script>

<style scoped>
.about-page {
  max-width: fit-content;
  margin: auto;
  padding: 3rem 4rem;
  line-height: 1.9;
  background-color:beige;
}

.about-header {
  margin-bottom: 3rem;
  text-align: center;
}

.about-header h1 {
  font-size: 2rem;
  font-weight: bold;
}

.subtitle {
  margin-top: 0.5rem;
  color: #313131;
}

.about-section {
  margin-bottom: 2.5rem;
}

.about-section h2 {
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.about-section ul {
  padding-right: 1.2rem;
  list-style-type: disc;
}

.about-section li {
  margin-bottom: 0.5rem;
}
</style>
