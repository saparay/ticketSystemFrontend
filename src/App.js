import { Navigate, Route, Routes, useNavigate, useRoutes } from 'react-router-dom';
import './App.css';
import CreateTicket from './components/tickets/CreateTicket';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import NavBar from './components/NavBar';
import ReadTicketAddNote from './components/tickets/ReadTicketAddNote';
import AuthProvider, { useAuth } from './components/security/AuthContext';
import TicketsInterface from './components/tickets/TicketsInterface';
import ReadUsers from './components/userFolder/ReadUsers';
import UsersCreate from './components/userFolder/UsersCreate';
import ReadWorkNotes from './components/worknote/ReadWorkNotes';
import Footer from './components/Footer';
import LoginComponent from './components/security/LoginComponent';
import ClosedTickets from './components/tickets/ClosedTickets';

function AuthenticatedRoute({ children }) {
  const navigate = useNavigate();
  const authContext = useAuth();
  
  authContext.check();
  if (authContext.isAuthenticated) {
    //navigate('/')
    return children;
  }
  if(!authContext.isAuthenticated){
    return navigate("/login")
  }

}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginComponent />} />
          <Route path='/tickets' element={<AuthenticatedRoute><TicketsInterface /></AuthenticatedRoute>} />
          <Route path='/closed-tickets' element={<AuthenticatedRoute><ClosedTickets /></AuthenticatedRoute>} />
          <Route path='/create/:id' element={<AuthenticatedRoute><CreateTicket /></AuthenticatedRoute>} />
          <Route path='/read/:id' element={<AuthenticatedRoute><ReadTicketAddNote /></AuthenticatedRoute>} />
          <Route path='/create-user' element={<AuthenticatedRoute><UsersCreate /></AuthenticatedRoute>} />
          <Route path='/read-user' element={<AuthenticatedRoute><ReadUsers /></AuthenticatedRoute>} />
          <Route path='/read-work-notes/:id' element={<AuthenticatedRoute><ReadWorkNotes /></AuthenticatedRoute>} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;


