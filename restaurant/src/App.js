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
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
       <Card sx={{minHeight:"400px",marginTop:"30px",marginLeft:"320px",maxWidth:"700px",backgroundColor: "rgba(255, 255, 255, 0.9)"}}>
            <Stack sx={{marginLeft:"185px", marginTop:"15px"}} spacing={2} direction="row">
                 <Link to={'/visiteur'}>
                    <Button variant="contained">Visiteur</Button>
                  </Link> 
                 <Link to={'/reservation'}>
                    <Button variant="contained">Reservation</Button>
                  </Link> 

                  <Link to={'/list'}>
                     <Button variant="contained">Reservation List</Button>
                   </Link>
            </Stack>
          {/* <Restaurant/> */}
        <Routes>
       
           <Route path='/reservation' element={<Restaurant />} />
          <Route path='/list' element={<List/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
          <Route path='/visiteur' element={<Visiteur/>}/>
        </Routes>
      </Card>

        </Router>
    </>
  );
}

export default App;
