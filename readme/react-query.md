# React Query

**React Query**는 서버 상태 관리 라이브러리로, 데이터 페칭, 캐싱, 동기화, 업데이트 등을 간편하게 처리할 수 있도록 도와줍니다. 이를 통해 서버 상태와 클라이언트 상태를 명확하게 분리하고, 효율적인 데이터 관리를 가능하게 합니다.

---

## 주요 기능 및 개념

### 1. 쿼리(Query)와 뮤테이션(Mutation)의 개념과 차이점

- **쿼리(Query)**: 데이터를 **읽어오는 작업**을 담당합니다. 서버로부터 데이터를 가져와 컴포넌트에 제공합니다.
- **뮤테이션(Mutation)**: 데이터를 **변경하는 작업**을 담당합니다. 예를 들어, 생성, 수정, 삭제와 같은 작업이 해당됩니다.

### 2. 쿼리 키(Query Key)와 캐싱 전략

- **쿼리 키(Query Key)**: 각 쿼리를 식별하는 고유한 키입니다. 이 키를 기반으로 React Query는 데이터를 캐싱하고, 필요 시 해당 데이터를 갱신합니다.
- **캐싱 전략**: React Query는 쿼리 키를 활용하여 데이터를 캐싱합니다. 이를 통해 동일한 데이터에 대한 중복 요청을 방지하고, 애플리케이션의 성능을 향상시킵니다.

### 3. 병렬 쿼리와 의존적 쿼리

- **병렬 쿼리**: 여러 데이터를 동시에 가져와야 할 때 사용됩니다. React Query에서는 `useQueries` 훅을 사용하여 병렬 쿼리를 처리할 수 있습니다.
- **의존적 쿼리**: 하나의 쿼리가 다른 쿼리의 결과에 의존하는 경우입니다. 이 경우, 첫 번째 쿼리가 성공한 후 그 결과를 기반으로 다음 쿼리를 실행합니다.

### 4. 쿼리 무효화와 리페칭 전략

- **쿼리 무효화(Query Invalidation)**: 특정 조건에서 캐시된 데이터를 무효화하여, 서버로부터 최신 데이터를 가져오도록 합니다. 이를 통해 데이터의 일관성을 유지할 수 있습니다.
- **리페칭 전략(Refetching Strategy)**: 데이터의 신선도를 유지하기 위해 일정한 조건이나 이벤트에 따라 데이터를 다시 가져오는 방법입니다. 예를 들어, 사용자가 페이지를 다시 방문하거나, 특정 시간이 경과한 후 데이터를 자동으로 리페칭할 수 있습니다.

---

## Tanstack Query 예제

### 1. Tanstack Query를 시작하는 법

앱 전체에서 React Query를 사용해 API 데이터 페칭, 캐싱, 리페칭 등이 가능하도록 **쿼리 클라이언트**와 **쿼리 프로바이더**를 설정합니다.

```tsx
// pages/_app.tsx
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
```

### 2. API 데이터 페칭 및 캐싱

- **쿼리 키(Query Key)**: 각 데이터 요청을 고유하게 식별하는 문자열 혹은 배열을 사용해 캐싱 전략을 적용합니다.
- **자동 캐싱 및 백그라운드 업데이트**: 한 번 가져온 데이터는 캐시되어 중복 요청을 줄이고, 백그라운드에서 최신 상태로 유지됩니다.

```tsx
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPosts = async () => {
  const { data } = await axios.get('/api/posts');
  return data;
};

function PostsList() {
  const { data, isLoading, error } = useQuery(['posts'], fetchPosts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred!</div>;

  return (
    <ul>
      {data.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### 3. 쿼리 뮤테이션으로 데이터 변경하기

```tsx
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

function CreatePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation((newPost) => axios.post('/api/posts', newPost), {
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(['posts']);
      const previousPosts = queryClient.getQueryData(['posts']);
      queryClient.setQueryData(['posts'], (old: any) => [...old, newPost]);
      return { previousPosts };
    },
    onError: (err, newPost, context: any) => {
      queryClient.setQueryData(['posts'], context.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = e.currentTarget.elements.title.value;
        mutation.mutate({ title });
      }}
    >
      <input name="title" placeholder="Post Title" />
      <button type="submit">Create Post</button>
    </form>
  );
}
```

### 4. 병렬 쿼리

```tsx
const { data: user } = useQuery(['user', userId], fetchUser);
const { data: posts } = useQuery(['posts'], fetchPosts);
```

### 5. 의존적 쿼리

```tsx
const { data: user } = useQuery(['user', userId], fetchUser);
const { data: userDetails } = useQuery(['userDetails', user?.id], () => fetchUserDetails(user.id), { enabled: !!user });
```

### 6. 무한 스크롤 또는 페이지네이션 처리

```tsx
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

const fetchInfinitePosts = async ({ pageParam = 0 }) => {
  const { data } = await axios.get(`/api/posts?cursor=${pageParam}`);
  return data;
};

function InfinitePosts() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    'infinitePosts',
    fetchInfinitePosts,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div>
      {data.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.posts.map((post: any) => (
            <div key={post.id}>{post.title}</div>
          ))}
        </React.Fragment>
      ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          Load More
        </button>
      )}
    </div>
  );
}
```
