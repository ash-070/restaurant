import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Restaurant from './restaurant';
import List from './List';
import Visiteur from './visiteur';
import "./App.css"
import Edit from './edit';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Dashboard from './dashboard';
import Login from './login';
import ProtectedRoute from './ProtectedRoute';

function NavigationBar() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  if (location.pathname === '/login') return null;

  return (
    <Stack sx={{marginLeft:"185px", marginTop:"15px"}} spacing={2} direction="row">
      <Link to={'/'}>
        <Button variant="contained">Dashboard</Button>
      </Link>
      {/* <Link to={'/visiteur'}>
        <Button variant="contained">Visiteur</Button>
      </Link>  */}
      <Link to={'/reservation'}>
        <Button variant="contained">Reservation</Button>
      </Link> 
      <Link to={'/list'}>
        <Button variant="contained">Reservation List</Button>
      </Link>
      
      {token && (
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </Stack>
  );
}

function App() {
  return (
    <>
      <Router>
        <Card sx={{minHeight:"400px",marginTop:"30px",marginLeft:"150px",maxWidth:"1000px",backgroundColor: "rgba(255, 255, 255, 0.9)"}}>
            
            <NavigationBar />

          <Routes>
            <Route path='/login' element={<Login />} />

            <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path='/reservation' element={<ProtectedRoute><Restaurant /></ProtectedRoute>} />
            <Route path='/list' element={<ProtectedRoute><List/></ProtectedRoute>} />
            <Route path='/edit/:id' element={<ProtectedRoute><Edit/></ProtectedRoute>} />
            {/* <Route path='/visiteur' element={<ProtectedRoute><Visiteur/></ProtectedRoute>} /> */}
          </Routes>
        </Card>
      </Router>
    </>
  );
}

export default App;

























// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import Restaurant from './restaurant';
// import List from './List';
// import Visiteur from './visiteur';
// import Dashboard from './dashboard';
// import "./App.css"
// import Edit from './edit';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// function App() {
//   return (
//     <>
//     <Router>
//        <Card sx={{minHeight:"400px",marginTop:"30px",marginLeft:"320px",maxWidth:"700px",backgroundColor: "rgba(255, 255, 255, 0.9)"}}>
//             <Stack sx={{marginLeft:"185px", marginTop:"15px"}} spacing={2} direction="row">
//                  <Link to={'/'}>
//                     <Button variant="contained">Dashboard</Button>
//                   </Link> 
//                  <Link to={'/visiteur'}>
//                     <Button variant="contained">Visiteur</Button>
//                   </Link> 
//                  <Link to={'/reservation'}>
//                     <Button variant="contained">Reservation</Button>
//                   </Link> 

//                   <Link to={'/list'}>
//                      <Button variant="contained">Reservation List</Button>
//                    </Link>
      {/* زر تسجيل الخروج */}
      // {token && (
      //   <Button variant="outlined" color="error" onClick={handleLogout} sx={{ ml: 'auto !important' }}>
      //     خروج
      //   </Button>
//             </Stack>
//           {/* <Restaurant/> */}
        // <Routes>
        //   <Route path='/login' element={<Login />} />

        //   <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        //   <Route path='/reservation' element={<ProtectedRoute><Restaurant /></ProtectedRoute>} />
        //   <Route path='/list' element={<ProtectedRoute><List /></ProtectedRoute>} />
        //   <Route path='/edit/:id' element={<ProtectedRoute><Edit /></ProtectedRoute>} />
        //   <Route path='/visiteur' element={<ProtectedRoute><Visiteur /></ProtectedRoute>} />
        // </Routes>
//       </Card>

//         </Router>
//     </>
//   );
// }

// export default App;







