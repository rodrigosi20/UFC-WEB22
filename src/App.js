import { Routes, Route, Link } from 'react-router-dom'
import CreateStudents from './components/Students/CreateStudents';
import EditStudents from './components/Students/EditStudents';
import ListStudents from './components/Students/ListStudents';
import CreateTeacher from './components/teachers/CreateTeacher';
import EditTeacher from './components/teachers/EditTeacher';
import ListTeacher from './components/teachers/ListTeacher';
import Home from './components/Home';

function App() {
  return (
    <div className='container'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to={'/'} className='navbar-brand' style={{ paddingLeft: 10 }}>CRUD</Link>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>Home</Link>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Estudante
              </a>
              {}
              <ul class="dropdown-menu">
                <li className='nav-item'>
                  <Link to='/createStudent' className='nav-link'>Criar Estudante</Link>
                </li>

                <li className='nav-item'>
                  <Link to='/editStudent' className='nav-link'>Editar Estudante</Link>
                </li>

                <li className='nav-item'>
                  <Link to='/listStudent' className='nav-link'>Listar Estudante</Link>
                </li>
              </ul>
            </li>

            {}
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Professor
              </a>
              <ul class="dropdown-menu">
                <li className='nav-item'>
                  <Link to='/createTeacher' className='nav-link'>Criar Professor</Link>
                </li>

                <li className='nav-item'>
                  <Link to='/editTeacher' className='nav-link'>Editar Professor</Link>
                </li>

                <li className='nav-item'>
                  <Link to='/listTeacher' className='nav-link'>Listar Professor</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='createStudents' element={<CreateStudents />} />
        <Route path='editStudents/:id' element={<EditStudents />} />
        <Route path='listStudents' element={<ListStudents />} />

        <Route path='createTeacher' element={<CreateTeacher />} />
        <Route path='editTeacher/:id' element={<EditTeacher />} />
        <Route path='listTeacher' element={<ListTeacher />} />
      </Routes>
    </div>
  );
}

export default App;