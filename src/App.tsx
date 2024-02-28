import useFetch from "./hooks/useFetch"

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function App() {
  const {isLoading, data, error} = useFetch<Todo>('https://jsonplder.typicode.com/todos/1')

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (!!error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.completed}</p>
    </div>
  )
}
