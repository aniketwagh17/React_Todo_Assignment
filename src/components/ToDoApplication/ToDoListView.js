import React from 'react'
import { useState } from 'react';

const ToDoListView = ({callback, todos, colorFlag}) => {
    
    const onDeleteTrigger = index => {
        localStorage.setItem("operation","Delete");
        callback(index);
    }

    const onUpdateTrigger = index => {
        localStorage.setItem("operation","Update");
        callback(index);
    }

    return (
        <div className='mt-3'>
            <h5>Your Todo List : </h5>
            <ul className='list-group'>
                {
                    todos.map((value, i) => {
                        
                        return <li key={i} className='list-group-item d-flex justify-content-between'>
                            {    
                                !colorFlag ? 
                                <>
                                <div className= "text-secondary fw-bold mb-0" > {value} </div>
                                </>
                                : <p className= "text-success fw-bold mb-0" > {value} </p>
                            }

                                    <div className='btn-group'>
                                    <button className='btn btn-success btn-sm' onClick={() => onUpdateTrigger(i)}>
                                        Edit
                                    </button>
                                    <button className='btn btn-danger btn-sm' onClick={() => onDeleteTrigger(i)}>
                                        Delete
                                    </button>
                                    </div>

                                </li>
                    })
                }
            </ul>
            
        </div>

    )
}


export default ToDoListView