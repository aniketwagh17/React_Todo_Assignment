import React, { useState } from 'react'
import ToDoListView from './ToDoListView'

const TodoOperation = () => {
    const [todos, setTodos] = useState([])   // entire todo array
    const [inputValue, setInputValue] = useState('') // new todo value
    const [updateFlag,setUpdateFlag] = useState(false); // to check data is in update mode
    const [dataForUpdate,setDataForUpdate] = useState(''); // updated data access
    const [idforupdate,setIdForUpdate] = useState('');// updated data id
    const [colorFlag,setColorFlag] = useState(false);// to set color after update

    const addTodo = (e) => {
        e.preventDefault()
        // validation to prevent empty todo addition
        if(inputValue == ''){
            alert('Todo can not be blank !!!')
            return;
        }
        // adding todo to todo array
        setTodos([...todos, inputValue])
        // empty input value after successful addition
        setInputValue('');
        setColorFlag(false);
    }

    const updateTodo = (e) => {
  
        e.preventDefault();
        // validation to prevent empty todo updation
        if(inputValue == ''){
            alert('Todo can not be blank !!!')
            return
        }
        // updating specific elemnt in array
        todos[idforupdate] = inputValue;
        setTodos(todos);
        // empty input value after successful updation
        setInputValue('');
        // set flag to false after updation is complete
        setUpdateFlag(false);
        //for change of color et flag to true
        setColorFlag(true);
    }

    

    // this function will receive index from child component (TodoList) and apply array.filter to update todo list.
    const handle = (indexFromChild) => {
        // for handling delete condition
        if(localStorage.getItem("operation") == "Delete"){
            let newTodoList = todos.filter((item, index) => index !== indexFromChild)
            setTodos(newTodoList)   
        }else{
              // for handling update condition
            setUpdateFlag(true);
           setInputValue(todos[indexFromChild]);
           setIdForUpdate(indexFromChild)

        }
       
      
    }

    return (
        <div className='container'>
            <h3 className='text-center mt-3'>Add Your Todo</h3>
            <div className="input-group mb-3">
                {
                    !updateFlag ?  
                      <>  
                    <input type="text" className="form-control" placeholder='Enter your todo name...'
                    onChange={(e) => setInputValue(e.target.value)} value={inputValue} />

                    <button className='btn btn-outline-success' onClick={addTodo}>Add Todo</button> </>
                    :
                    <>
                    <input type="text" className="form-control" 
                    onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
                    <button className='btn btn-outline-success' onClick={updateTodo}>Update</button> </>
                }
                
            </div>
            <hr/>
            <div>
                <ToDoListView callback={handle} todos={todos} colorFlag = {colorFlag}/>
            </div>
        </div>
        
    )
}

export default TodoOperation