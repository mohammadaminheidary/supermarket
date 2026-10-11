# Design System — هایپر عصر جدید

**نسخه:** 1.0.0  
**تاریخ مستندسازی:** ۱۴۰۵/۰۷/۱۷ — 2026-10-09  
**زبان و جهت:** فارسی، راست‌به‌چپ (`fa`, `rtl`)  
**مرجع استخراج:** آخرین نسخهٔ `red-glass-card/dist/index.html`، شامل کارت‌های کوچک، پنل خرید شناور، افکت قلب و ناوبری سه‌بخشی.  
**وضعیت:** مرجع طراحی و توسعه‌های بعدی این پروژه.

## ۰. روش خواندن و حدود اعتبار سند

این سند از کد HTML/CSS و رفتار JavaScript نسخهٔ تحویل‌شده استخراج شده است؛ مقادیر بر اساس آخرین قواعد مؤثر در cascade گزارش شده‌اند، نه استایل‌های نسخهٔ اولیهٔ کارت. اندازه‌ها بر حسب CSS pixel هستند. مقادیر `padding` و `margin` به ترتیب بالا، راست، پایین، چپ نوشته می‌شوند. به دلیل `box-sizing:border-box`، border و padding داخل عرض یا ارتفاع تعیین‌شده حساب می‌شوند.

سه نوع داده در سند داریم:

- **موجود و قطعی:** مستقیماً در پیاده‌سازی فعلی تعریف شده است؛ مرجع بازتولید طرح فعلی.
- **وابسته به مرورگر:** کد مقدار صریح ندارد؛ مانند `line-height:normal`، وزن پیش‌فرض H3 و padding اولیهٔ بعضی دکمه‌ها. برای این موارد عدد ساختگی به‌عنوان مقدار استخراج‌شده ارائه نشده است.
- **تعریف تکمیلی:** قرارداد جدید برای کامل کردن Design System؛ شامل H4 تا H6، فرم‌ها، دکمهٔ Secondary عمومی و وضعیت‌های معنایی. این موارد در UI فعلی پیاده‌سازی نشده‌اند. در توسعه‌های بعدی از همین قرارداد استفاده می‌شود؛ این سند به‌تنهایی CSS صفحهٔ موجود را تغییر نمی‌دهد.

کل CSS اولیه و رنگ‌های کنارگذاشته‌شده در پیوست نگهداری شده‌اند تا فرق نسخهٔ تاریخی و قواعد فعلی روشن باشد. رنگ پیکسل‌های عکس محصولات جزو پالت رابط نیست؛ عکس‌ها دارایی محتوایی هستند، نه توکن UI. مرورگر و ترکیب لایه‌های شفاف می‌توانند رنگ نهایی دیده‌شده را تغییر دهند؛ برای بازتولید شیشه باید خود opacity، gradient و blur حفظ شود.

## ۱. هویت بصری و قواعد ثابت

1. **رنگ برند قرمز:** `#E52536`؛ سطوح اصلی روشن و نوشته‌ها خاکستری تیره هستند.
2. **شیشهٔ روشن:** مرز سفید، سفید نیمه‌شفاف، blur و سایهٔ نرم چندلایه. رنگ‌ها از زیر شیشه دیده می‌شوند، اما متن روی شیشه تیره و خوانا می‌ماند.
3. **کارت واحد:** عکس بالا و اطلاعات زیر آن؛ پنل قیمت/افزودن داخل همان کارت قرار دارد. نباید به دو کارت جدا یا پنلی چسبیده به لبه تبدیل شود.
4. **پنل خرید شناور:** فاصلهٔ بصری تقریبی ۱۰ px از دو طرف و ۱۱ px از پایین، radius مستقل ۲۰ px و سایهٔ اختصاصی.
5. **کارت کوچک:** عرض track حداکثر ۲۸۰ px؛ عکس ۱۶۴ px؛ ارتفاع کل auto و وابسته به متن است، نه مقدار ثابت.
6. **عکس محصول ثابت:** هیچ bobbing، چرخش یا scale انیمیشنی روی `.product` وجود ندارد.
7. **حرکت کم:** hover بسیار ملایم؛ افکت نمایشی اصلی، پخش قلب هنگام اضافه کردن علاقه‌مندی است.
8. **ناوبری سه جزیره:** راست برند، وسط مسیرها، چپ ورود/سبد. در دسکتاپ بالا و در موبایل پایین؛ سه بخش مستقل باقی می‌مانند.
9. **فارسی:** نام فروشگاه «هایپر عصر جدید»؛ «هایپر» کوچک‌تر و بالای «عصر جدید». اعداد قیمت/تعداد با `Intl.NumberFormat('fa-IR')` و واحد «تومان».
10. **تم فعلی روشن است:** تم تاریک در نسخهٔ فعلی تعریف نشده؛ از معکوس کردن خودکار رنگ‌های این سیستم استفاده نشود.

## ۲. Color Palette

### ۲.۱. توکن‌های موجود در CSS

| متغیر فعلی | مقدار دقیق | نقش |
|---|---|---|
| `--red` | `#E52536` | Primary / برند، قلب فعال، کنترل تعداد |
| `--ink` | `#24272B` | متن اصلی، عنوان، قیمت |
| `--muted` | `#74787E` | متن توضیح و دسته‌بندی |
| `--edge` | `rgba(255,255,255,.87)` | مرز شیشهٔ کارت؛ HEX نزدیک `#FFFFFFDE` |
| `--font` | `Vazir,Tahoma,Arial,sans-serif` | زنجیرهٔ فونت |

**قاعدهٔ HEX:** `#RRGGBBAA` شامل کانال alpha است. مثلاً `#FFFFFFC9` سفید با alpha برابر `201/255 ≈ 78.82%` است. تبدیل rgba به HEX به دلیل کوانتیزه‌شدن ۸بیتی همیشه دقیقاً برابر نیست؛ در بازتولید کارت، مقدار اصلی rgba حفظ شود.

### ۲.۲. برند، Accent و وضعیت تعامل

| HEX | نقش | محل و نحوهٔ استفاده |
|---|---|---|
| `#E52536` | Primary | آیکون برند، badge سبد، قلب انتخاب‌شده و کنترل تعداد |
| `#ED3446` | Primary gradient / start | ابتدای گرادیان افزودن به سبد |
| `#DF1C32` | Primary gradient / end | انتهای گرادیان افزودن به سبد |
| `#F04858` | Discount gradient / start | ابتدای نشان تخفیف |
| `#DF1730` | Discount gradient / end | انتهای نشان تخفیف |
| `#D92238` | Active navigation | متن مسیر فعال؛ hover ابزارهای ناوبری |
| `#C82035` | Navigation hover | متن hover لینک‌های ناوبری |
| `#C32136` | Quantity emphasis | متن تعداد انتخاب‌شده |
| `#B41B30` | Active cart note | مبلغ جمع در زیر کنترل تعداد؛ در نسخهٔ فعلی رنگ Error رسمی نیست |
| `#B8293E` | Accent text | عبارت کوچک بالای H1 |
| `#9E0B24` | Keyboard focus | outline قابل مشاهده برای کنترل‌ها |
| `#FFF1F3` | Selected tint | پس‌زمینهٔ دکمهٔ علاقه‌مندی فعال |
| `#FFE7EB` | Hover tint | پس‌زمینهٔ hover دکمه‌های افزایش/کاهش |
| `#EDAA31` | Rating accent | ستارهٔ امتیاز؛ نه وضعیت Warning در پیاده‌سازی فعلی |
| `#56604F` | Fresh text | نوشتهٔ نشان تازگی؛ نه Success رسمی |
| `#6F8259` | Fresh icon | آیکون برگ در نشان تازگی |

### ۲.۳. سطوح و رنگ‌های خنثی مؤثر

| HEX | نقش | کاربرد |
|---|---|---|
| `#F2F3F5` | Page background | پس‌زمینهٔ `body` |
| `#FFFFFF` | Light / on-primary | متن روی دکمهٔ قرمز، border ها و highlight داخلی |
| `#24272B` | Text primary | عنوان محصول، قیمت، متن اصلی |
| `#353A42` | Tool text | ابزار ورود و سبد در ناوبری |
| `#5A6068` | Navigation muted | متن لینک عادی و دکمهٔ بستن dialog |
| `#616770` | Brand secondary | «هایپر» در لوگوتایپ |
| `#74787E` | Text muted | دسته‌بندی، توضیح محصول |
| `#747B86` | Dialog muted | متن سبد خالی و تعداد هر ردیف |
| `#72767C` | Favorite idle | قلب انتخاب‌نشده |
| `#54575C` | Rating number | عدد امتیاز |
| `#92959A` | Reviews muted | تعداد نظرات |
| `#80858B` | Count muted | تعداد محصولات بالای گرید |
| `#85898F` | Stock muted | موجودی انبار |
| `#9A9DA2` | Old-price muted | قیمت قبل از تخفیف، همراه خط‌خوردگی |
| `#777C82` | Currency muted | واحد تومان |
| `#8A8E93` | Note muted | تضمین کیفیت در پنل خرید |
| `#93979C` | Footer muted | متن footer |
| `#4A4D52` | Toast text | متن اعلان |
| `#F1F2F5` | Utility surface | دکمهٔ بستن dialog |
| `#E6E7EB` | Divider | خط زیر ردیف محصول در سبد |

خاکستری‌های متعدد بالا بخشی از طرح فعلی‌اند؛ برای بازتولید دقیق نباید همه با یک خاکستری جایگزین شوند. در کامپوننت جدید، به‌طور پیش‌فرض فقط از متن اصلی، muted، ابزار یا dialog muted متناسب با نقش استفاده شود.

### ۲.۴. شفافیت، Surface و گرادیان‌ها

| عنصر | مقدار دقیق CSS | HEX / توضیح |
|---|---|---|
| هالهٔ سفید stage | `radial-gradient(ellipse at 49% 48%,rgba(255,255,255,.65),transparent 65%)` | شروع تقریباً `#FFFFFFA6`؛ انتها شفاف |
| Card background | `linear-gradient(145deg,rgba(255,255,255,.8),rgba(255,255,255,.4))` | `#FFFFFFCC → #FFFFFF66`، معادل دقیق برای .8 و .4 |
| Card border | `1.5px solid rgba(255,255,255,.87)` | نزدیک `#FFFFFFDE` |
| عکس محصول | `radial-gradient(ellipse at 48% 50%,#FFF7F4B0,transparent 75%)` | هالهٔ گرم سفید با alpha≈69.02% |
| Purchase panel | `linear-gradient(145deg,#FFFFFFF5,#FFFFFFC9)` | alpha≈96.08% → 78.82% |
| Purchase border | `1px solid #FFFFFFED` | alpha≈92.94% |
| Desktop navbar | `linear-gradient(135deg,#FFFFFFC9,#FFFFFF96)` | alpha≈78.82% → 58.82% |
| Navbar border | `1px solid #FFFFFFDF` | alpha≈87.45% |
| Mobile navbar | `linear-gradient(135deg,#FFFFFFE0,#FFFFFFB3)` | alpha≈87.84% → 70.20% |
| Navbar active item | `#FFFFFFB5` | alpha≈70.98% |
| Navbar link hover | `#FFFFFF90` | alpha≈56.47% |
| Navbar tool hover | `#FFFFFFA8` | alpha≈65.88% |
| Navbar separator | `#444B5817` | خاکستری با alpha≈9.02% |
| Navbar fallback | `#F8F9FBF5` | بدون پشتیبانی backdrop-filter |
| Favorite idle surface | `#FFFFFF80` | alpha≈50.20% |
| Fresh badge surface | `#FFFFFFB0` | alpha≈69.02% |
| Quantity surface | `#FFF8` = `#FFFFFF88` | alpha≈53.33% |
| Dialog surface | `#FFFFFFF0` | alpha≈94.12% |
| Dialog backdrop | `#343A4538` | alpha≈21.96% |
| Toast | `#FFFFFFE0` | alpha≈87.84% |
| Buy border | `#FF617075` | قرمز روشن با alpha≈45.88% |
| Buy inner highlight | `#FFFFFF35` | alpha≈20.78% |
| Discount border | `#FF8D9760` | alpha≈37.65% |
| Heart ring | `#ED34465C` | alpha≈36.08% |

`transparent` در فهرست HEX، `#00000000` نمایش داده می‌شود؛ در recipe گرادیان از همان واژهٔ `transparent` استفاده شود و با مشکی opaque جایگزین نشود.

### ۲.۵. رنگ‌های دکور پس‌زمینه

| لایه | Gradient | Opacity کل لایه |
|---|---|---|
| `.orb-one` | `radial-gradient(circle at 32% 27%,#FF939B,#EF5362 60%,#D62338)` | `.24` |
| `.orb-two` | `radial-gradient(circle at 30% 22%,#FFB8BC,#E92C45)` | `.14` |

این رنگ‌ها فقط دکور هستند؛ برای متن، Error یا CTA استفاده نمی‌شوند. `filter:blur(2px)` روی هر orb اعمال می‌شود. opacity کل عنصر علاوه بر رنگ گرادیان روی نتیجه اثر دارد.

### ۲.۶. وضعیت‌های معنایی — تعریف تکمیلی برای توسعه‌های بعدی

در UI فعلی رنگ یا کامپوننت مستقل Success/Error/Warning/Info وجود ندارد. رنگ تازگی و ستاره را نباید به‌عنوان پیام موفقیت یا هشدار استخراج‌شده معرفی کرد. قرارداد کامل زیر برای فرم‌ها و پیام‌های آینده تعریف می‌شود:

| وضعیت | متن / آیکون | Surface | Border | مبنا |
|---|---|---|---|---|
| Success | `#56604F` / `#6F8259` | `#F2F6ED` | `#C9D6BB` | متن و آیکون موجود؛ سطح و مرز جدید |
| Error | `#B41B30` | `#FFF1F3` | `#EFBDC6` | متن و tint موجود؛ مرز جدید |
| Warning | `#6F4C14` | `#FFF5DE` | `#EDAA31` | رنگ ستاره موجود؛ متن و سطح جدید |
| Info | `#353A42` | `#FFFFFFE0` | `#E6E7EB` | ترکیب توکن‌های موجود |
| Disabled | `#92959A` | `#F1F2F5` | `#E6E7EB` | ترکیب توکن‌های موجود |

رنگ‌های جدید این قرارداد دقیقاً پنج موردند: `#F2F6ED`، `#C9D6BB`، `#EFBDC6`، `#6F4C14`، `#FFF5DE`. این رنگ‌ها در کد مرجع فعلی حضور ندارند. پیام وضعیت باید متن و در صورت نیاز آیکون داشته باشد؛ معنای وضعیت فقط با رنگ منتقل نشود. قرمز Primary همچنان برای خرید و برند استفاده می‌شود و معنای Error ندارد مگر در کامپوننت وضعیت.

## ۳. Typography System

### ۳.۱. فونت

```css
@font-face {
  font-family: Vazir;
  src: url('assets/Vazirmatn.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
:root { --font: Vazir, Tahoma, Arial, sans-serif; }
body { font-family: var(--font); -webkit-font-smoothing: antialiased; }
button { font-family: inherit; }
```

نام فایل **Vazirmatn** است و alias آن در CSS **Vazir**. بازهٔ وزن ثبت‌شده در CSS `100–900` است؛ این سند ادعای مستقلی دربارهٔ متادیتای داخل فایل فونت ندارد. هیچ فونت دوم برای انگلیسی یا اعداد در طرح تعریف نشده است. اعداد فارسی از formatter تولید می‌شوند و همان خانوادهٔ فونت را دارند.

### ۳.۲. تیترها و متن‌های موجود — مقدار مؤثر

| نقش / Selector | Font size | Weight | Line height | Letter spacing | نکته |
|---|---|---|---|---|---|
| H1 / `.catalog-heading h1`، عرض >680 | `28px` | `800` | `1.6` = `44.8px` | `-.8px` | margin صفر |
| H1، عرض ≤680 | `23px` | `800` | `1.6` = `36.8px` | `-.8px` | آخرین media مؤثر |
| H1، عرض ≤370 | **`23px`** | `800` | `1.6` | `-.8px` | قاعدهٔ قدیمی `21px` با media پایین‌ترِ ≤680 بازنویسی شده |
| H2 / عنوان محصول | `20px` | `800` | `1.5` = `30px` | `-.7px` | margin صفر، در همهٔ عرض‌های فعلی |
| H2 / `.cart-heading h2` | `22px` | `800` | `1.5` = `33px` | `-.7px` | از h 2 عمومی ارث می‌گیرد |
| H3 / `.cart-line h3` | `15px` | در CSS صریح نیست؛ معمولاً UA bold | `normal` | `normal` | margin `0 0 4px`؛ H3 عمومی طراحی نشده |
| H4 تا H6 | تعریف اختصاصی ندارند | پیش‌فرض UA | پیش‌فرض UA | پیش‌فرض UA | در DOM فعلی نیستند؛ قرارداد کامل در جدول بعد |
| Body / `body` | صریح نیست؛ معمولاً `16px` پیش‌فرض مرورگر | `normal` معمولاً 400 | `normal` | `normal` | نباید 1.7 را به کل body فعلی نسبت داد |
| توضیح محصول / `.description` | `14px` | `normal` | `1.7` = `23.8px` | `normal` | muted؛ حداقل ارتفاع 24، margin-top 3 |
| سبد خالی / `.cart-empty` | `16px` | `normal` | `normal` | `normal` | متن وسط‌چین |
| نام فروشگاه / `.brand-wordmark strong` | `21px` | `850` | `1.4` = `29.4px` | `-.7px` | line-height از wordmark |
| نام فروشگاه ≤680 | `16px` | `850` | `1.4` = `22.4px` | `-.6px` | ≤360: `15px`، LH 21 |
| هایپر / `.brand-prefix` | `12px` | `500` | `1.4` = `16.8px` | `normal` | متن خاکستری `#616770` |
| قیمت اصلی / `.price strong` | `22px` | `850` | `1.4` = `30.8px` | `-.7px` | در flex با واحد baseline است |

`normal` عدد ثابتی ندارد و با فونت و مرورگر تغییر می‌کند. پیش‌فرض مرورگر در سند، مقدار استخراج‌شده از CSS مؤلف محسوب نمی‌شود. قواعد نمونهٔ قدیمی مانند H2 با 23 px یا قیمت با 26 px برای کارت‌های فعلی معتبر نیستند.

### ۳.۳. Label، Meta و متن کنترل‌ها — موجود

| نقش | Size | Weight | Line height |
|---|---|---|---|
| Kicker بالای عنوان | 13؛ ≤600:12 | normal | normal |
| تعداد محصولات | 13؛ ≤600:12؛ ≤370:11 | normal | normal |
| دسته‌بندی / `.meta` | 12 | normal | normal |
| عدد امتیاز | 13 | 600 | normal |
| تعداد نظرات | 12 | normal | normal |
| Badge تخفیف | 13 | 750 | normal |
| Badge تازگی | 12 | normal | normal |
| موجودی / `.stock` | 12 | normal | normal |
| قیمت قبل از تخفیف | 12 | normal | normal |
| واحد تومان | 12 | normal | 1.4 =16.8، ارث از `.price` |
| دکمه افزودن | 14 | 650 | normal، وسط‌چین با flex |
| برچسب تعداد انتخاب‌شده | 14 | 700 | normal |
| علامت + در کنترل تعداد | 24 | وزن اختصاصی ندارد | normal |
| یادداشت زیر کنترل خرید | 12 | normal | normal؛ min-height 19 |
| لینک و دکمهٔ navbar | 14؛ لینک موبایل 12 | 600 | normal |
| Badge شمارندهٔ سبد | 11؛ موبایل 10 | وزن اختصاصی ندارد | **1** |
| ردیف سبد: تعداد | 13 | normal | normal |
| ردیف سبد: مبلغ | 14 | strong / معمولاً 700 | normal |
| جمع سبد | 15 | normal؛ مبلغ strong | normal |
| ادامهٔ انتخاب محصولات | 14 | 600 | normal |
| Toast | 14 | normal | normal |
| Footer | 12؛ ≤600:11 | normal | normal |

### ۳.۴. مقیاس کامل برای کامپوننت‌های جدید — تعریف تکمیلی

این جدول خلأ تیترهای عمومی و line-height های صریح را تکمیل می‌کند. نباید selector عمومی جدیدی اضافه کرد که typography اختصاصی کارت یا navbar موجود را ناخواسته تغییر دهد؛ از کلاس نقش استفاده شود.

| Token / Class | Size دسکتاپ | Size ≤680 | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| `type-h1` | 28 | 23 | 800 | 1.6 | -.8 px |
| `type-h2` | 20 | 20 | 800 | 1.5 | -.7 px |
| `type-h3` | 20 | 20 | 700 | 1.5 | 0 |
| `type-h4` | 18 | 18 | 700 | 1.5 | 0 |
| `type-h5` | 16 | 16 | 650 | 1.6 | 0 |
| `type-h6` | 14 | 14 | 650 | 1.6 | 0 |
| `type-body` | 14 | 14 | 400 | 1.7 | 0 |
| `type-body-large` | 16 | 16 | 400 | 1.7 | 0 |
| `type-label` | 12 | 12 | 500 | 1.5 | 0 |
| `type-caption` | 12 | 12 | 400 | 1.5 | 0 |
| `type-button` | 14 | 14 | 650 | 1.5 | 0 |

نام role لزوماً همان تگ HTML نیست. برای مثال نام محصول داخل سبد از نظر معنایی H3 است، اما role بصری موجود آن `15px` است و نباید به `type-h3` با 20 px تغییر کند. ترتیب تیترهای معنایی متناسب با صفحه رعایت شود و اندازهٔ بصری با کلاس تعیین گردد.

## ۴. Component Styles

### ۴.۱. کالبدشکافی کارت محصول

```text
article.card                         ← پوستهٔ واحد شیشه‌ای
├── .visual-shell                    ← padding:14px 14px 8px
│   └── .photo-area                  ← height:164px، radius:19px
│       ├── .discount                ← بالا راست
│       ├── button.favorite          ← بالا چپ
│       ├── img.product              ← ثابت، contain، عکس PNG شفاف
│       └── .fresh                   ← پایین راست
└── .info                            ← padding:8px 14px 10px
    ├── .meta                        ← دسته‌بندی + امتیاز
    ├── h2                           ← عنوان محصول
    ├── .description                 ← شرح کوتاه
    └── .purchase-panel              ← جزیرهٔ شناور داخل پوسته
        ├── .price-row               ← موجودی + قیمت
        ├── button.buy               ← پیش از انتخاب
        ├── .quantity                ← پس از انتخاب؛ جایگزین buy
        └── .cart-note               ← تضمین کیفیت / جمع مبلغ
```

| جزء | اندازه و فاصله | Border / Radius | افکت |
|---|---|---|---|
| `.card` | عرض وابسته به grid، max track 280؛ ارتفاع auto؛ `min-width:0` | `1.5px solid rgba(255,255,255,.87)`؛ radius 28 | blur 26؛ perspective 1400؛ isolation:isolate |
| `.visual-shell` | padding `14px 14px 8px` | — | position:relative |
| `.photo-area` | height 164؛ عرض auto | radius 19 | هالهٔ گرم، grid/place-items:center |
| `.product` | عرض/ارتفاع 100%؛ absolute top 0 left 0؛ object-fit:contain | — | drop-shadow؛ بدون animation/transform |
| `.photo-area::after` | width 65%؛ height 12؛ bottom 14 | radius 50% | `#89232919`، blur 15 |
| `.info` | padding `8px 14px 10px`؛ margin 0 | — | position:relative |
| `.meta` | gap 8؛ margin-bottom 5 | — | flex space-between |
| `.description` | margin `3px 0 0`؛ min-height 24 | — | line-height 1.7 |
| `.purchase-panel` | margin `12px -5px 0`؛ padding `14px 12px 12px` | border 1 px `#FFFFFFED`؛ radius 20 | blur 18؛ transform-origin 50% 0؛ z-index 4 |
| `.price-row` | gap 6؛ margin-bottom 13 | — | flex space-between، align:center، wrap |
| `.prices` | gap 1 | — | ستون، align-items:flex-end |
| `.price` | gap 5 | — | flex align-items:baseline |
| `.cart-note` | margin `9px 0 0`؛ min-height 19، heightauto | — | center؛ aria-live:polite |

**فاصلهٔ شناور:** padding جانبی `.info` برابر 14 است و margin جانبی پنل `-5px`؛ بنابراین لبهٔ پنل ۹ px داخل content box کارت می‌ماند. با احتساب border 1.5 px پوسته، فاصله تا لبهٔ بیرونی≈۱۰.۵ px است. از پایین، padding 10 px `.info` به‌اضافهٔ border 1.5 px≈۱۱.۵ px می‌شود. بنابراین تعبیر بصری «۱۰ px اطراف / ۱۱ px پایین» تقریبی است؛ recipe دقیق همین 14، −5، 10 و border 1.5 است. این پنل بیرون کارت آویزان نشده و حاشیهٔ منفی قدیمی `-26px` نباید بازگردد.

**سایهٔ پوسته، موجود:**

```css
box-shadow:
  0 25px 55px -25px #8a4b5440,
  0 8px 20px #21212b06,
  inset 0 1px 1px #fff;
```

**سایهٔ پنل، موجود:**

```css
/* Rest */
box-shadow:
  0 12px 23px -7px #74324738,
  0 3px 7px #5b20390c,
  inset 0 1px 0 #fff;
/* Hover */
box-shadow:
  0 13px 24px -7px #7432473d,
  0 3px 7px #5b20390c,
  inset 0 1px 0 #fff;
```

با border-box، خود کارت حداقل/حداکثر track 250/280 را اشغال می‌کند؛ ارتفاع عکس 164 ثابت است، ولی ارتفاع کل کارت با wrap عنوان یا توضیح می‌تواند تغییر کند. `align-items:start` مانع stretch عمودی همهٔ کارت‌ها به یک ارتفاع اجباری می‌شود. مقادیر 34 px radius، عکس 267 px و قیمت 26 px از نسخهٔ اولیه‌اند و در کارت فعلی بازنویسی شده‌اند.

### ۴.۲. Badge ها و علاقه‌مندی

| کامپوننت | Recipe موجود |
|---|---|
| تخفیف | absolute top 0 right 0، z 3، gap 5، padding 6 px 10 px، radius 12، border 1 px `#FF8D9760`، گرادیان 135 deg `#F04858 → #DF1730`، متن سفید 13/750، shadow `0 5px 10px #E5253618` |
| علاقه‌مندی | 36×36، radius 50%، border 1 px سفید، surface `#FFFFFF80`، blur 12، shadow `0 4px 14px #2C222208`، absolute top 0 left 0، z 3 |
| علاقه‌مندی Hover | scale 1.025، رنگ Primary؛ transition رنگ/background/transform هرکدام.25 s |
| علاقه‌مندی Selected | `aria-pressed=true`، surface `#FFF1F3`، stroke و fill هر دو `#E52536`؛ fill شفاف قدیمی بازنویسی شده |
| تازگی | absolute right 0 bottom 0، z 3، padding 5 px 8 px، gap 5، radius 99، border 1 px سفید، surface `#FFFFFFB0`، blur 14، shadow `0 4px 16px #27272B05` |
| امتیاز | flex gap 5 و `direction:ltr`؛ ستاره 13×13 طلایی، عدد 13/600، review 12 muted |

علاقه‌مندی و تخفیف نسبت به `.photo-area` جای‌گذاری می‌شوند، نه لبهٔ بیرونی کارت. Badge تازگی یک برچسب محتواست و ظاهر آن با پیام Success فرم یکی نیست.

### ۴.۳. Buttons — موجود

#### Primary: افزودن به سبد

```css
.buy {
  height: 44px; width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 7px;
  color: #fff;
  background: linear-gradient(145deg,#ed3446,#df1c32);
  border: 1px solid #ff617075; border-radius: 14px;
  font-size: 14px; font-weight: 650;
  box-shadow: 0 8px 17px #e5253628, inset 0 1px 0 #ffffff35;
  transition: transform .2s, box-shadow .2s;
}
.buy:hover { transform: translateY(-.5px); box-shadow: 0 9px 19px #e5253630; }
.buy:active { transform: scale(.98); }
button:focus-visible { outline: 3px solid #9e0b24; outline-offset: 5px; }
```

Padding در `.buy` صریح نشده و مقدار آغازین آن از stylesheet مرورگر می‌آید؛ برای بازتولید نسخهٔ فعلی، `height:44px` و flex مرجع‌اند. ادعای padding 16 px برای دکمهٔ موجود صحیح نیست. اندازهٔ آیکون 18×18 است. حالت disabled یا loading برای این دکمه در نسخهٔ فعلی تعریف نشده.

#### Quantity: کنترل تعداد

- Wrapper: height 44، radius 14، surface `#FFFFFF88`، border 1 px سفید، shadow `0 5px 12px #E5253610`.
- `display:none` در شروع؛ با `.is-visible` به flex تبدیل می‌شود. دکمه buy با `.is-hidden` مخفی می‌شود.
- دکمهٔ افزایش/کاهش:42×36، margin 3، radius 14، border 0، background transparent، رنگ Primary، مرکز با grid. padding اختصاصی در CSS ندارد.
- Hover: background `#FFE7EB`؛ transform اختصاصی ندارد.
- مقدار تعداد:14 px/700 با رنگ `#C32136`.
- حد تعداد:0 تا 99. در 0، کنترل تعداد مخفی و CTA اولیه برمی‌گردد. در 99 افزایش متوقف می‌شود؛ disabled بصری تعریف نشده.

#### ابزار Navbar

- `.nav-button`: height 46، min-width 44، padding 0 10، radius 16، border 0، شفاف، متن 14/600، gap 7.
- Hover: متن `#D92238`، background `#FFFFFFA8`؛ transition رنگ و پس‌زمینه.18 s؛ حرکت ندارد.
- `.nav-cart`: padding 0؛ badge سبد absolute است.
- Mobile: min-width 36، height 46، padding 0؛ متن ورود مخفی و آیکون 20 است.
- حالت `:active` اختصاصی ندارد. این کنترل‌ها دکمهٔ شیشه‌ای توپر جداگانه نیستند؛ داخل جزیرهٔ شیشه‌ای مشترک قرار دارند.

#### دکمه‌های Dialog

- Close:36×36، دایره، border 0، background `#F1F2F5`، متن/آیکون `#5A6068`، آیکون 18.
- Return:width 100%، min-height 44، radius 14، border 0، backgroundPrimary، متن سفید 14/600. padding، hover و active اختصاصی ندارد؛ keyboard focus عمومی برقرار است.

### ۴.۴. دکمهٔ Secondary و حالت‌های عمومی — تعریف تکمیلی

کلاس عمومی Secondary در صفحهٔ فعلی وجود ندارد. قرارداد زیر از کنترل تعداد و سطوح شیشه‌ای استخراج و تکمیل شده است:

| حالت | Primary عمومی | Secondary عمومی |
|---|---|---|
| Rest | گرادیان 145 deg `#ED3446 → #DF1C32`، متن سفید | `#FFFFFF88`، متن Primary، border 1 px سفید، blur 12 |
| Padding | `0 16px` | `0 16px` |
| Size / Radius | min-height 44 / radius 14 | min-height 44 / radius 14 |
| Type |14/650، LH 1.5، gap 7، icon 18 |14/650، LH 1.5، gap 7، icon 18 |
| Shadow | recipe دکمه buy | `0 5px 12px #E5253610` |
| Hover | translateY(-.5 px)، shadow حالت hover در buy | surface `#FFE7EB`، بدون جابه‌جایی |
| Pressed / `:active` | scale(.98) | scale(.98) |
| Focus-visible | outline 3 px `#9E0B24`؛ offset 5 | همان |
| Disabled | surface `#F1F2F5`، متن `#92959A`، border `#E6E7EB`، shadow:none، transform:none | همان |
| Loading | اندازه ثابت، برچسب موجود، `aria-busy=true`، spinner 18، جلوگیری از ارسال تکراری | همان |

`disabled` واقعی یا کنترل رفتار و `aria-disabled` استفاده شود؛ صرف تغییر رنگ کافی نیست. Primary عمومی با button فعلی هم‌خانواده است ولی padding و LH صریح آن تعریف تکمیلی است. این قواعد به کلاس‌های نقش جدید اعمال می‌شوند تا صفحهٔ فعلی بی‌اجازه تغییر نکند.

### ۴.۵. Floating Navbar — موجود

```text
RTL: [برند: هایپر / عصر جدید]   [خانه | محصولات | تخفیف‌ها]   [ورود | سبد]
      راست                          وسط                         چپ
```

| ویژگی | Desktop >680 | Mobile ≤680 |
|---|---|---|
| مکان | fixed، `inset:18px 0 auto` | fixed، `inset:auto 0 max(12px,env(safe-area-inset-bottom))` |
| فاصلهٔ wrapper | padding 0 26 | padding 0 12 |
| عرض inner | max 1236، margin auto | max 560، margin auto |
| Grid | `1fr auto 1fr`، direction:rtl | `86px minmax(0,1fr) 86px` |
| Gap |18 |6 |
| جزیره‌ها |min-height 64؛ radius 23 |min-height 64؛ radius 21 |
| Border |1 px `#FFFFFFDF` |همان |
| Blur |32 px saturate 165% |همان |
| Surface |gradient 135 deg C 9→96 سفید |gradient 135 deg E 0→B 3 سفید |
| Shadow |`0 8px 25px #29304010,inset 0 1px 0 #FFF` |`0 6px 25px #2930401A,inset 0 1px 0 #FFF` |
| z-index |30 |30 |

Wrapper دارای `pointer-events:none` و جزیره‌ها `pointer-events:auto` هستند؛ فاصله‌های بین جزیره‌ها روی محتوای زیر کلیک را مسدود نمی‌کنند. برند `justify-self:start` و ابزارها `justify-self:end` در RTL به‌ترتیب راست و چپ قرار می‌گیرند.

**برند:** desktop padding 8 px 17 px، gap 11، icon 36×36/radius 12 با رنگ Primary و shadow `0 5px 12px #E5253620`. خود SVG برند width 23 و height 22 از قاعدهٔ عمومی است. در موبایل icon مخفی، padding 7 px 4 px و wordmark وسط‌چین می‌شود.

**جزیرهٔ وسط:** desktop padding 7، gap 4؛ لینک height 46/padding 0 17/radius 16. خانه width 40 با SVG 19. در موبایل padding 6 px 4 px/gap 2؛ لینک height 48/padding 0 8/radius 15/font 12؛ خانه width 30 و SVG 18.

**جزیرهٔ ابزارها:** desktop padding 7 px 9 px/gap 6؛ mobile padding 7 px 3 px/gap 2. separator 1×24 با `#444B5817`؛ در موبایل ارتفاع 22.

**Selected:** `.nav-choice.is-active`، متن `#D92238`، surface `#FFFFFFB5`، shadow `0 3px 10px #6D283008` و `aria-current=page`. اگر لینک فعال hover شود، قاعدهٔ hover بعدی surface `#FFFFFF90` و متن `#C82035` را اعمال می‌کند؛ shadow فعال می‌ماند.

**Badge سبد:** desktop min-width 18/height 18، padding 0 4، radius 10، top 2/right 0، font 11/LH 1، Primary و متن سفید، ring `0 0 0 2px #FFFFFFE0`. mobile min-width 16/height 16، font 10، top 1/right−1. شمارنده جمع تعداد واحدهاست، نه تعداد SKU؛ وقتی 0 است hidden می‌شود.

**در عرض ≤360:** ستون‌ها `78px minmax(0,1fr) 82px`، gap 5، خانه مخفی، نام فروشگاه 15 px، padding لینک 0 7. ترتیب سه‌بخشی حفظ می‌شود.

**Fallback موجود:** در `@supports not (backdrop-filter:blur(1px))` background جزیره `#F8F9FBF5` می‌شود. media موبایل بعد از این fallback نوشته شده است و در عرض≤680 دوباره background گرادیانی را اعمال می‌کند؛ بنابراین تضمین fallback opaque برای موبایل در کد فعلی وجود ندارد. اگر پشتیبانی مرورگرِ بدون blur لازم باشد، تعریف تکمیلیِ همان fallback پس از media ها درج شود تا در همهٔ عرض‌ها مؤثر باشد.

### ۴.۶. Cart Dialog — موجود

| بخش | مشخصات |
|---|---|
| پوسته | native `<dialog>` با `.showModal()`؛ `width:min(440px,calc(100% - 32px))`؛ max-height 80 svh؛ padding 24؛ radius 28؛ border 1 px سفید |
| Surface |`#FFFFFFF0`، blur 30، متن ink |
| Shadow |`0 30px 80px #29304025` |
| Backdrop |`#343A4538`، blur 7 |
| Heading |flex space-between، gap 16، margin-bottom 20؛ عنوان 22 px |
| Content |grid gap 12 |
| Empty |16 px muted، text-align:center، padding 24 px 0 34 px، margin 0 |
| Line item |flex center gap 12، padding 9 px 0، border-bottom 1 px `#E6E7EB` |
| Image |62×62، object-fit:contain |
| Name / Qty / Price |15 /13 /14 px؛ نام margin-bottom 4 |
| Summary |flex space-between gap 12، margin 20 px 0، font 15؛ برای سبد خالی hidden |
| Mobile≤680 |padding 21، radius 24 |

Dialog در top layer مرورگر قرار می‌گیرد و با z-index navbar محدود نمی‌شود. بستن از دکمه close، دکمه return، Escape بومی مرورگر و کلیک خارج مستطیل dialog انجام می‌شود. مجموع سبد از قیمت واحد×تعداد محاسبه می‌شود. سبد در حافظهٔ صفحه نگهداری می‌شود؛ ماندگاری پس از refresh، checkout، پرداخت و احراز هویت در این نسخه وجود ندارد. دکمهٔ ورود فقط toast نمایشی می‌دهد.

### ۴.۷. Toast — موجود

- Desktop:fixed bottom 25، left 50%، padding 11 px 20 px، radius 16، border 1 px سفید، surface `#FFFFFFE0`، blur 20، shadow `0 10px 30px #2C222211`.
- Type:14 px با رنگ `#4A4D52`؛ white-space:nowrap؛ pointer-events:none؛ z 8.
- Rest:opacity 0 و `transform:translate(-50%,20px)`؛ Show:opacity 1 و `translate(-50%,0)`؛ transition opacity/transform.25 s.
- Mobile≤680:bottom 100، max-width`calc(100% - 32px)`، white-space:normal، text-align:center، z 40 برای قرارگیری بالای navbar.
- زمان نمایش:2200 ms؛ با اعلان جدید timer قبلی پاک می‌شود. `role=status` دارد. خود کارت نیز `.cart-note` با aria-live:polite دارد.

### ۴.۸. Forms & Inputs — تعریف تکمیلی

صفحهٔ فعلی `<input>`، `<textarea>`، `<select>` و فرم ورود ندارد؛ بنابراین border، focus یا placeholder ِ فرم از UI فعلی قابل استخراج نیست. قرارداد زیر برای فرم ورود، جست‌وجو و اطلاعات کاربر در ادامهٔ پروژه تعریف می‌شود:

| ویژگی | قرارداد |
|---|---|
| Field wrapper |display:grid؛ gap 6؛ direction:rtl |
| Label |12 px/500، LH 1.5، رنگ ink؛ اتصال `for/id` |
| Input |width 100%؛ min-height 44 px؛ padding 10 px 12 px؛ radius 14 px؛ border 1 px solid `#DADBDF` |
| Surface |`#FFFFFFE0`؛ backdrop-filter:blur(12 px) و نسخهٔ WebKit |
| Font |var(--font)؛ 14 px/400؛ line-height 1.5؛ رنگ ink |
| Placeholder |`#85898F`؛ opacity 1؛ label مستقل لازم است |
| Hover |border-color `#92959A`؛ بدون حرکت |
| Focus |border-colorPrimary؛ outline 3 px `#9E0B24` با offset 3؛ shadow:none |
| Leading icon |18×18، stroke 1.65، currentColor، رنگ `#72767C`؛ right 12 px؛ pointer-events:none |
| With icon |padding-inline-start 40 px؛ icon در inline-start سمت راست قرار می‌گیرد |
| Trailing action |کنترل 40×40 با aria-label؛ left 2 px، center عمودی؛ padding-inline-end 44 px |
| Help text |12 px/400، LH 1.5؛ muted؛ gap 6 بعد از ورودی |
| Error |border `#B41B30`؛ helper همان رنگ؛ `aria-invalid=true` و `aria-describedby` |
| Success |border `#6F8259`؛ helper `#56604F`؛ پیام موفقیت صریح |
| Disabled |surface `#F1F2F5`؛ متن `#92959A`؛ border `#E6E7EB`؛ disabled واقعی؛ بدون shadow/حرکت |
| Read-only |همان surface عادی؛ `readonly`؛ متن خوانا؛ انتخاب/کپی ممکن |
| Textarea |min-height 112 px؛ همان padding/radius/font؛ resize:vertical |
| Select |height حداقل 44؛ نقش فرم یکسان؛ آیکون chevron 18 در inline-end؛ گزینهٔ انتخاب‌شده خوانا |
| Email/phone/code |متن ورودی LTR در صورت نیاز؛ wrapper/label همچنان RTL |

نمونهٔ قرارداد؛ این CSS در صفحهٔ فعلی وجود ندارد:

```css
.ds-field { display:grid; gap:6px; }
.ds-label { color:var(--ink); font:500 12px/1.5 var(--font); }
.ds-input {
  box-sizing:border-box; width:100%; min-height:44px; padding:10px 12px;
  border:1px solid #dadbdf; border-radius:14px;
  background:#ffffffe0; color:var(--ink); font:400 14px/1.5 var(--font);
  backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
}
.ds-input::placeholder { color:#85898f; opacity:1; }
.ds-input:hover:not(:disabled) { border-color:#92959a; }
.ds-input:focus { border-color:var(--red); outline:3px solid #9e0b24; outline-offset:3px; }
.ds-input[aria-invalid="true"] { border-color:#b41b30; }
.ds-input:disabled { background:#f1f2f5; color:#92959a; border-color:#e6e7eb; }
.ds-input-wrap { position:relative; }
.ds-input--icon { padding-inline-start:40px; }
.ds-input-icon { position:absolute; inset-inline-start:12px; top:50%; transform:translateY(-50%); width:18px; height:18px; color:#72767c; pointer-events:none; }
```

## ۵. Spacing & Layout

### ۵.۱. سیستم فاصلهٔ واقعی

کد فعلی بر مبنای یک scale کاملاً یکنواخت 4 یا 8 px نوشته نشده است؛ هم فاصله‌های عمومی وجود دارند و هم تنظیم‌های اپتیکی مثل 5، 7، 9، 11، 13، 17، 21، 22، 26. ادعای «همهٔ فاصله‌ها مضرب 8» نادرست است.

برای توسعهٔ جدید، scale عمومی زیر قرارداد است؛ مقادیر اختصاصی کامپوننت‌های موجود نباید برای گرد کردن به این scale تغییر کنند:

| Token پیشنهادی | Value | کاربرد |
|---|---|---|
| `space-1` |4 px |فاصلهٔ خیلی کم، لینک‌های navbar دسکتاپ |
| `space-2` |8 px |meta، فضای کوچک |
| `space-3` |12 px |ریزگروه‌ها، سبد، پنل |
| `space-4` |16 px |گروه اطلاعات، gap heading |
| `space-5` |20 px |بخش‌های داخلی dialog |
| `space-6` |24 px |grid و padding dialog |
| `space-7` |28 px |margin heading دسکتاپ |
| `space-8` |32 px |گروه‌های جدید با فاصلهٔ بیشتر |
| `space-9` |40 px |فاصلهٔ بخش‌های جدید |
| `space-10` |48 px |فاصلهٔ بزرگ صفحات جدید |
| `space-11` |56 px |padding پایین catalog دسکتاپ |

32، 48 و 40 در این جدول نقش spacing عمومیِ تکمیلی دارند؛ صرف حضور اعداد مشابه در عرض آیکون یا shadow به معنی scale موجود نیست. recipe های 14 px padding کارت، −5 px margin پنل و gap 22 px تبلت استثناهای ثبت‌شده هستند.

### ۵.۲. Container و Grid موجود

```css
.catalog {
  display:block; max-width:1320px; margin:0 auto;
  padding:24px 42px 56px;
  min-height:calc(100svh - 150px);
}
.product-grid {
  display:grid; width:100%;
  grid-template-columns:repeat(auto-fit,minmax(250px,280px));
  justify-content:center; align-items:start;
  gap:24px; padding-bottom:12px;
}
```

- max-width 1320 شامل padding است؛ فضای داخلی حداکثر 1236 px می‌شود.
- track ها تا 280 px هستند؛ مرکزچین می‌شوند و فضای اضافه در دو طرف grid باقی می‌ماند.
- سقف فعلی container چهار ستون 280 px با سه gap 24 px را جا می‌دهد؛ نباید با `1fr` کارت‌ها بی‌حد کشیده شوند.
- تعیین تعداد ستون‌ها بر عهدهٔ auto-fit و عرض واقعی container است؛ صرف breakpoint 900 به معنی دقیقاً سه ستون نیست. چون حداکثر track مقدار ثابت 280 دارد، محاسبهٔ تعداد تکرار از فضای مورد نیاز این track ها تأثیر می‌گیرد؛ فقط min 250 ملاک نیست.
- در عرض≤600، grid صریحاً تک‌ستونه می‌شود: `grid-template-columns:minmax(0,280px)`؛ عرض‌های کوچک می‌توانند کارت را کمتر از 250 کنند.
- کارت‌ها `[hidden]` واقعاً display:none دارند؛ فیلتر تخفیف جای خالی ایجاد نمی‌کند.

### ۵.۳. Flexbox موجود

| گروه | Align / Justify | Gap |
|---|---|---|
| Catalog heading |align-items:end / space-between |16؛ ≤680:10 |
| Meta محصول |center / space-between |8 |
| Rating |center، direction:ltr |5 |
| Price row |center / space-between، wrap |6 |
| Prices |column، align-items:flex-end |1 |
| Price + تومان |baseline |5 |
| Buy |center / center |7 |
| Nav links |center / center |4؛ mobile 2 |
| Nav tools |center؛ mobile justify:center |6؛ mobile 2 |
| Cart heading |center / space-between |16 |
| Cart item |center |12 |
| Cart summary |space-between |12 |
| Footer |space-between |≤600:12 |

برای متن‌های طولانی، wrap کنترل‌شده مجاز است؛ ارتفاع کارت auto می‌ماند. عنوان و توضیح truncation یا line-clamp ندارند. اگر توسعهٔ جدید نیاز به محدود کردن متن داشته باشد، آن رفتار باید به‌صورت یک variant مشخص در همین سند ثبت شود.

### ۵.۴. Breakpoint ها و قواعد نهایی Responsive

| شرط | نتیجهٔ مؤثر |
|---|---|
| >900 px |catalog padding 24 px 42 px 56 px؛ grid gap 24؛ navbar بالا |
| 681–900 px |catalog padding 20 px 28 px 44 px؛ grid gap 22؛ navbar بالا |
| 601–680 px |catalog padding **14 px 28 px 44 px**؛ grid gap 22؛ navbar پایین؛ H1=23 |
| ≤600 px |catalog padding 14 px 22 px 36 px؛ grid تک‌ستونه، gap 24؛ heading margin-bottom 24؛ kicker 12، count 12؛ footer 11 |
| ≤370 px |count 11؛ H1 نهایی همچنان 23؛ قواعد قدیمیِ اندازهٔ عکس/پنل قبلاً بازنویسی شده‌اند |
| ≤360 px |ستون navbar 78/وسط/82، gap 5؛ خانه مخفی؛ برند 15 |
| prefers-reduced-motion:reduce |animation و transition همه خاموش؛ transform پنل none؛ heart-burst مخفی |

**Stage:** در دسکتاپ padding-top 96 px؛ در≤680 padding-top 22 px و padding-bottom 100 px برای جلوگیری از پوشاندن محتوا توسط navbar پایین. `min-height:100svh`، `overflow:hidden`، `position:relative`، `isolation:isolate` حفظ شود.

**Heading:** margin-bottom 28 px؛ در≤600 مقدار 24 px. `.product-count` padding-bottom 6 px دارد.

**Scroll:** `.product-grid` scroll-margin-top 108 px در دسکتاپ و 20 px در موبایل. ناوبری به section با smooth scroll می‌رود؛ با reduced motion به auto تغییر می‌کند.

**Footer:** max-width 1320، margin auto، padding 0 42 px 22 px؛ در≤600 padding 0 22 px 18 px. بین 601–900 padding افقی آن همچنان 42 است و دقیقاً با catalog 28 هم‌راستا نیست؛ این مقدار موجود است، نه توصیهٔ یکسان‌سازی بدون درخواست.

**Orb ها:** orb-one 500×500/top 160/left−190؛ orb-two 450×450/top 590/right−180. قواعد قدیمی mobile برای موقعیت orb ها با تعریف متأخر catalog بازنویسی شده‌اند.

**Safe area:** از `max(12px,env(safe-area-inset-bottom))` برای bottom-navbar استفاده می‌شود. padding پایین محتوا در حال حاضر 100 px ثابت است، نه 100+safe-area؛ برای نمایشگرهای دارای safe-area بزرگ، در توسعهٔ بعدی می‌توان variant سازگار با `calc(88px + max(12px,env(safe-area-inset-bottom)))` تعریف کرد. این اصلاح در صفحهٔ موجود اعمال نشده است.

### ۵.۵. Radius scale

| Radius | کاربرد موجود |
|---|---|
|10 px |badge سبد |
|12 px |تخفیف و آیکون برند |
|14 px |buy، quantity، دکمه return، دکمه‌های افزایش/کاهش |
|15 px |لینک navbar موبایل |
|16 px |لینک navbar دسکتاپ، nav-button، toast |
|19 px |photo-area |
|20 px |purchase-panel |
|21 px |جزیره navbar موبایل |
|23 px |جزیره navbar دسکتاپ |
|24 px |dialog موبایل |
|28 px |card، dialog دسکتاپ |
|99 px |fresh badge |
|50% |favorite، close، orb، سایهٔ زیر محصول |

Radius 34 px و پنل 26/33 px متعلق به نسخهٔ قدیمی هستند؛ در توسعهٔ کارت جدید استفاده نشوند.

## ۶. Elevation، Blur و لایه‌ها

| کامپوننت | Backdrop blur | Shadow |
|---|---|---|
| Card |26 px |recipe پوسته در۴.۱ |
| Purchase |18 px |recipe پنل در۴.۱ |
| Favorite |12 px |`0 4px 14px #2C222208` |
| Fresh |14 px |`0 4px 16px #27272B05` |
| Navbar desktop |32 px+saturate 165% |`0 8px 25px #29304010,inset 0 1px 0 #FFF` |
| Navbar mobile |32 px+saturate 165% |`0 6px 25px #2930401A,inset 0 1px 0 #FFF` |
| Toast |20 px |`0 10px 30px #2C222211` |
| Dialog |30 px |`0 30px 80px #29304025` |
| Dialog backdrop |7 px |ندارد |
| Product image |backdrop ندارد؛ drop-shadow |`drop-shadow(0 12px 8px #6B222423)` |

`filter:blur` روی orb یا سایهٔ زیر محصول با `backdrop-filter` متفاوت است؛ اولی خود عنصر را تار می‌کند و دومی محتوای پشت عنصر را. برای card، purchase، navbar و dialog نسخهٔ WebKit نیز موجود است. favorite، fresh، toast در CSS مرجع فقط property استاندارد دارند.

| Layer | مقدار |
|---|---|
|orb |z-index−2، در isolation stage |
|product |z 1 داخل card |
|discount / favorite / fresh |z 3 |
|purchase |z 4 |
|heart burst |z 8 داخل favorite، محدود به context آن |
|toast desktop |z 8 درصفحه |
|navbar |z 30 |
|toast mobile |z 40 |
|dialog modal |top layer بومی مرورگر |

اعداد z-index داخل کارت با z-index سراسری یکسان مقایسه نمی‌شوند؛ isolation و backdrop-filter stacking context ایجاد می‌کنند. سایه‌ها برای تفکیک ارتفاع استفاده می‌شوند و border سفید باید باقی بماند.

## ۷. Motion System و رفتار تعاملی

| تعامل | مقدار دقیق | محدودیت |
|---|---|---|
|Hover panel |translateY−1 px، transition transform/shadow.35 s ease |عکس محصول ثابت |
|Tilt pointer |`rx=(.5−relativeY)×.6deg`، `ry=(relativeX−.5)×.8deg` |فقط hover:hover و pointer:fine؛ دامنهٔ واقعی rx ±.3 deg و ry ±.4 deg |
|Pointer leave |rx=0، ry=0 |transform به وضعیت عادی برمی‌گردد |
|Buy hover |translateY−.5 px؛ .2 s |حرکت محدود |
|Buy press |scale.98 |فقط pressed |
|Add-to-cart pop |.4 s ease؛ در 50% scale 1.015 |روی پنل، نه تصویر |
|Favorite hover |scale 1.025؛ .25 s |آیکون یا دکمه، نه عکس |
|Liked-pop |.36 s ease-out؛ 0/100%=1، 40%=1.22، 70%=.96 |فقط SVG قلب |
|Heart scatter |.95 s cubic-bezier(.15,.6,.3,1) |فقط اضافه کردن like؛ حذف like بدون burst |
|Heart ring |.55 s ease-out؛ scale.65→1.8، opacity.8→0 |حلقه 34 px با border 1 px |
|Nav hover |رنگ و background.18 s |بدون transform |
|Toast |opacity/transform.25 s |نمایش 2200 ms |
|Orb drift |12 s/14 s ease-in-out infinite؛ translate 25 px,−25 px در 50% |orb دوم reverse؛ دکور فقط |

### ۷.۱. مشخصات دقیق افکت قلب

- ۷ ذرهٔ قلب با اندازه‌های `10,11,12,10,11,12,10px`.
- offset های نهایی به‌ترتیب: `(-31,-12)`, `(-20,-33)`, `(1,-42)`, `(26,-33)`, `(38,-9)`, `(25,17)`, `(-23,16)` بر حسب px.
- delay ها: `0,12,24,36,48,60,72ms`.
- angle نهایی: index زوج `18deg` و index فرد `-16deg`.
- ابتدا opacity 0/scale.2؛ در 15% opacity 1؛ در 65% opacity.85؛ پایان opacity 0/scale.85.
- نقطهٔ شروع مرکز دکمه: left 50%/top 50% با translate−50%.
- رنگ Primary؛ SVG fill=currentColor/stroke:none؛ drop-shadow `0 2px 2px #E5253620`.
- عناصر بعد از 1100 ms حذف می‌شوند؛ کلیک مجدد burst قبلی را حذف می‌کند.
- برای reduced-motion ذرات ساخته نمی‌شوند و animation خاموش است. وضعیت انتخاب با fill، رنگ و aria-pressed همچنان مشخص می‌ماند.

## ۸. آیکون‌ها، دارایی‌ها و دسترس‌پذیری

### ۸.۱. Icon system موجود

```css
svg {
  width:22px; height:22px; fill:none;
  stroke:currentColor; stroke-width:1.65;
  stroke-linecap:round; stroke-linejoin:round;
}
```

همهٔ آیکون‌ها inline SVG با `viewBox="0 0 24 24"` هستند؛ کتابخانهٔ آیکون خارجی در صفحه نیست. variant های اندازه:rating 13، stock 14 عرض/15 ارتفاع ارثی، fresh 15، buy 18، quantity 18، navhome 19 دسکتاپ/18 موبایل، navtools 21 دسکتاپ/20 موبایل، favorite 20، cartclose 18. قلب انتخاب‌شده و ستاره استثنای fill هستند. stock فقط width 14 را بازنویسی می‌کند و height 15 از قاعدهٔ قدیمی باقی می‌ماند؛ بنابراین ادعای stock 14×14 دقیق نیست.

### ۸.۲. دارایی‌ها

- Font:`assets/Vazirmatn.woff2` با مجوز همراه `assets/FONT-LICENSE.txt`.
- تصاویر PNG شفاف:`strawberries.png`،`bananas.png`،`milk.png`،`bread.png`،`apples.png`،`eggs.png`،`yogurt.png`،`oranges.png`.
- عکس محصول بدون background توپر، با contain و drop-shadow گرم نمایش داده شود. crop به حالت cover، انیمیشن شناور تصویر یا box سفید پشت عکس جزو این طرح نیست.
- ویژگی‌های HTML width/height تصویر 1024 صرفاً intrinsic hint هستند؛ اندازهٔ نمایش را CSS 100% داخل photo-area 164 px تعیین می‌کند، نه رزولوشن واقعی فایل.
- تصاویر ۴ محصول اول fetchpriority=high دارند؛ ۴ محصول بعد loading=lazy. این قرارداد موجود است، نه الزام دائمی برای هر تعداد محصول در آینده.

### ۸.۳. قواعد دسترس‌پذیری موجود و قرارداد آینده

- `lang=fa`،`dir=rtl`، label فارسی برای دکمه‌های آیکونی، aria-hidden روی SVG دکوراتیو.
- علاقه‌مندی:aria-pressed و label متناظر با افزودن/حذف.
- ناوبری فعال:aria-current=page؛ سبد aria-haspopup=dialog و label حاوی تعداد.
- dialog دارای aria-labelledby؛ عنوان محصول card نیز aria-labelledby دارد.
- keyboard outline برای button ها 3 px/offset 5؛ لینک brand/nav 3 px/offset 4.
- همهٔ buttonها از font-family:inherit، cursor:pointer، touch-action:manipulation و -webkit-tap-highlight-color:transparent استفاده می‌کنند.
- اندازهٔ favorite و cartclose 36×36 و quantity 42×36 در نسخهٔ فعلی است؛ نباید آن‌ها را به‌اشتباه 44×44 مستند کرد. **قرارداد تکمیلی:** کنترل‌های جدید حداقل 44×44 hit-area داشته باشند؛ افزایش hit-area با حفظ اندازهٔ بصری variant مجاز است.
- خوانایی شیشه با متن تیره و لایهٔ سفید حفظ می‌شود. در کد فعلی نسبت کنتراست آزموده نشده؛ این سند ادعای تأیید WCAG ندارد. برای پس‌زمینهٔ جدید، حالت واقعی زیر شیشه بررسی شود و در صورت نیاز opacity سطح افزایش یابد، نه تغییر بی‌قاعده رنگ متن.
- focus یا outline برای زیبایی حذف نشود؛ خطاها فقط با رنگ بیان نشوند؛ reduced-motion همیشه پشتیبانی شود.

## ۹. توکن‌های پیشنهادی برای مصرف در توسعه

این نام‌گذاری به‌جز ۵ متغیر اصلی، **قرارداد تکمیلی** است؛ مقادیر استخراج‌شده را به token قابل‌مصرف تبدیل می‌کند. نسخهٔ فعلی از این نام‌ها استفاده نمی‌کند.

```css
:root {
  --color-primary:#e52536;
  --color-primary-start:#ed3446;
  --color-primary-end:#df1c32;
  --color-text:#24272b;
  --color-muted:#74787e;
  --color-page:#f2f3f5;
  --color-focus:#9e0b24;
  --color-selected:#fff1f3;
  --color-hover-tint:#ffe7eb;
  --color-success:#56604f;
  --color-success-surface:#f2f6ed;
  --color-success-border:#c9d6bb;
  --color-error:#b41b30;
  --color-error-surface:#fff1f3;
  --color-error-border:#efbdc6;
  --color-warning:#6f4c14;
  --color-warning-surface:#fff5de;
  --color-warning-border:#edaa31;
  --color-info:#353a42;
  --color-info-surface:#ffffffe0;
  --color-info-border:#e6e7eb;
  --font-family:Vazir,Tahoma,Arial,sans-serif;
  --surface-card:linear-gradient(145deg,rgba(255,255,255,.8),rgba(255,255,255,.4));
  --surface-purchase:linear-gradient(145deg,#fffffff5,#ffffffc9);
  --surface-nav:linear-gradient(135deg,#ffffffc9,#ffffff96);
  --surface-nav-mobile:linear-gradient(135deg,#ffffffe0,#ffffffb3);
  --border-card:1.5px solid rgba(255,255,255,.87);
  --border-purchase:1px solid #ffffffed;
  --border-nav:1px solid #ffffffdf;
  --radius-card:28px;
  --radius-purchase:20px;
  --radius-control:14px;
  --radius-nav:23px;
  --radius-nav-mobile:21px;
  --blur-card:26px;
  --blur-purchase:18px;
  --blur-nav:32px;
  --shadow-card:0 25px 55px -25px #8a4b5440,0 8px 20px #21212b06,inset 0 1px 1px #fff;
  --shadow-purchase:0 12px 23px -7px #74324738,0 3px 7px #5b20390c,inset 0 1px 0 #fff;
  --shadow-purchase-hover:0 13px 24px -7px #7432473d,0 3px 7px #5b20390c,inset 0 1px 0 #fff;
  --shadow-nav:0 8px 25px #29304010,inset 0 1px 0 #fff;
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-5:20px; --space-6:24px; --space-7:28px; --space-8:32px;
  --space-9:40px; --space-10:48px; --space-11:56px;
  --container-max:1320px;
  --nav-container-max:1236px;
  --product-track-min:250px;
  --product-track-max:280px;
  --duration-nav:180ms;
  --duration-button:200ms;
  --duration-favorite:250ms;
  --duration-panel:350ms;
}
```

برای تدریج در refactor، مقادیر جدید با نام‌های اصلی `--red`, `--ink`, `--muted`, `--font` map شوند. استفاده از token فقط تغییر روش نگهداری است؛ نباید gradient، alpha یا spacing موجود را تغییر دهد. breakpoint های 360، 370، 600، 680، 900 قرارداد هستند؛ customproperty به‌صورت مستقیم در شرط media در CSS معمولی استفاده نشود.

## ۱۰. قواعد توسعه و پذیرش کامپوننت جدید

1. هر صفحه یا کامپوننت جدید باید از همین فونت، پالت، سطوح، radius ها، spacing و motion ها استفاده کند. رنگ یا سایهٔ جدید بدون ثبت variant در این سند اضافه نشود.
2. برای کارت محصول از recipe فعلی و ساختار واحد استفاده شود؛ قیمت و CTA داخل purchase-panel می‌مانند و عکس ثابت است.
3. در صفحه‌های جدید navbar سه‌جزیره‌ای RTL حفظ شود؛ در دسکتاپ بالا و در موبایل با عرض ≤680 پایین قرار می‌گیرد.
4. فرم‌ها، دکمه‌های Secondary و وضعیت‌های معنایی از تعریف تکمیلی همین سند استفاده کنند. رنگ یک عنصر محتوایی مثل ستاره، به‌تنهایی تعریف وضعیت هشدار نیست.
5. HTML معنایی از استایل جدا باشد؛ هر تیتر تگ مناسب دارد و کلاس typography اندازهٔ بصری را تعیین می‌کند.
6. طراحی در عرض‌های 320، 390، 680، 900 و دسکتاپ بزرگ بررسی شود؛ پنل خرید از کنار و پایین فاصله دارد، navbar محتوا را نمی‌پوشاند و overflow افقی ایجاد نمی‌شود.
7. حالت‌های rest، hover، pressed، focus و selected برای تعامل مربوط تعریف شوند؛ کامپوننت‌های جدید disabled و loading نیز داشته باشند. افزودن این حالت‌ها به کامپوننت موجود یک تغییر اجرایی جدا است.
8. توسعهٔ جدید ظاهر دوپارهٔ کارت، hover بزرگ یا انیمیشن عکس را بازنگرداند. ترجیح بصریِ ثبت‌شده، حرکت کم است.
9. فایل مرجع فعلی در زمان تدوین سند تغییر نکرده است. refactor و اصلاح موارد cascade شناسایی‌شده، کار اجرایی جدا است و در اثر این مستند اعمال نشده است.
10. این سند دارای نسخه است. تغییر پایهٔ بصری با درخواست بعدی کاربر در نسخهٔ جدید ثبت شود؛ تا آن زمان همین نسخه مرجع باقی می‌ماند.

**تأیید درک و تعهد:** متوجه شدم. از این به بعد تمام صفحات، کدهای HTML/CSS و کامپوننت‌های جدید این پروژه را صرفاً بر پایهٔ همین Design System می‌نویسم؛ برای اجزای موجود از قواعد استخراج‌شده و برای اجزای هنوز ساخته‌نشده از قراردادهای تکمیلیِ مشخص‌شده استفاده می‌کنم. اگر خود شما تغییری در این سیستم بخواهید، ابتدا همان تغییر در مرجع ثبت می‌شود.

## ۱۱. نسخه‌های تاریخی و خطاهای رایج در استخراج

| مقدار / selector قدیمی | وضعیت فعلی |
|---|---|
| Card radius:34 px | با 28 px بازنویسی شده |
| Photo height:267 px و media با 240 px | با 164 px بازنویسی شده |
| Image:112% و top−12 / left−6% | با 100% و top 0 / left 0 بازنویسی شده |
| Purchase margin:21 px −26 px −26 px | با 12 px −5 px 0 بازنویسی شده |
| Purchase radius:26/33 px | با 20 px بازنویسی شده |
| Buy/quantity height:54 px | با 44 px بازنویسی شده |
| Price:26 px و media با 24 px | با 22 px بازنویسی شده |
| Favorite:41 px | با 36 px بازنویسی شده |
| Favorite selected fill: `#E525361A` | با Primary کاملاً opaque بازنویسی شده |
| Small H1:21 px | با media متأخر ≤680 و مقدار 23 px بازنویسی شده |
| `.topbar`, `.brand`, `.preview-label` | در DOM فعلی وجود ندارند؛ brand-icon و wordmark جدید فعال‌اند |
| `.showcase`, `.eyebrow`, `.divider`, `.under-card`, `.foot .number` | در DOM فعلی وجود ندارند |
| Orb positions در media قدیمی ≤600 | با موقعیت‌های متأخر بخش catalog بازنویسی شده |

بنابراین توکن‌های قدیمی مانند `#7D8085`, `#26292E`, `#878B90`, `#D6D8DC`, `#DADBDF`, `#E1E2E5`, `#95999F`, `#C62A3D` در stylesheet حضور دارند، اما نقش مربوط به آن selector ها در صفحهٔ فعلی استفاده نمی‌شود. `#DADBDF` در قرارداد فرم جدید دوباره استفاده شده؛ این استفاده تکمیلی است.

## پیوست A. فهرست کامل literal های رنگ در CSS مرجع

جدول زیر همهٔ literal های رنگ CSS، از جمله تعریف‌های قدیمیِ بازنویسی‌شده یا selector های بدون DOM را پوشش می‌دهد. ستون محل، محل وجود در متن CSS است؛ فعال‌بودن را از بخش‌های ۲ تا ۱۱ بخوانید. HEX کامل، معادل normalized است؛ برای rgba اصل مقدار در ستون اول مرجع می‌ماند. white به سفید opaque و transparent به رنگ شفاف تبدیل شده‌اند. پنج رنگ تکمیلی در بخش ۲.۶ درج شده‌اند و در این فهرست سورس نیستند.

| مقدار در سورس | HEX کامل | Alpha | محل تعریف: selector / property |
|---|---|---|---|
| `#21212b06` | `#21212B06` | 2.35% | `.card: box-shadow` |
| `#24272b` | `#24272B` | 100.00% | `:root: --ink`؛ `.nav-island: color` |
| `#26292e` | `#26292E` | 100.00% | `.preview-label span: color` |
| `#27272b05` | `#27272B05` | 1.96% | `.fresh: box-shadow` |
| `#29304010` | `#29304010` | 6.27% | `.nav-island: box-shadow` |
| `#2930401a` | `#2930401A` | 10.20% | `.nav-island: box-shadow` |
| `#29304025` | `#29304025` | 14.51% | `.cart-dialog: box-shadow` |
| `#2c222208` | `#2C222208` | 3.14% | `.favorite: box-shadow` |
| `#2c222211` | `#2C222211` | 6.67% | `.toast: box-shadow` |
| `#343a4538` | `#343A4538` | 21.96% | `.cart-dialog::backdrop: background` |
| `#353a42` | `#353A42` | 100.00% | `.nav-button: color` |
| `#444b5817` | `#444B5817` | 9.02% | `.nav-separator: background` |
| `#4a4d52` | `#4A4D52` | 100.00% | `.toast: color` |
| `#54575c` | `#54575C` | 100.00% | `.rating b: color` |
| `#56604f` | `#56604F` | 100.00% | `.fresh: color` |
| `#58253235` | `#58253235` | 20.78% | `.purchase-panel: box-shadow`؛ `.purchase-panel:hover: box-shadow` |
| `#5a6068` | `#5A6068` | 100.00% | `.nav-choice: color`؛ `.cart-close: color` |
| `#5b20390c` | `#5B20390C` | 4.71% | `.purchase-panel: box-shadow`؛ `.purchase-panel:hover: box-shadow` |
| `#616770` | `#616770` | 100.00% | `.brand-prefix: color` |
| `#6b222423` | `#6B222423` | 13.73% | `.product: filter` |
| `#6b34474d` | `#6B34474D` | 30.20% | `.purchase-panel: box-shadow` |
| `#6b344755` | `#6B344755` | 33.33% | `.purchase-panel:hover: box-shadow` |
| `#6d283008` | `#6D283008` | 3.14% | `.nav-choice.is-active: box-shadow` |
| `#6f8259` | `#6F8259` | 100.00% | `.fresh svg: color` |
| `#70333d40` | `#70333D40` | 25.10% | `.purchase-panel: box-shadow`؛ `.purchase-panel:hover: box-shadow` |
| `#72767c` | `#72767C` | 100.00% | `.favorite: color` |
| `#74324738` | `#74324738` | 21.96% | `.purchase-panel: box-shadow` |
| `#7432473d` | `#7432473D` | 23.92% | `.purchase-panel:hover: box-shadow` |
| `#74787e` | `#74787E` | 100.00% | `:root: --muted` |
| `#747b86` | `#747B86` | 100.00% | `.cart-empty: color`؛ `.cart-line p: color` |
| `#777c82` | `#777C82` | 100.00% | `.currency: color` |
| `#7d8085` | `#7D8085` | 100.00% | `.preview-label: color` |
| `#80858b` | `#80858B` | 100.00% | `.product-count: color` |
| `#85898f` | `#85898F` | 100.00% | `.stock: color` |
| `#878b90` | `#878B90` | 100.00% | `.eyebrow: color` |
| `#89232919` | `#89232919` | 9.80% | `.photo-area:after: background` |
| `#8a4b5440` | `#8A4B5440` | 25.10% | `.card: box-shadow` |
| `#8a8e93` | `#8A8E93` | 100.00% | `.cart-note: color` |
| `#92959a` | `#92959A` | 100.00% | `.rating .reviews: color` |
| `#93979c` | `#93979C` | 100.00% | `.foot: color` |
| `#95999f` | `#95999F` | 100.00% | `.under-card: color` |
| `#9a9da2` | `#9A9DA2` | 100.00% | `.old-price: color` |
| `#9e0b24` | `#9E0B24` | 100.00% | `button:focus-visible: outline`؛ `.nav-choice:focus-visible,.nav-brand:focus-visible: outline` |
| `#b41b30` | `#B41B30` | 100.00% | `.cart-note.active: color` |
| `#b8293e` | `#B8293E` | 100.00% | `.section-kicker: color` |
| `#c32136` | `#C32136` | 100.00% | `.quantity span: color` |
| `#c62a3d` | `#C62A3D` | 100.00% | `.foot .number: color` |
| `#c82035` | `#C82035` | 100.00% | `.nav-choice:hover: color` |
| `#d62338` | `#D62338` | 100.00% | `.orb-one: background` |
| `#d6d8dc` | `#D6D8DC` | 100.00% | `.eyebrow:before,.eyebrow:after: background` |
| `#d92238` | `#D92238` | 100.00% | `.nav-choice.is-active: color`؛ `.nav-button:hover: color` |
| `#dadbdf` | `#DADBDF` | 100.00% | `.divider: background` |
| `#df1730` | `#DF1730` | 100.00% | `.discount: background` |
| `#df1c32` | `#DF1C32` | 100.00% | `.buy: background` |
| `#e1e2e5` | `#E1E2E5` | 100.00% | `.preview-label: border` |
| `#e52536` | `#E52536` | 100.00% | `:root: --red`؛ `.cart-badge: background`؛ `.cart-return: background` |
| `#e5253610` | `#E5253610` | 6.27% | `.quantity: box-shadow` |
| `#e5253618` | `#E5253618` | 9.41% | `.discount: box-shadow` |
| `#e525361a` | `#E525361A` | 10.20% | `.favorite[aria-pressed=true] svg: fill` |
| `#e5253620` | `#E5253620` | 12.55% | `.brand-icon: box-shadow`؛ `.heart-particle svg: filter` |
| `#e5253628` | `#E5253628` | 15.69% | `.buy: box-shadow` |
| `#e5253630` | `#E5253630` | 18.82% | `.buy:hover: box-shadow` |
| `#e6e7eb` | `#E6E7EB` | 100.00% | `.cart-line: border-bottom` |
| `#e92c45` | `#E92C45` | 100.00% | `.orb-two: background` |
| `#ed3446` | `#ED3446` | 100.00% | `.buy: background` |
| `#ed34465c` | `#ED34465C` | 36.08% | `.heart-burst:before: border` |
| `#edaa31` | `#EDAA31` | 100.00% | `.rating svg: fill`؛ `.rating svg: stroke` |
| `#ef5362` | `#EF5362` | 100.00% | `.orb-one: background` |
| `#f04858` | `#F04858` | 100.00% | `.discount: background` |
| `#f1f2f5` | `#F1F2F5` | 100.00% | `.cart-close: background` |
| `#f2f3f5` | `#F2F3F5` | 100.00% | `body: background` |
| `#f8f9fbf5` | `#F8F9FBF5` | 96.08% | `.nav-island: background` |
| `#ff617075` | `#FF617075` | 45.88% | `.buy: border` |
| `#ff8d9760` | `#FF8D9760` | 37.65% | `.discount: border` |
| `#ff939b` | `#FF939B` | 100.00% | `.orb-one: background` |
| `#ffb8bc` | `#FFB8BC` | 100.00% | `.orb-two: background` |
| `#ffe7eb` | `#FFE7EB` | 100.00% | `.quantity button:hover: background` |
| `#fff` | `#FFFFFF` | 100.00% | `.card: box-shadow`؛ `.discount: color`؛ `.favorite: border`؛ `.fresh: border`؛ `.purchase-panel: box-shadow`؛ `.purchase-panel:hover: box-shadow`؛ `.quantity: border`؛ `.toast: border`؛ `.nav-island: box-shadow`؛ `.cart-dialog: border`؛ `.cart-return: color` |
| `#fff1f3` | `#FFF1F3` | 100.00% | `.favorite[aria-pressed=true]: background` |
| `#fff7f4b0` | `#FFF7F4B0` | 69.02% | `.photo-area: background` |
| `#fff8` | `#FFFFFF88` | 53.33% | `.quantity: background` |
| `#ffffff35` | `#FFFFFF35` | 20.78% | `.buy: box-shadow` |
| `#ffffff60` | `#FFFFFF60` | 37.65% | `.preview-label: background` |
| `#ffffff80` | `#FFFFFF80` | 50.20% | `.favorite: background` |
| `#ffffff90` | `#FFFFFF90` | 56.47% | `.nav-choice:hover: background` |
| `#ffffff96` | `#FFFFFF96` | 58.82% | `.nav-island: background` |
| `#ffffffa8` | `#FFFFFFA8` | 65.88% | `.nav-button:hover: background` |
| `#ffffffb0` | `#FFFFFFB0` | 69.02% | `.fresh: background` |
| `#ffffffb3` | `#FFFFFFB3` | 70.20% | `.nav-island: background` |
| `#ffffffb5` | `#FFFFFFB5` | 70.98% | `.nav-choice.is-active: background` |
| `#ffffffc9` | `#FFFFFFC9` | 78.82% | `.purchase-panel: background`؛ `.nav-island: background` |
| `#ffffffdf` | `#FFFFFFDF` | 87.45% | `.nav-island: border` |
| `#ffffffe0` | `#FFFFFFE0` | 87.84% | `.toast: background`؛ `.cart-badge: box-shadow`؛ `.nav-island: background` |
| `#ffffffed` | `#FFFFFFED` | 92.94% | `.purchase-panel: border` |
| `#fffffff0` | `#FFFFFFF0` | 94.12% | `.cart-dialog: background` |
| `#fffffff5` | `#FFFFFFF5` | 96.08% | `.purchase-panel: background` |
| `rgba(255,255,255,.4)` | `#FFFFFF66` | 40.00% | `.card: background` |
| `rgba(255,255,255,.65)` | `#FFFFFFA6` | 65.00% | `.stage: background` |
| `rgba(255,255,255,.8)` | `#FFFFFFCC` | 80.00% | `.card: background` |
| `rgba(255,255,255,.83)` | `#FFFFFFD4` | 83.00% | `.purchase-panel: background` |
| `rgba(255,255,255,.87)` | `#FFFFFFDE` | 87.00% | `:root: --edge` |
| `rgba(255,255,255,.97)` | `#FFFFFFF7` | 97.00% | `.purchase-panel: background` |
| `transparent` | `#00000000` | 0.00% | `button: -webkit-tap-highlight-color`؛ `.stage: background`؛ `.photo-area: background`؛ `.divider: background`؛ `.quantity button: background`؛ `.nav-button: background` |
| `white` | `#FFFFFF` | 100.00% | `.brand-icon: color`؛ `.buy: color`؛ `.cart-badge: color` |

## پیوست B. Snapshot دقیق CSS مرجع

**SHA-256 فایل HTML در زمان استخراج:** `405d7fdc3142f3082a5194d5452d94351a0400208795999614cfbf89a3171804`

این snapshot برای بررسی cascade و بازتولید دقیق نگهداری شده است. شامل قواعد تاریخی نیز هست؛ در مصرف روزانه از recipe نهایی بخش‌های قبل استفاده کنید. هیچ CSS تکمیلی در این snapshot درج نشده است.

```css
@font-face{font-family:Vazir;src:url('assets/Vazirmatn.woff2') format('woff2');font-weight:100 900;font-display:swap}
  :root{--red:#e52536;--ink:#24272b;--muted:#74787e;--edge:rgba(255,255,255,.87);--font:Vazir,Tahoma,Arial,sans-serif}
  *{box-sizing:border-box}body{margin:0;background:#f2f3f5;color:var(--ink);font-family:var(--font);min-height:100svh;-webkit-font-smoothing:antialiased}button{font-family:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}button:focus-visible{outline:3px solid #9e0b24;outline-offset:5px}svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.65;stroke-linecap:round;stroke-linejoin:round}button{touch-action:manipulation}
  .stage{position:relative;min-height:100svh;overflow:hidden;isolation:isolate;background:radial-gradient(ellipse at 49% 48%,rgba(255,255,255,.65),transparent 65%)}
  .orb{position:absolute;z-index:-2;pointer-events:none;border-radius:50%;filter:blur(2px)}.orb-one{height:370px;width:370px;top:23%;left:calc(50% - 320px);background:radial-gradient(circle at 32% 27%,#ff939b,#ef5362 60%,#d62338);opacity:.24;animation:drift 12s ease-in-out infinite}.orb-two{height:230px;width:230px;top:55%;right:calc(50% - 300px);background:radial-gradient(circle at 30% 22%,#ffb8bc,#e92c45);opacity:.14;animation:drift 14s ease-in-out infinite reverse}
  .topbar{max-width:1320px;margin:auto;padding:28px 42px;display:flex;align-items:center;justify-content:space-between;gap:20px}.brand{display:flex;align-items:center;gap:10px;font-weight:850;font-size:21px;letter-spacing:-.7px}.brand-icon{display:grid;place-items:center;width:37px;height:37px;border-radius:12px;color:white;background:var(--red);box-shadow:0 5px 12px #e5253620}.brand-icon svg{width:23px}.preview-label{font-size:13px;color:#7d8085;border:1px solid #e1e2e5;border-radius:99px;padding:7px 14px;background:#ffffff60}.preview-label span{color:#26292e;margin-inline-end:8px;font-weight:600}
  main{display:grid;place-items:center;padding:10px 22px 40px;min-height:calc(100svh - 150px)}.showcase{width:360px;max-width:100%;perspective:1400px;position:relative}.eyebrow{margin:0 0 24px;text-align:center;display:flex;justify-content:center;align-items:center;gap:12px;color:#878b90;font-size:12px;letter-spacing:2.7px;direction:ltr}.eyebrow:before,.eyebrow:after{content:'';width:26px;height:1px;background:#d6d8dc}
  .card{position:relative;isolation:isolate;border-radius:34px;border:1.5px solid var(--edge);background:linear-gradient(145deg,rgba(255,255,255,.8),rgba(255,255,255,.4));box-shadow:0 25px 55px -25px #8a4b5440,0 8px 20px #21212b06,inset 0 1px 1px #fff;backdrop-filter:blur(26px);-webkit-backdrop-filter:blur(26px)}.visual-shell{position:relative;padding:19px 19px 22px}.photo-area{height:267px;position:relative;border-radius:24px;background:radial-gradient(ellipse at 48% 50%,#fff7f4b0,transparent 75%);display:grid;place-items:center}.product{width:112%;height:112%;object-fit:contain;max-width:none;filter:drop-shadow(0 24px 12px #6b222423);pointer-events:none;position:absolute;top:-12px;left:-6%;z-index:1;animation:none;transform:none}.photo-area:after{content:'';position:absolute;bottom:24px;width:65%;height:22px;background:#89232919;filter:blur(15px);border-radius:50%;}
  .discount{position:absolute;z-index:3;top:0;right:0;display:flex;align-items:center;justify-content:center;gap:5px;padding:7px 12px;border-radius:14px;color:#fff;background:linear-gradient(135deg,#f04858,#df1730);font-size:14px;font-weight:750;box-shadow:0 5px 10px #e5253618;border:1px solid #ff8d9760}.favorite{position:absolute;z-index:3;top:0;left:0;width:41px;height:41px;border-radius:50%;display:grid;place-items:center;border:1px solid #fff;background:#ffffff80;color:#72767c;box-shadow:0 4px 14px #2c222208;backdrop-filter:blur(12px);transition:color .25s,background .25s,transform .25s}.favorite:hover{transform:scale(1.025);color:var(--red)}.favorite[aria-pressed=true]{color:var(--red);background:#fff1f3}.favorite[aria-pressed=true] svg{fill:#e525361a}
  .fresh{position:absolute;z-index:3;bottom:8px;right:0;display:flex;align-items:center;gap:5px;background:#ffffffb0;border:1px solid #fff;box-shadow:0 4px 16px #27272b05;backdrop-filter:blur(14px);padding:6px 10px;border-radius:99px;font-size:12px;color:#56604f}.fresh svg{width:15px;height:15px;color:#6f8259}
  .info{position:relative;padding:12px 24px 21px;margin:-6px 0 -1px}
  .purchase-panel{position:relative;z-index:4;margin:21px -26px -26px;padding:19px 25px 18px;border-radius:26px 26px 33px 33px;border:1px solid #ffffffed;background:linear-gradient(155deg,rgba(255,255,255,.97),rgba(255,255,255,.83));box-shadow:0 -13px 26px -18px #70333d40,0 20px 26px -14px #6b34474d,0 6px 10px -7px #58253235,inset 0 1px 0 #fff;transform:translateY(var(--lift,0px)) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transform-origin:50% 0;transition:transform .35s ease,box-shadow .35s ease}
  .purchase-panel:hover{--lift:-1px;box-shadow:0 -13px 27px -17px #70333d40,0 24px 28px -14px #6b344755,0 7px 12px -7px #58253235,inset 0 1px 0 #fff}
  .meta{display:flex;align-items:center;justify-content:space-between;gap:8px;color:var(--muted);font-size:12px;margin-bottom:7px}.rating{display:flex;align-items:center;gap:5px;direction:ltr}.rating svg{width:13px;height:13px;fill:#edaa31;stroke:#edaa31}.rating b{color:#54575c;font-size:13px;font-weight:600}.rating .reviews{color:#92959a}h2{font-size:23px;line-height:1.5;margin:0;font-weight:800;letter-spacing:-.7px}.description{font-size:14px;margin:3px 0 0;color:var(--muted)}.divider{height:1px;background:linear-gradient(90deg,transparent,#dadbdf,transparent);margin:19px 0 17px}.price-row{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:17px}.stock{font-size:12px;color:#85898f;display:flex;align-items:center;gap:5px}.stock svg{width:15px;height:15px}.prices{display:flex;align-items:flex-end;flex-direction:column;gap:1px}.old-price{font-size:13px;color:#9a9da2;text-decoration:line-through}.price{display:flex;align-items:baseline;gap:5px;line-height:1.4}.price strong{font-size:26px;font-weight:850;letter-spacing:-.7px}.currency{font-size:12px;color:#777c82}.buy{height:54px;width:100%;display:flex;align-items:center;justify-content:center;gap:10px;color:white;background:linear-gradient(145deg,#ed3446,#df1c32);border:1px solid #ff617075;border-radius:18px;font-size:15px;font-weight:650;box-shadow:0 8px 17px #e5253628,inset 0 1px 0 #ffffff35;transition:transform .2s,box-shadow .2s}.buy:hover{transform:translateY(-.5px);box-shadow:0 9px 19px #e5253630}.buy:active{transform:scale(.98)}.buy svg{width:20px;height:20px}.quantity{height:54px;display:none;align-items:center;justify-content:space-between;background:#fff8;border:1px solid #fff;border-radius:18px;box-shadow:0 5px 12px #e5253610}.quantity button{height:44px;width:48px;border:0;border-radius:14px;background:transparent;color:var(--red);font-size:24px;margin:4px;display:grid;place-items:center}.quantity button:hover{background:#ffe7eb}.quantity span{color:#c32136;font-size:15px;font-weight:700}.quantity svg{width:18px;height:18px}.quantity.is-visible{display:flex}.buy.is-hidden{display:none}.cart-note{text-align:center;height:19px;font-size:12px;color:#8a8e93;margin:11px 0 0}.cart-note.active{color:#b41b30}.purchase-panel.pop{animation:pop .4s ease}
  .under-card{text-align:center;display:flex;align-items:center;justify-content:center;gap:7px;margin:22px 0 0;color:#95999f;font-size:12px}.under-card svg{width:14px;height:14px}.foot{max-width:1320px;margin:auto;padding:0 42px 22px;display:flex;justify-content:space-between;color:#93979c;font-size:12px}.foot .number{direction:ltr;letter-spacing:2px;color:#c62a3d}.foot .version{direction:ltr;letter-spacing:1px}.toast{position:fixed;bottom:25px;left:50%;transform:translate(-50%,20px);padding:11px 20px;color:#4a4d52;font-size:14px;border-radius:16px;background:#ffffffe0;border:1px solid #fff;backdrop-filter:blur(20px);box-shadow:0 10px 30px #2c222211;opacity:0;transition:opacity .25s,transform .25s;pointer-events:none;z-index:8;white-space:nowrap}.toast.show{opacity:1;transform:translate(-50%,0)}
  @keyframes drift{0%,100%{transform:translate(0,0)}50%{transform:translate(25px,-25px)}}@keyframes pop{50%{scale:1.015}}
  @media(max-width:600px){.topbar{padding:22px}.brand{font-size:19px}.preview-label{padding:6px 11px;font-size:12px}.preview-label span{display:none}main{padding-top:6px;min-height:calc(100svh - 143px)}.foot{padding:0 22px 18px}.showcase{width:350px}.orb-one{left:-100px;top:20%}.orb-two{right:-90px;top:57%}.eyebrow{margin-bottom:20px}.under-card{margin-top:19px}}
  @media(max-width:370px){.photo-area{height:240px}.visual-shell{padding:16px 16px 20px}.info{padding:12px 21px 20px}.purchase-panel{margin:19px -23px -25px;padding:18px 22px 17px}h2{font-size:21px}.topbar{padding:18px}.brand{font-size:17px}.price strong{font-size:24px}}
  @media(prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important}.purchase-panel{transform:none!important}}

  .catalog{display:block;place-items:normal;max-width:1320px;margin:0 auto;padding:24px 42px 56px;min-height:calc(100svh - 150px)}
  .catalog-heading{display:flex;justify-content:space-between;align-items:end;gap:16px;margin-bottom:28px}
  .section-kicker{font-size:13px;color:#b8293e;margin:0 0 6px}.catalog-heading h1{font-size:28px;line-height:1.6;font-weight:800;letter-spacing:-.8px;margin:0}.product-count{font-size:13px;color:#80858b;padding-bottom:6px}
  .product-grid{display:grid;width:100%;grid-template-columns:repeat(auto-fit,minmax(250px,280px));justify-content:center;align-items:start;gap:24px;padding-bottom:12px}
  .card{min-width:0;border-radius:28px;perspective:1400px}.visual-shell{padding:14px 14px 8px}.photo-area{height:164px;border-radius:19px}.product{width:100%;height:100%;top:0;left:0;filter:drop-shadow(0 12px 8px #6b222423)}.photo-area:after{bottom:14px;height:12px}
  .discount{padding:6px 10px;border-radius:12px;font-size:13px}.favorite{width:36px;height:36px}.favorite svg{width:20px;height:20px}.fresh{bottom:0;padding:5px 8px}
  .info{padding:8px 14px 10px;margin:0}.meta{margin-bottom:5px}h2{font-size:20px}.description{font-size:14px;min-height:24px;line-height:1.7}
  .purchase-panel{margin:12px -5px 0;padding:14px 12px 12px;border-radius:20px;background:linear-gradient(145deg,#fffffff5,#ffffffc9);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:0 12px 23px -7px #74324738,0 3px 7px #5b20390c,inset 0 1px 0 #fff}
  .purchase-panel:hover{--lift:-1px;box-shadow:0 13px 24px -7px #7432473d,0 3px 7px #5b20390c,inset 0 1px 0 #fff}.price-row{gap:6px;margin-bottom:13px;flex-wrap:wrap}.price strong{font-size:22px}.stock{font-size:12px}.stock svg{width:14px}.old-price{font-size:12px}.currency{font-size:12px}.buy,.quantity{height:44px;border-radius:14px}.buy{font-size:14px;gap:7px}.buy svg{width:18px;height:18px}.quantity button{height:36px;width:42px;margin:3px}.quantity span{font-size:14px}.cart-note{font-size:12px;margin-top:9px;min-height:19px;height:auto}.no-discount{text-decoration:none}
  .orb-one{width:500px;height:500px;top:160px;left:-190px}.orb-two{width:450px;height:450px;top:590px;right:-180px}
  @media(max-width:900px){.catalog{padding:20px 28px 44px}.topbar{padding:25px 28px}.product-grid{gap:22px}}
  @media(max-width:600px){.catalog{padding:14px 22px 36px}.topbar{padding:22px}.catalog-heading{margin-bottom:24px}.catalog-heading h1{font-size:23px}.product-count{font-size:12px}.product-grid{grid-template-columns:minmax(0,280px);gap:24px}.foot{gap:12px;font-size:11px}.section-kicker{font-size:12px}.preview-label span{display:none}}
  @media(max-width:370px){.catalog-heading h1{font-size:21px}.product-count{font-size:11px}}

  .favorite[aria-pressed=true]>svg{fill:var(--red);stroke:var(--red)}
  .favorite.liked-pop>svg{animation:liked-pop .36s ease-out}
  .heart-burst{position:absolute;left:50%;top:50%;width:0;height:0;pointer-events:none;z-index:8;color:var(--red)}
  .heart-particle{position:absolute;left:0;top:0;width:var(--size);height:var(--size);opacity:0;animation:heart-scatter .95s cubic-bezier(.15,.6,.3,1) var(--delay) both}
  .heart-particle svg{display:block;width:100%;height:100%;fill:currentColor;stroke:none;filter:drop-shadow(0 2px 2px #e5253620)}
  .heart-burst:before{content:'';position:absolute;left:-17px;top:-17px;width:34px;height:34px;border:1px solid #ed34465c;border-radius:50%;animation:heart-ring .55s ease-out both}
  @keyframes heart-scatter{0%{opacity:0;transform:translate(-50%,-50%) scale(.2) rotate(0deg)}15%{opacity:1}65%{opacity:.85}100%{opacity:0;transform:translate(calc(-50% + var(--x)),calc(-50% + var(--y))) scale(.85) rotate(var(--angle))}}
  @keyframes heart-ring{from{opacity:.8;transform:scale(.65)}to{opacity:0;transform:scale(1.8)}}
  @keyframes liked-pop{0%,100%{transform:scale(1)}40%{transform:scale(1.22)}70%{transform:scale(.96)}}
  @media(prefers-reduced-motion:reduce){.heart-burst{display:none}.favorite.liked-pop>svg{animation:none}}

  .stage{padding-top:96px}.site-nav{position:fixed;inset:18px 0 auto;z-index:30;padding:0 26px;pointer-events:none}.nav-islands{max-width:1236px;margin:0 auto;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:18px;direction:rtl}
  .nav-island{pointer-events:auto;min-height:64px;border:1px solid #ffffffdf;border-radius:23px;background:linear-gradient(135deg,#ffffffc9,#ffffff96);backdrop-filter:blur(32px) saturate(165%);-webkit-backdrop-filter:blur(32px) saturate(165%);box-shadow:0 8px 25px #29304010,inset 0 1px 0 #fff;color:#24272b}
  .nav-brand{justify-self:start;display:flex;align-items:center;gap:11px;padding:8px 17px;text-decoration:none;white-space:nowrap}.brand-wordmark{display:flex;flex-direction:column;line-height:1.4}.brand-prefix{font-size:12px;font-weight:500;color:#616770}.brand-wordmark strong{font-size:21px;font-weight:850;letter-spacing:-.7px}.nav-brand .brand-icon{width:36px;height:36px;border-radius:12px}
  .nav-links{display:flex;align-items:center;justify-content:center;gap:4px;padding:7px}.nav-choice{display:flex;align-items:center;justify-content:center;height:46px;padding:0 17px;font-size:14px;font-weight:600;color:#5a6068;text-decoration:none;border-radius:16px;white-space:nowrap;transition:color .18s,background .18s}.nav-choice.is-active{color:#d92238;background:#ffffffb5;box-shadow:0 3px 10px #6d283008}.nav-choice:hover{color:#c82035;background:#ffffff90}.nav-home{padding:0;width:40px}.nav-home svg{width:19px;height:19px}
  .nav-tools{justify-self:end;display:flex;align-items:center;gap:6px;padding:7px 9px}.nav-button{position:relative;display:flex;align-items:center;justify-content:center;gap:7px;min-width:44px;height:46px;padding:0 10px;background:transparent;border:0;border-radius:16px;color:#353a42;font-size:14px;font-weight:600;transition:background .18s,color .18s}.nav-button:hover{color:#d92238;background:#ffffffa8}.nav-button svg{width:21px;height:21px}.nav-cart{padding:0}.nav-separator{height:24px;width:1px;background:#444b5817}.cart-badge{position:absolute;top:2px;right:0;min-width:18px;height:18px;display:grid;place-items:center;padding:0 4px;border-radius:10px;background:#e52536;color:white;font-size:11px;line-height:1;box-shadow:0 0 0 2px #ffffffe0}.cart-badge[hidden]{display:none}.nav-choice:focus-visible,.nav-brand:focus-visible{outline:3px solid #9e0b24;outline-offset:4px}.product-grid{scroll-margin-top:108px}.card[hidden]{display:none}
  .cart-dialog{width:min(440px,calc(100% - 32px));max-height:80svh;padding:24px;border:1px solid #fff;border-radius:28px;background:#fffffff0;color:var(--ink);font-family:var(--font);box-shadow:0 30px 80px #29304025;backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px)}.cart-dialog::backdrop{background:#343a4538;backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px)}.cart-heading{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:20px}.cart-heading h2{font-size:22px}.cart-close{display:grid;place-items:center;width:36px;height:36px;background:#f1f2f5;border:0;border-radius:50%;color:#5a6068}.cart-close svg{width:18px;height:18px}.cart-content{display:grid;gap:12px}.cart-empty{font-size:16px;text-align:center;color:#747b86;padding:24px 0 34px;margin:0}.cart-line{display:flex;align-items:center;gap:12px;padding:9px 0;border-bottom:1px solid #e6e7eb}.cart-line img{width:62px;height:62px;object-fit:contain}.cart-line-copy{flex:1}.cart-line h3{font-size:15px;margin:0 0 4px}.cart-line p{font-size:13px;color:#747b86;margin:0}.cart-line strong{font-size:14px;white-space:nowrap}.cart-summary{display:flex;justify-content:space-between;gap:12px;margin:20px 0;font-size:15px}.cart-summary[hidden]{display:none}.cart-return{width:100%;min-height:44px;border:0;border-radius:14px;background:#e52536;color:#fff;font-size:14px;font-weight:600}.foot .version{letter-spacing:0;direction:rtl}
  @supports not (backdrop-filter:blur(1px)){.nav-island{background:#f8f9fbf5}}
  @media(max-width:680px){.stage{padding-top:22px;padding-bottom:100px}.site-nav{inset:auto 0 max(12px,env(safe-area-inset-bottom));padding:0 12px}.nav-islands{grid-template-columns:86px minmax(0,1fr)86px;gap:6px;max-width:560px}.nav-island{min-height:64px;border-radius:21px;background:linear-gradient(135deg,#ffffffe0,#ffffffb3);box-shadow:0 6px 25px #2930401a,inset 0 1px 0 #fff}.nav-brand{width:100%;justify-content:center;padding:7px 4px;gap:0}.nav-brand .brand-icon{display:none}.brand-prefix{font-size:12px}.brand-wordmark strong{font-size:16px;letter-spacing:-.6px}.nav-links{width:100%;gap:2px;padding:6px 4px}.nav-choice{height:48px;padding:0 8px;font-size:12px;border-radius:15px}.nav-home{width:30px;flex:none;padding:0}.nav-home svg{width:18px;height:18px}.nav-tools{width:100%;gap:2px;padding:7px 3px;justify-content:center}.nav-button{min-width:36px;height:46px;padding:0}.nav-login span{display:none}.nav-separator{height:22px}.nav-button svg{width:20px;height:20px}.cart-badge{top:1px;right:-1px;font-size:10px;min-width:16px;height:16px}.toast{bottom:100px;max-width:calc(100% - 32px);white-space:normal;text-align:center;z-index:40}.product-grid{scroll-margin-top:20px}.cart-dialog{padding:21px;border-radius:24px}.catalog{padding-top:14px}.catalog-heading{gap:10px}.catalog-heading h1{font-size:23px}}
  @media(max-width:360px){.nav-islands{grid-template-columns:78px minmax(0,1fr)82px;gap:5px}.nav-home{display:none}.brand-wordmark strong{font-size:15px}.nav-choice{padding:0 7px}}
```

## پیوست C. منابع محلی طرح

- [HTML مرجع](red-glass-card/dist/index.html)
- [نمای دسکتاپ](navbar-desktop.jpg)
- [نمای موبایل](navbar-mobile.jpg)

سند اصلی برای استفاده از جدول‌ها و قواعد نیاز به تصویر ندارد. لینک‌های بالا نسبت به محل این فایل در پوشهٔ outputs هستند.
