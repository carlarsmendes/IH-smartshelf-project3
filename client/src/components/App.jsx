import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import LibraryDetail from './pages/LibraryDetail.js';
import LibraryBooks from './pages/LibraryBooks.jsx';
import AddLibrary from './pages/AddLibrary.jsx';
import AddBook from './pages/AddBook.jsx';
import BookDetail from './pages/BookDetail';
import NavBar from './NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Map from './pages/Map.js';
import api from '../api';
import Profile from './pages/Profile';

export default class App extends Component {

  handleLogoutClick(e) {
    api.logout()
  }
  render() {
    return (
      <div className="App">
      <NavBar />
    
        <Switch>
          <Route path="/" exact component={Home} />
          {api.isLoggedIn() ? <Route path="/profile" component={Profile} /> : <Route path="/profile" component={Login} />}
          <Route path="/add-library" component={AddLibrary} />
          <Route path="/libraries/:libraryId" component={LibraryDetail} />
          <Route path="/:libraryId/books" component={LibraryBooks} />
          <Route path="/:libraryId/add-book" component={AddBook} />
          <Route path="/books/:bookId" component={BookDetail} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/map" component={Map} />

          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}