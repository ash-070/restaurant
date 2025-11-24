import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import axios  from "axios";
export default function Edit(){
    const { id } = useParams()
    // console.log("this is id ",id)
    const [Inputs,setInputs]=useState({id:"",visiteur:"",passeport:"",tel:"",id:"",chambre:"",type:"",daysnumber:"",arrive:"",depart:"",prixnuit:""})
    const[Price,SetPrice]=useState("")
    console.log("this are inputs values",Inputs)
    // const[Nights,SetNights]=(0)
      const [user, setUser] = useState({
    Visiteur: "",
    Passeport: "",
    Tel: "",
    Chambre: "",
    Type: "",
    Prix : "",
    Arrive: "",
    Depart: "",
    Nights: "",
    Total: ""
  });
    //  function calculTotal(arrive,depart){
    //         if (!arrive || !depart) return 0;
    //         const newDatearrive = new Date(arrive)
    //         const newDatedepart = new Date(depart)
    //         const dateDiff=newDatedepart-newDatearrive
    //         const daysDiff=dateDiff/ (1000*60*60*24)
    //         return daysDiff
    //     }
      useEffect(() => {
    axios.get(`http://localhost/restaurant/connect.php?id=${id}`)
      .then((res) => {
        if (res.data.status === "success" && res.data.data.length > 0) {
          setUser(res.data.data[0]); 
        //   console.log(res.data.data[0])
        }
      })
      
  }, [id]);
  function HandleVisiteurChange(e){
    setInputs({...Inputs,visiteur:e.target.value})
  }
  function HandlePassportChange(e){
    setInputs({...Inputs,passeport:e.target.value})
  }
  function  HandleTelChange(e){
    setInputs({...Inputs,tel:e.target.value})
  }
  function HandleChambreChange(e){
    setInputs({...Inputs,chambre:e.target.value})
  }
  function HandleTypeChange(e){
    if(e.target.value==="Select Room Type"){
        SetPrice("select your chambre type first")
        // setInputs({...Inputs,type})
    }else if (e.target.value==="Single Room"){
        SetPrice("130")
        setInputs({...Inputs,type:e.target.value})
    }else if (e.target.value==="Double Room"){
        SetPrice("150")
        setInputs({Inputs,type:e.target.value})
    }else if(e.target.value==="Twin Room"){
        SetPrice("170")
        setInputs({Inputs,type:e.trget.value})
    }else if (e.target.value==="Triple Room"){
        SetPrice("200")
        setInputs({Inputs,type:e.target.value})
    }
  }
  function HandleArriveChange(e){
    setInputs({...Inputs,arrive:e.target.value})
  }
  function HandleDepartChange(e){
    setInputs({...Inputs,depart:e.target.value})
        // const nights =calculTotal(Inputs.arrive,e.target.value)
        // SetNights({...Nights,dayNumber:nights})
  }
//   console.log("the user 222",user)
  function handlebuttonclicked(){
    const te = {
    id:id,
    Visiteur: Inputs.visiteur,
    Passeport: Inputs.passeport,
    Tel: Inputs.tel,
    Chambre: Inputs.chambre,
    Type: Inputs.type,
    Prix : Price,
    Arrive: Inputs.arrive,
    Depart: Inputs.depart,
    Nights:user.Nights,
    Total: user.Total
  }
        alert("done")
        try{

          axios.put("http://localhost/restaurant/connect.php", te)
          
        }
      catch(error){
        console.log("this are the errors",error)
      }
  }
    return(
    <>
        <CardContent>
  <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 34 }}>
        your current Informations is 
        <p style={{ fontSize: "14px", margin: 0 }}>name : {user.Visiteur} | passeport : {user.Passeport} | tel : {user.Tel} 
           {" "} | chambre : {user.Chambre} | chambre type : {user.Type} <br></br>
        arrive : {user.Arrive} | depart : {user.Depart} | 
        </p>
        </Typography>
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            Visiteur :
            </Typography>
            <input style={{width:"60%"}} value={Inputs.visiteur} onChange={HandleVisiteurChange} type='text'/>   
        </div>
        
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div"  sx={{width:"40%"}}>
            Passeport :
            </Typography>
            <input style={{width:"60%"}} value={Inputs.passeport} onChange={HandlePassportChange} type='text'/>   
        </div>
        
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            Tel :
            </Typography>
            <input style={{width:"60%"}} value={Inputs.tel} onChange={HandleTelChange}  type='number'/>   
        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            Chambre :
            </Typography>
            <input style={{width:"60%"}} value={Inputs.chambre} onChange={HandleChambreChange} type='number'/>   
        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            Chambre Type :
            </Typography>
            <select value={Inputs.type} onChange={HandleTypeChange}>
                <option value="Select Room Type">-- Select Room Type --</option>
                <option value="Single Room">Single Room</option>
                <option value="Double Room">Double Room</option>
                <option value="Twin Room">Twin Room</option>
                <option value="Triple Room">Triple Room</option>
            </select>
        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            Prix Nuit : {Price}
            </Typography>
  

        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            Arrive :
            </Typography>
            <input style={{width:"60%"}} value={Inputs.arrive} onChange={HandleArriveChange}  type='date'/>   
        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
            Depart :
            </Typography>
            <input style={{width:"60%"}} value={Inputs.depart} onChange={HandleDepartChange} type='date'/>   
        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%",marginBottom:"5px"}}>
            <Typography variant="h5" component="div" sx={{width:"40%"}}>
                Number of nights :
                </Typography>
                <Typography variant="h5" component="div" sx={{width:"40%"}}>
                    
                 </Typography>
        </div>
        <button onClick={handlebuttonclicked}>save</button>
        <Box sx={{overflow:"auto",maxHeight:"190px"}}>
            {/* {UsersList} */}
        </Box>
        
        
        </CardContent>
    </>
    )
}