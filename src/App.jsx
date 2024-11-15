import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Countries from './pages/Countries/Countries';
import CountriesDetail from './pages/Countries/CountriesDetail';
import CooperatingCountries from './pages/CooperatingCountries/CooperatingCountries';

const App = () => {

  const menu = [
    {
      name: 'Countries',
      to: '/countries',
      page: <Countries />
    },
    {
      name: 'CountriesDetail',
      to: '/countries/detail',
      page: <CountriesDetail />
    },
    {
      name: 'CooperatingCountries',
      to: '/cooperated-countries',
      page: <CooperatingCountries />
    }
  ]

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/countries" replace />} />
        {
          menu.map((item) => {
            return (
              <Route key={item.name} path={item.to} element={
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
