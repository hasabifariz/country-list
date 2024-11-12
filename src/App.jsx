import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Countries from './pages/Countries/Countries';
import CountriesDetail from './pages/Countries/CountriesDetail';

const App = () => {

  const menu = [
    {
      to: '/countries',
      page: <Countries />
    },
    {
      to: '/countries/detail',
      page: <CountriesDetail />
    }
  ]

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/countries" replace />} />
        {
          menu.map((item) => {
            return (
              <Route path={item.to} element={
                <Layout>
                  {item.page}
                </Layout>
              }
              />
            )
          })
        }
      </Routes>
    </Router>
  );
};

export default App;
