import logo from './logo.svg';
import './App.css';
import React ,{useState, useEffect}from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [editValue, setEditValue] = useState('');

  const [currentTodo, UpdatedTodo ] = useState({});
  const [isEditMode, setEditMode ] = useState(false);

  //gaetting state through local storage
  const [list, updateList] = useState(() => {
    const savedTodos = localStorage.getItem("listData");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  //clidk handler
  const clickHandler =()=>{
if(inputValue.trim()){
  updateList(
    [...list, {
     name: inputValue.trim(),
     id:list.length+1,
     isEditable: false,
   }]
 )
 setInputValue('')
 }
} 

useEffect(()=>{
  setInputValue('')
},[])
 
  
useEffect(()=>{
  console.log("currentTodo",currentTodo)
  setEditValue( currentTodo?.name);
},[currentTodo])

//settimg the data into the local storage .

  useEffect(() => {
    localStorage.setItem("listData", JSON.stringify(list));
    
   let filterlist =  list.filter(data=>{
      return data.isEditable ==  true;
    })
    console.log("uuuu",filterlist)
    UpdatedTodo(filterlist[0]);
  }, [list])




  // delete Handler
  const deleteHandler =(dataId)=>{
    const finaldata = list.filter((data)=>{
      return data.id !== dataId
    })
    updateList(finaldata)
  }

  //edit handler

const editHandler = (dataId)=>{
  console.log("editHandler")
  const finaldataEdit = list.map((data)=>{
    return data.id == dataId ? {...data,isEditable:true}: {...data,isEditable:false};
  })
  setEditMode(true)
  updateList(finaldataEdit);
}


const updateHandler = ()=>{
    let newObj = {...currentTodo,name:editValue};
    console.log("newObj",newObj)
    const finaldataEdit = list.map((data)=>{
      return data.id == newObj.id ?{...newObj} : { ...data} ;
    })

    console.log("finaldataEdit",finaldataEdit)
    updateList(finaldataEdit);
    setEditMode(false)
}

  return(
    <div className='todoContainer'> 
      <div className='todoWrraper'>
        {isEditMode ?
          <div className='header'>
              <input type ="text" value = {editValue} onChange={(e)=>{setEditValue(e.target.value)}} />
              <button onClick = {updateHandler}>Update</button>
              <button onClick = {()=>setEditMode(false)}>Cancel</button>
          </div>
          :
          <div className='header'>
<FontAwesomeIcon icon="fa-solid fa-delete-left" />
            <input type ="text" value = {inputValue} onChange={(e)=>{setInputValue(e.target.value)}} />
            <button onClick = {clickHandler}>Submit</button>
          </div>
        }
      <ul>
          {list && list.map(data=>{
            return(
              <div className ="listItems" id ={data.id} >
                <li>{data.name}</li>
                <button onClick={()=>deleteHandler(data.id)}>Delete</button>
                <button onClick ={()=>editHandler(data.id)}>Edit</button>
                </div>
              )
          })}
      </ul>
    </div>
  </div>
 )
}

export default App;
