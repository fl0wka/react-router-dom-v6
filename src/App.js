import { Link, useParams, Outlet, Navigate, useRoutes } from 'react-router-dom';

const users = [
  { id: 1, name: 'user 1' },
  { id: 2, name: 'user 2' },
  { id: 3, name: 'user 3' },
  { id: 4, name: 'user 4' },
  { id: 5, name: 'user 5' },
];

const Main = () => {
  return (
    <>
      <h2>Home page</h2>
      <Link to="users">User list page</Link>
    </>
  );
};

const UsersLayout = () => {
  return (
    <>
      <h2>Users Layout</h2>
      <Outlet />
    </>
  );
};

const UserListPage = () => {
  return (
    <>
      <h2>User list page</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Link to={`${u.id}`}>{u.name}</Link>
          </li>
        ))}
      </ul>
      <br />
      <Link to="/">Home page</Link>
    </>
  );
};

const UserPage = () => {
  const { userId } = useParams();
  console.log('userPage: ', userId);

  return (
    <>
      <h2>User Page</h2>
      <ul>
        <li>
          <Link to="/users">User list page</Link>
        </li>
        <li>
          <Link to={`/users/${userId}/edit`}>Edit this user</Link>
        </li>
      </ul>
      <p>UserId: {userId}</p>
    </>
  );
};

const EditUserPage = () => {
  const { userId } = useParams();
  console.log('edit: ', userId);
  const nextUser = (Number(userId) + 1).toString();
  return (
    <>
      <h2>Edit user page</h2>
      <ul>
        <li>
          <Link to={`/users/${userId}/profile`}>User profile page</Link>
        </li>
        <li>
          <Link to={`/users/${nextUser}/profile`}>Another user</Link>
        </li>
        <li>
          <Link to="/users">User List Page</Link>
        </li>
      </ul>
    </>
  );
};

const routes = [
  { path: '/', element: <Main /> },
  {
    path: 'users',
    element: <UsersLayout />,
    children: [
      { path: '', element: <UserListPage /> },
      { path: ':userId', element: <Navigate to="profile" /> },
      { path: ':userId/profile', element: <UserPage /> },
      { path: ':userId/edit', element: <EditUserPage /> },
    ],
  },
  { path: '*', element: <Navigate to="" /> },
];

function App() {
  // Реализация через hook
  const element = useRoutes(routes);
  return element;

  // Реализация через Routes
  // return (
  //   <>
  //     <h1>App</h1>
  //     <Routes>
  //       <Route index element={<Main />} />
  //       <Route path="users" element={<UsersLayout />}>
  //         <Route index element={<UserListPage />} />
  //         <Route path=":userId" element={<Navigate to="profile" />} />
  //         <Route path=":userId/profile" element={<UserPage />} />
  //         <Route path=":userId/edit" element={<EditUserPage />} />
  //       </Route>
  //       <Route path="*" element={<Navigate to="" />} />
  //     </Routes>
  //   </>
  // );
}

export default App;
