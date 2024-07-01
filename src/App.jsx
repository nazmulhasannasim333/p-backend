import MainLayout from './components/layout/MainLayout';
import PrivateRoute from './routes/PrivateRoutes';

const App = () => {
  return (
    <PrivateRoute>
      <MainLayout />
    </PrivateRoute>
  );
};

export default App;