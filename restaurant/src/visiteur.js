import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export default function Visiteur() {
    const [visiteur,SetVisiteur]=useState({name:"",passport:""})
    function HandleCodeChange(e){
        SetVisiteur({...visiteur,passport:e.target.value})
    }
    function HandleNameChange(e){
        SetVisiteur({...visiteur,name:e.target.value})
    }
console.log(visiteur)

async function sendToServer(data) {
    try {
        const response = await fetch("http://localhost/restaurant/visiteur.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await response.json();
       
        
    } catch (error) {
       
    }}
    return (
        <>
            <h1>visiteur page</h1>
            <label>name : </label>
            <input value={visiteur.name} onChange={HandleNameChange} type="text"/>
            <label>code : </label>
            <input value={visiteur.passport} onChange={HandleCodeChange} type="text"/>
            <button onClick={()=>{
                const newVisiteur={
                    name:visiteur.name,
                    code:visiteur.passport,
                    id:uuidv4()
                }
                sendToServer(newVisiteur)
                alert("khdam ")
                SetVisiteur({name:"",passport:""})
            }}>save</button>
        </>
    )
}