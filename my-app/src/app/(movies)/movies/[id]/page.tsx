export default function MovieDetail({ params: { id } }: { params: { id: string } }) {
  // console.log(props);
  return (
    <div>
      <h1>Movie #{id}</h1>
    </div>
  );
}

/*
 * 동적 라우팅: react-router의 :id와 같은 역할!
 */
