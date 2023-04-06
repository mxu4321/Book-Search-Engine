// ✅ Create an Apollo Provider to make every request work with the Apollo server.
// ❄️ import apollo client
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// ❄️ Include the token in the request headers to make every request work with the Apollo server
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// ❄️ Create a new Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
    // ❄️ Create a new cache for the Apollo client
    cache: new InMemoryCache(),
  });
 
  // request: (operation) => {
  //   const token = localStorage.getItem('id_token');
  //   operation.setContext({
  //     headers: {
  //       authorization: token ? `Bearer ${token}` : '',
  //     },
  //   });
  // },


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