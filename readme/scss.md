# SCSS

> [Sass 공식 문서](https://sass-lang.com/documentation) > [SaSS & SCSS 소개 & 설치 세팅 💯 총정리](https://inpa.tistory.com/entry/SCSS-%F0%9F%92%8E-SassSCSS-%EB%9E%80-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%BB%B4%ED%8C%8C%EC%9D%BC)

- Sass(Syntactically Awesome Style Sheets)의 구문 중 하나
- CSS의 부족한 부분을 보완하기 위해 설계된 CSS 전처리기 언어
- CSS와 비슷하게 중괄호 + 세미콜론 형식으로 작성

## CSS vs. SCSS

### CSS의 단점

- 선택자가 많아질수록 복잡해지고, 코드 중복이 많아짐
- 규모가 커질수록 유지보수가 복잡해짐

### SCSS의 장점과 단점

> 장점

- **선택자 중첩(Nesting) 구조**
  - 선택자를 중첩하여 작성 가능: 선택자 반복 줄여줌
  - 코드 구조를 명확히 하면서도 코드의 가독성을 높임
- **변수 재사용**
  - 선언한 변수를 재사용하여 일관성 유지
- **다양한 추가 기능**

  - CSS 불가능한 수치 계산을 지원하여 동적인 스타일을 작성 가능
  - 변수 사용, 조건문 및 반복문, 모듈화(import 가능), 네스팅
  - 함수 사용: 믹스인, 확장 및 상속 가능

> 단점

- 전처리기를 위한 도구 필요
- 컴파일 시간 필요

## 사용법

1. `.scss`로 파일 생성
2. SCSS 컴파일러를 사용하여 SCSS 파일을 CSS 파일로 변환

### 설치

> 터미널

```bash
npm install sass --save-dev
```

> package.json

Live Sass Compiler 확장 설치하면, 저장시 자동으로 sccs 파일 변환시켜줌

```json
"scripts": {
    "scss": "sass --watch styles/styles.scss:dist/styles.css --source-map dist/styles.css.map"
}
```
