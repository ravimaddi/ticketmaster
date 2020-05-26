import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import CustomerList from './components/customers/CustomerList'
import CustomerNew from './components/customers/CustomerNew'
import CustomerShow from './components/customers/CustomerShow'
import CustomerEdit from './components/customers/CustomerEdit'
import DptList from './components/departments/DptList'
import EmpList from './components/employees/EmpList'
import EmpNew from './components/employees/EmpNew'
import TicketList from './components/tickets/TicketsList'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

function App() {

  return (
    <div>

      <BrowserRouter>

        <Navbar bg="dark" variant="dark" >
          <Navbar.Brand >Ticket Master</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/customers">Customers</Nav.Link>
            <Nav.Link href="/departments">Departments</Nav.Link>
            <Nav.Link href="/employees">Employees</Nav.Link>
            <Nav.Link href="/tickets">Tickets</Nav.Link>
          </Nav>
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <NavDropdown.Item href="/users/register">Register</NavDropdown.Item>
            <NavDropdown.Item href="/users/login">Login</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/users/logout">Logout</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/">Contact Us</Nav.Link> |
      <Nav.Link href="/">Login</Nav.Link>
        </Navbar>

        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/customers" component={CustomerList} exact={true} />
          <Route path="/customers/new" component={CustomerNew} />
          <Route path="/customers/edit/:id" component={CustomerEdit} />
          <Route path="/customers/:id" component={CustomerShow} />
          <Route path="/departments" component={DptList} />
          <Route path="/employees" component={EmpList} exact={true} />
          <Route path="/employees/new" component={EmpNew} />
          <Route path="/tickets" component={TicketList} />
          <Route path="/users/register" component={Register} />
          <Route path="/users/login" component={Login} />
          <Route path="/users/logout" component={Logout} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
