# 2S Command Center — صفحة GitHub Pages

الملفات دي بتترفع في ريبو على GitHub وبتشغّل النظام جوه إطار (iframe) برابط بتاعك،
مع اللوجو كـ favicon، وإمكانية تثبيت التطبيق على الشاشة الرئيسية للموبايل.

## ١) الرفع

ارفع محتوى الفولدر ده في جذر الريبو:

```
index.html
manifest.json
logo.png
favicon.ico  favicon-16.png  favicon-32.png  favicon-192.png  favicon-512.png
apple-touch-icon.png
```

بعدين: **Settings → Pages → Source: Deploy from a branch → main / (root)**

الرابط هيبقى: `https://USER.github.io/REPO/`

لو رفعتهم جوه فولدر (مثلاً `portal/`) الرابط هيبقى `https://USER.github.io/REPO/portal/`
والمسارات النسبية كلها هتشتغل عادي.

## ٢) تعديلات لازمة في Apps Script (٣ تعديلات صغيرة)

### تعديل ١ — من غيره الإطار هيفضل أبيض (إجباري)

جوجل بيمنع عرض تطبيق الويب جوه iframe إلا لو سمحت بكده صراحة.
في **Code.gs** جوه `doGet`، غيّر السطور دي:

```js
  return HtmlService.createHtmlOutput(html)
    .setTitle('2S Command Center')
    .addMetaTag('viewport','width=device-width, initial-scale=1, maximum-scale=1');
```

إلى:

```js
  return HtmlService.createHtmlOutput(html)
    .setTitle('2S Command Center')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport','width=device-width, initial-scale=1, maximum-scale=1');
```

بعد التعديل: **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**
(الرابط مابيتغيّرش طول ما إنت بتحدّث نفس الـ deployment).

### تعديل ٢ — اللوجو يتجاب من GitHub

في **Index.html** استبدل دالة `logoSVG` كلها (من `function logoSVG` لحد آخر سطر فيها):

```js
/* اللوجو بيتجاب من GitHub. خليه رابط كامل — الصفحة شغالة جوه نطاق جوجل
   فالمسار النسبي مش هيلاقي الملف. */
var LOGO_URL='https://USER.github.io/REPO/logo.png';
function logoSVG(sz,light){
 var h=sz||46, box=Math.round(h*1.34), pad=Math.round(box*0.08);
 /* الصورة خلفيتها بيضا، فعلى الخلفية الكحلي بنحطها جوه مربع أبيض */
 return '<span class="lgo" style="display:inline-flex;align-items:center;justify-content:center;'+
  'width:'+box+'px;height:'+box+'px;border-radius:'+Math.round(box*0.22)+'px;'+
  'box-sizing:border-box;vertical-align:middle;'+
  (light?('background:#fff;padding:'+pad+'px;'):'')+'">'+
  '<img src="'+LOGO_URL+'" alt="2S Home Wear" loading="eager" '+
  'style="width:100%;height:100%;object-fit:contain;display:block;-webkit-user-drag:none">'+
  '</span>';
}
```

غيّر `USER/REPO` لرابطك. الدالة بتترد بنفس الشكل القديم بالظبط، فكل الأماكن
اللي بتناديها (شاشة الدخول · الهيدر · القايمة الجانبية · شاشة الحضور ·
شاشة تغيير الباسورد) هتشتغل من غير أي تعديل تاني.

### تعديل ٣ — كود QR يفتح رابط GitHub مش رابط أبس سكريبت

من غير التعديل ده الكود المطبوع عند الكاشير هيفتح رابط جوجل مباشرةً
(هيشتغل، بس من غير الفافيكون والشكل بتاعك).

في **Index.html** فوق دالة `loadQR` ضيف السطر ده:

```js
var SITE_URL='https://USER.github.io/REPO/';   // سيبه '' لو عايز رابط أبس سكريبت
```

وجوه `loadQR` بعد السطر:

```js
  if(QRURL){ paintQR(h,QRURL); return }
```

ضيف:

```js
  if(SITE_URL){ QRURL=SITE_URL+(SITE_URL.indexOf('?')>=0?'&':'?')+'qr=1'; paintQR(h,QRURL); return }
```

## ٣) ملاحظة مهمة عن تسجيل الحضور بالموقع

صفحة الغلاف بتمرّر صلاحية الموقع للإطار (`allow="geolocation *"`).
جرّب تسجيل حضور مرة من الرابط الجديد على موبايل حقيقي قبل ما تعمّمه.
لو المتصفح رفض يطلب الموقع جوه الإطار (بيحصل في بعض إصدارات iOS القديمة)،
غيّر في `index.html`:

```js
var APP_URL = '...';
```

وخلي زرار "افتح في تاب جديد" هو المسار الرسمي للحضور، أو خلي كود الـ QR
شايل رابط أبس سكريبت مباشرةً (يعني سيب `SITE_URL=''` في تعديل ٣).
الباقي — الداش بورد والتقارير والمهام — شغال جوه الإطار عادي في كل الحالات.

## ٤) الفافيكون

`favicon.ico` + مقاسات PNG + `apple-touch-icon.png` كلها متولّدة من `2S_Home_Wear.png`
ومربوطة في `index.html`. لو غيّرت الصورة، استبدل الملفات بنفس الأسماء.
لو الأيقونة القديمة فضلت ظاهرة، اعمل Hard refresh (Ctrl+Shift+R) — المتصفحات
بتكاش الفافيكون بشراسة.
