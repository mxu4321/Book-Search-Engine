// ✅ Create an Apollo Provider to make every request work with the Apollo server.
// ❄️ import apollo client
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// ❄️ Create a new Apollo client
const client = new ApolloClient({
  // ❄️ Provide the URI to the Apollo Server
  uri: '/graphql',
  // ❄️ Include the token in the request headers to make every request work with the Apollo server
  request: (operation) => {
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  // ❄️ Create a new cache for the Apollo client
  cache: new InMemoryCache(),
});

function App() {
  return (
    // ❄️ Wrap the entire app in the Apollo Provider component
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;


