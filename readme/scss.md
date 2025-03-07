### SCSS 개요

[Sass 공식 문서](https://sass-lang.com/documentation)  
[SaSS & SCSS 소개 & 설치 세팅 총정리](https://inpa.tistory.com/entry/SCSS-%F0%9F%92%8E-SassSCSS-%EB%9E%80-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%BB%B4%ED%8C%8C%EC%9D%BC)

SCSS는 **Sass(Syntactically Awesome Style Sheets)**의 구문 중 하나로, CSS의 부족한 점을 보완하기 위해 설계된 **CSS 전처리기** 언어입니다.  
CSS와 비슷한 **중괄호 `{}` + 세미콜론 `;`** 형식으로 작성됩니다.

---

## 📌 CSS vs. SCSS

### ✅ CSS의 단점

- 선택자가 많아질수록 **복잡**해지고 코드 **중복**이 증가
- 프로젝트 규모가 커질수록 **유지보수 어려움**

### ✅ SCSS의 장점과 단점

#### **🔹 SCSS 장점**

- **선택자 중첩(Nesting)**: 선택자를 중첩하여 **코드 반복을 줄이고 가독성을 높임**
- **규칙 중첩**: 특정 조건에서만 스타일 적용 가능 (ex. `@media`, `@supports` 활용)
- **속성 중첩**: 관련 속성을 그룹화하여 코드 가독성 향상

```scss
font: {
  family: Helvetica, sans-serif;
  size: 18px;
  weight: bold;
}

text: {
  align: center;
  transform: lowercase;
  overflow: hidden;
}
```

```css
font-family: Helvetica, sans-serif;
font-size: 18px;
font-weight: bold;

text-align: center;
text-transform: lowercase;
text-overflow: hidden;
```

- **변수 사용**: `$변수명`을 사용해 **스타일의 일관성 유지**
- **연산 지원**: 수치 연산, 논리 연산이 가능
- **모듈화 지원**: `@import`로 스타일 파일을 분리해 유지보수 용이
- **재사용 기능 제공**: `@mixin`과 `@extend`를 활용한 스타일 재사용

#### **🔸 SCSS 단점**

- **전처리기 도구 필요** (Node.js, `sass` 설치 필요)
- **컴파일 과정 필요** (SCSS → CSS 변환)

---

## 🛠 SCSS 사용법

1. **`.scss` 파일 생성**
2. **SCSS 컴파일러를 사용하여 CSS 파일로 변환**

### 설치 및 실행

#### **설치 (터미널)**

```bash
npm install sass --save-dev
```

#### **자동 컴파일 설정 (`package.json`)**

Live Sass Compiler 확장을 설치하면 `.scss` 파일이 저장될 때 자동으로 변환됩니다.

```json
"scripts": {
  "scss": "sass --watch styles/styles.scss:dist/styles.css --source-map dist/styles.css.map"
}
```

---

## ✨ SCSS 기능

### 🔹 **변수 사용**

```scss
$primary-color: #3498db;
$font-size: 16px;

body {
  color: $primary-color;
  font-size: $font-size;
}
```

### 🔹 **전역 스타일 시트**

- **글로벌 변수**는 별도의 파일에서 선언 후 `@import`하여 사용
- `_globals.scss` 파일에 모든 글로벌 변수 정의 후 `@include`로 사용

---

### 🔹 **@import - 스타일 모듈화**

- 확장자(`.scss`)를 생략하고 파일을 가져올 수 있음
- `_파일명.scss`로 시작하는 **파셜 파일**은 개별 CSS 파일로 컴파일되지 않음

```scss
@import 'variables';
@import 'colors';
@import 'reset';
```

---

### 🔹 **@mixin - 스타일 재사용**

- **반복되는 스타일 패턴**을 믹스인으로 정의하여 사용
- **매개변수 사용 가능**
- **하이픈(-)과 언더스코어(\_)는 동일하게 인식됨**

```scss
// 정의하기
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// 호출하기
.container {
  @include flex-center;
}
```

---

### 🔹 **@extend - 스타일 상속**

- **공통 스타일을 상속받아 중복 제거**
- HTML에서 여러 클래스를 지정할 필요 없음

```scss
.button-basic {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report {
  @extend .button-basic;
  background-color: red;
}

.button-submit {
  @extend .button-basic;
  background-color: green;
  color: white;
}
```

---

## 🚀 Next.js에서 SCSS 사용

- **Next.js는 추가 설정 없이 자동으로 SCSS 파일을 컴파일**
- **페이지 또는 컴포넌트에서 SCSS 파일을 가져오기만 하면 됨**

```tsx
import styles from './Button.module.scss';

const Button = () => {
  return <button className={styles.button}>Click Me</button>;
};

export default Button;
```
