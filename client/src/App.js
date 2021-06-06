import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ListTable from './components/ListTable';
import ListForm from './components/ListForm';
import Notifications from './components/Notifications';
import '../node_modules/noty/lib/noty.css'
import '../node_modules/noty/lib/themes/bootstrap-v4.css'

function App() {
  return (
    <div className="container">
      <h1>Post</h1>
      <Notifications />
      <ListForm />
      <hr />
      <ListTable />
    </div>
  );
}

export default App;
