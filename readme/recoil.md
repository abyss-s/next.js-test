# Recoil

React 애플리케이션을 위한 상태 관리 라이브러리

전역 상태 관리, 파생된 상태(selectors)를 활용한 데이터 변환, 상태의 지속성 및 비동기 상태 처리 등을 지원.
이를 통해 컴포넌트 간 상태 공유와 관리가 용이해진다.

## 주요 기능 및 개념

### 1. 아톰(Atom)과 셀렉터(Selector)의 개념과 사용법

- **아톰(Atom)**: 애플리케이션의 상태(state)를 나타내며, 어떤 컴포넌트에서나 읽고 쓸 수 있는 단위입니다. 아톰은 전역으로 공유되며, 아톰에 변화가 있을 경우 이를 구독(subscribe)하는 컴포넌트들이 재렌더링됩니다.

  ```jsx
  import { atom } from 'recoil';

  const textState = atom({
    key: 'textState', // 고유한 ID
    default: '', // 기본값
  });
  ```

- **셀렉터(Selector)**: 파생된 상태(derived state)를 나타내며, 아톰이나 다른 셀렉터를 입력으로 받아 동적인 데이터를 생성하는 순수 함수입니다. 셀렉터는 참조하는 아톰의 값이 변경되면 자동으로 최신화되며, 이를 구독하는 컴포넌트들도 함께 업데이트됩니다

  ```jsx
  import { selector } from 'recoil';
  import { textState } from './atoms';

  const charCountState = selector({
    key: 'charCountState',
    get: ({ get }) => {
      const text = get(textState);
      return text.length;
    },
  });
  ```

### 2. 비동기 셀렉터를 통한 데이터 페칭

Recoil의 셀렉터는 비동기 함수를 지원하여, 외부 API 호출 등 비동기 작업을 수행할 수 있습니다. 이를 통해 컴포넌트에서 직접 비동기 로직을 처리하지 않고도 상태를 관리할 수 있습니다.

```jsx
import { selector } from 'recoil';

const asyncDataSelector = selector({
  key: 'asyncDataSelector',
  get: async () => {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  },
});
```

### 3. Atom Family와 Selector Family

- **Atom Family**: 비슷한 형태의 여러 아톰을 생성할 때 사용합니다. 파라미터를 받아 해당 파라미터에 따라 아톰을 생성하므로, 동적인 아톰 생성을 가능하게 합니다.

  ```jsx
  import { atomFamily } from 'recoil';

  const itemState = atomFamily({
    key: 'itemState',
    default: (id) => ({ id, value: '' }),
  });
  ```

- **Selector Family**: Atom Family와 유사하게, 파라미터를 받아 동적으로 셀렉터를 생성합니다. 이를 통해 다양한 입력에 따른 파생 상태를 효율적으로 관리할 수 있습니다.

  ```jsx
  import { selectorFamily } from 'recoil';

  const itemLengthState = selectorFamily({
    key: 'itemLengthState',
    get:
      (id) =>
      ({ get }) => {
        const item = get(itemState(id));
        return item.value.length;
      },
  });
  ```

### 4. Recoil 훅의 올바른 사용법

- **`useRecoilState`**: 아톰의 값을 읽고 쓸 수 있는 훅입니다. 상태 값과 해당 값을 업데이트하는 함수를 반환합니다.

  ```jsx
  import { useRecoilState } from 'recoil';
  import { textState } from './atoms';

  function TextInput() {
    const [text, setText] = useRecoilState(textState);

    const onChange = (event) => {
      setText(event.target.value);
    };

    return <input type="text" value={text} onChange={onChange} />;
  }
  ```

- **`useRecoilValue`**: 아톰이나 셀렉터의 값을 읽기 전용으로 사용할 때 사용하는 훅입니다. 값을 반환하며, 해당 값을 업데이트하는 함수는 제공하지 않습니다.

  ```jsx
  import { useRecoilValue } from 'recoil';
  import { charCountState } from './selectors';

  function CharacterCount() {
    const count = useRecoilValue(charCountState);
    return <div>Character Count: {count}</div>;
  }
  ```

- **`useSetRecoilState`**: 아톰의 값을 설정하는 함수만을 반환하는 훅입니다. 주로 값의 읽기가 필요하지 않은 경우에 사용합니다.

  ```jsx
  import { useSetRecoilState } from 'recoil';
  import { textState } from './atoms';

  function ClearButton() {
    const setText = useSetRecoilState(textState);

    const clearText = () => {
      setText('');
    };

    return <button onClick={clearText}>Clear</button>;
  }
  ```

Recoil은 이러한 기능들을 통해 React 애플리케이션에서 효율적인 상태 관리를 지원하며, 컴포넌트 간의 상태 공유와 파생된 상태의 관리를 용이하게 합니다.
