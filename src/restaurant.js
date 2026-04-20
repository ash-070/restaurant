import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Restaurant(){
    const x=0
    const [Inputs,setInputs]=useState({id:"",visiteur:"",passeport:"",tel:"",id:"",chambre:"",type:"",daysnumber:"",arrive:"",depart:"",prixnuit:""})
    const [Days,setDays]=useState({arrive:"",depart:"" ,dayNumber:""})
   const [Users,setUsers]=useState([])
   const [prix,setprix]=useState("")
// console.log(Inputs)
    function handlepasseportchange(e){
        setInputs({...Inputs,passeport:e.target.value})
    }
    function handlevisiteurchange(e){
        setInputs({...Inputs,visiteur:e.target.value})
    }
    function handletelchange(e){
        setInputs({...Inputs,tel:e.target.value}
        
        )}
    function handlechambrechange(e){
        setInputs({...Inputs,chambre:e.target.value})
    }
    function handlearrivechange(e){
        setInputs({...Inputs,arrive:e.target.value})
       setDays({...Days,arrive:e.target.value})
    }
    function handledepartchange(e){
        setInputs({...Inputs,depart:e.target.value})
        
        const nights =calculTotal(Inputs.arrive,e.target.value)
        setDays({...Days,dayNumber:nights})

    }
    function handletypechange(e){
        setInputs({...Inputs,type:e.target.value})
        if(e.target.value==="Single Room"){
            setprix(130)
            // setInputs({...Inputs,prix:130})
        }else if (e.target.value==="Double Room"){
            setprix(150)
        // setInputs({...Inputs,prix:150})
        }else if (e.target.value==="Twin Room"){
            setprix(170)
            // setInputs({...Inputs,prix:170})
        }
        else if (e.target.value==="Triple Room"){
            setprix(200)
            // setInputs({...Inputs,prix:200})
        }else if(e.target.value==="Select Room Type"){
            setprix("Select room type first")
        }
    }
async function sendToServer(data) {
    try {
const response = await fetch("http://127.0.0.1:8000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
        const result = await response.json();
       
        
    } catch (error) {
       
    }
}

        function handlebuttonclicked(){
           const newUser={
            // name:Inputs.visiteur,
            // age:Inputs.id,
            // prix: Number(prix),
            // daysnumber:Number(Days.dayNumber),
            // id:Date.now()


            visiteur: Inputs.visiteur,
            passeport: Inputs.passeport,
            tel: Inputs.tel,
            chambre: Inputs.chambre,
            type: Inputs.type,
            arrive: Inputs.arrive,
            depart: Inputs.depart,
            prix: Number(prix),
            daysnumber: Number(Days.dayNumber),
            id:uuidv4()
            }
            
            sendToServer(newUser);

    //    console.log("this is new user", newUser)
           const Updated=[...Users,newUser]
           setUsers(Updated)
           setInputs({visiteur:"",passeport:"",tel:"",id:"",chambre:"",type:"",daysnumber:"",arrive:"",depart:"",prixnuit:""})
        
        }
        function calculTotal(arrive,depart){
            if (!arrive || !depart) return 0;
            const newDatearrive = new Date(arrive)
            const newDatedepart = new Date(depart)
            const dateDiff=newDatedepart-newDatearrive
            const daysDiff=dateDiff/ (1000*60*60*24)
            return daysDiff
        }

    const UsersList=Users.map((user)=>{
        // console.log(user.daysnumber,user.prix)
        console.log("this is user",user)
        return <div key={user.id}><p>hello {user.visiteur} your total price is {user.prix*user.daysnumber} DH</p></div>
    })
    // console.log("this is user list 2",UsersList)
    return(
    <>
    

            <CardContent>
        <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 34 }}>
        Hotel 
        </Typography>
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            Visiteur :
            </Typography>
            <input style={{width:"60%"}} value={Inputs.visiteur} onChange={handlevisiteurchange} type='text'/>   
        </div>
        
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div"  sx={{width:"40%"}}>
            Passeport :
            </Typography>
            <input style={{width:"60%"}} value={Inputs.passeport} onChange={handlepasseportchange}  type='text'/>   
        </div>
        
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            Tel :
            </Typography>
            <input style={{width:"60%"}} value={Inputs.tel} onChange={handletelchange} type='number'/>   
        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            Chambre :
            </Typography>
            <input style={{width:"60%"}} value={Inputs.chambre} onChange={handlechambrechange} type='number'/>   
        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            Chambre Type :
            </Typography>
            <select value={Inputs.type} onChange={handletypechange}>
                <option value="Select Room Type">-- Select Room Type --</option>
                <option value="Single Room">Single Room</option>
                <option value="Double Room">Double Room</option>
                <option value="Twin Room">Twin Room</option>
                <option value="Triple Room">Triple Room</option>
            </select>
        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            Prix Nuit :
            </Typography>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            
            {/* {console.log(prix)} */}
          
            {
            prix=="Select room type first"?"":`${prix} DH`
            }
            </Typography>

        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            Arrive :
            </Typography>
            <input style={{width:"60%"}} value={Inputs.arrive} onChange={handlearrivechange} type='date'/>   
        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            Depart :
            </Typography>
            <input style={{width:"60%"}} value={Inputs.depart} onChange={handledepartchange} type='date'/>   
        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
                Number of nights :
                </Typography>
                <Typography variant="h5" component="div" sx={{width:"40%"}}>
                    {Days.dayNumber}
                 </Typography>
        </div>
        <button onClick={handlebuttonclicked}>save</button>
        <Box sx={{overflow:"auto",maxHeight:"190px"}}>
            {UsersList }
        </Box>
        
        
        </CardContent>
        <CardActions>
        
        </CardActions>
    
    </>
    )
    }