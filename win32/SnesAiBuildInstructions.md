# تعليمات بناء نسخة Snes9x المدمجة مع Cloud/AI

هذه التعليمات تخص **الهدف المدعوم الوحيد** في هذا الفرع:

- `win32\snes9xw.vcxproj`

أي عمل على ميزات `Cloud/AI` يجب أن ينتهي داخل تطبيق ويندوز الرئيسي نفسه، وليس داخل المشاريع التجريبية التالية:

- `win32\SnesAiFinalInternal.vcxproj`
- `win32\SnesAiFinalProject\SnesAiFinal.vcxproj`

## 1. البيئة المعتمدة

- **MSBuild**: Visual Studio 2022 Build Tools أو Visual Studio 2022 Community
- **Toolset**: `v143`
- **Platform**: `x64`
- **Configuration**: `Release Unicode`

ممنوع التحويل إلى `v145` لهذا المسار.

## 2. سبب فشل الربط الشائع

إذا ظهر الخطأ `C1047` في مرحلة الربط، فالمشكلة ليست غالبًا في كود التطبيق أو كود الـ AI، بل في أن مكتبات:

- `zlib`
- `libpng`
- `glslang`
- `SPIRV`
- `HLSL`
- `OSDependent`

تم بناؤها سابقًا بمترجم مختلف عن المترجم الحالي.

الحل الصحيح هو **إعادة بناء الاعتماديات أولًا بنفس `MSBuild` ونفس `v143`** قبل بناء التطبيق الرئيسي.

## 3. الترتيب الإلزامي للبناء

1. أعد بناء `win32\zlib\zlib.vcxproj`
2. أعد بناء `win32\libpng\libpng.vcxproj`
3. أعد بناء `win32\glslang\SPIRV\SPIRV.vcxproj`

الخطوة الثالثة تعيد بناء الاعتماديات التابعة لها أيضًا:

- `HLSL`
- `OSDependent`
- `glslang`

4. انسخ المكتبات الناتجة إلى جذر `win32\`
5. ابنِ `win32\snes9xw.vcxproj` مع:

- `/p:BuildProjectReferences=false`

## 4. السكربت المعتمد

استخدم هذا السكربت فقط:

- `win32\build_main_release_x64.cmd`

هذا السكربت تم التحقق منه ويقوم بالآتي:

- يكتشف `MSBuild.exe` من Visual Studio 2022
- يعيد بناء الاعتماديات بالترتيب الصحيح
- ينسخ ملفات `.lib` المطلوبة إلى `win32\`
- يبني التطبيق الرئيسي فقط
- يتحقق من وجود الملف النهائي

## 4.1 قفل مسارات البناء البديلة

تم تفعيل قفل صريح داخل:

- `Directory.Build.targets`

هذا القفل يمنع MSBuild من بناء أي مشروع غير:

- `win32\snes9xw.vcxproj`
- `win32\zlib\zlib.vcxproj`
- `win32\libpng\libpng.vcxproj`
- `win32\glslang\SPIRV\SPIRV.vcxproj`
- `win32\glslang\hlsl\HLSL.vcxproj`
- `win32\glslang\glslang\glslang.vcxproj`
- `win32\glslang\glslang\OSDependent\Windows\OSDependent.vcxproj`

وبالتالي فإن المشاريع البديلة مثل:

- `win32\SnesAiFinalInternal.vcxproj`
- `win32\SnesAiFinalProject\SnesAiFinal.vcxproj`

لن يسمح لها بالبناء داخل هذا الـ workspace.

## 5. الأمر اليدوي المكافئ

```powershell
& "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\MSBuild\Current\Bin\MSBuild.exe" `
  "win32\snes9xw.vcxproj" `
  /t:Rebuild `
  /p:Configuration="Release Unicode" `
  /p:Platform=x64 `
  /p:BuildProjectReferences=false `
  /p:PlatformToolset=v143 `
  /m:1 `
  /v:minimal `
  /nologo
```

ملاحظة: هذا الأمر اليدوي **يفترض** أن الاعتماديات أعيد بناؤها مسبقًا.

## 6. الناتج النهائي المتوقع

- **الملف**: `win32\snes9x-x64.exe`

إذا لم يظهر هذا الملف، فالبناء لم يكتمل بشكل صحيح.

## 7. نطاق كود Cloud/AI

طبقة `Cloud/AI` في هذا الفرع مرتبطة أساسًا بهذه الملفات:

- `win32\wsnes9x.cpp`
- `win32\SnesEmuAi*.h`

أي تعديل جديد يجب أن يبقى متوافقًا مع هذا المسار، ولا يجب فتح مسار بناء بديل أو مشروع بديل إلا إذا طلب المستخدم ذلك صراحة.
