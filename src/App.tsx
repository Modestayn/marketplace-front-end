import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './App.css';
const fetchUsers = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
  return data;
};
//  typical request for testing TanStack( delete )
function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>ERROR: {error.message}</p>;

  return (
    <div>
      <h1>Список пользователей</h1>
      <ul>
        {data.map((user: { id: number; name: string }) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
