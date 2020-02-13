import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import Header from 'components/layout/Header';
import Dashboard from 'components/layout/Dashboard';
import {InvestmentsProvider} from 'context/InvestmentsContext';

import 'styles/app.scss';

function App () {
  return (
    <BrowserRouter>
      <InvestmentsProvider>
        <div className="App">
          <Helmet>
            <meta charSet="utf-8" />
            <title>My invest</title>
            <meta name="robots" content="index, follow" />
            <meta
              name="description"
              content="O My Invest é a primeira plataforma a consolidar todos os seus investimentos em um só lugar"
            />
            <meta name="keywords" content="mercado, investimentos, renda" />
          </Helmet>
          <main className="container">
            <Header />
            <Dashboard />
          </main>
        </div>
      </InvestmentsProvider>
    </BrowserRouter>
  );
}

export default App;
