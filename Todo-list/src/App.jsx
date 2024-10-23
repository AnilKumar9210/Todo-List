import { useState , useRef} from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo,setTodo] = useState ("")
  const [todoList,setTodoList] = useState ([])
  const finishedRef = useRef ("none")
  const unFinishedRef = useRef ("block")
  const [finishedList,setFinishedList] = useState ([])

  
  const handleChange = (e)=> {
    setTodo (e.target.value)
  }

  const handleSave = ()=> {
    setTodoList ([...todoList,{id:uuidv4(),todo,isCompleted:false}])
    setTodo (" ")
  }

  const handleEdit = (id)=> {
    let t = todoList.filter ((i)=>i.id === id)
    setTodo (t[0].todo)
    let newTodos = todoList.filter ((item)=> {
      return item.id !== id
    })
    setTodoList (newTodos)
  }
  const handleDelete = (id)=> {
    let newTodos = todoList.filter (item=> {
      return item.id !== id;
    })
    setTodoList (newTodos)
  }

  const handleCompleted = (id)=> {
    let t = todoList.filter (i=>i.id === id);
    if (!t[0].isCompleted) {
      let newTodos = todoList.filter (item=> {
        return item.id !== id;
      })
      t[0].isCompleted= true;
      setFinishedList (t);
      setTodoList (newTodos)
    }
  }

  
  return (
   <>
    <Navbar/>
    <section className="todoArea">
      <div className="create">
     <h1>Add Your Todo's Here</h1>
        <div className="addTodo">
          <input className='typeHere' onChange={handleChange}  type="text" value={todo}  />
          <button className='btn' onClick={handleSave}>Save</button>
        </div>
      </div>
      <div className="AllTodos">
        <h1>Your Todos</h1>
        {todoList.map ((item)=> {
          return<div key={item.id} className="todoList" id={unFinishedRef.current}>
        <div className="check">
          <input type="checkbox" onChange={()=>{handleCompleted (item.id)}} />
          <div className="todo">{item.todo}</div>
        </div>
        <div className="mutate">
          <button className="btn"onClick={(e)=>{handleEdit(item.id)}}>Edit</button>
          <button className="btn" onClick={(e)=>{handleDelete(item.id)}}>Delete</button>
        </div>
      </div>
      })}
      
      </div>
    </section>
   </>
  )
}

export default App
