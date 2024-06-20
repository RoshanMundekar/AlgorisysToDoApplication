import React, { useState, useEffect } from 'react';
import '../stylecss/main.css';


import { faEdit, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';

import IconButton from './IconButton';
import IconButton2 from './hearticon';

import { ipofserver } from '../global';
import axios from "axios";


export default function Favourateitems() {
    const [todos, setTodos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Filter todos based on search query
    const filteredTodos = todos.filter(todo =>
        todo[3].toLowerCase().includes(searchQuery.toLowerCase())


    );
    
    useEffect(() => {
        const user_id = JSON.parse(localStorage.getItem('user'))[0];
        axios.get(`${ipofserver}getfav/user?user_id=${user_id}`)
            .then(res => {
                // console.log(res.data)
                setTodos(res.data)
                // alert(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectAll, setSelectAll] = useState(false);

    // Handle Select All checkbox change
    const handleSelectAllChange = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        const newSelectedItems = {};
        todos.forEach(todo => {
            newSelectedItems[todo[0]] = newSelectAll;
        });
        setSelectedItems(newSelectedItems);
    };


    // Handle individual checkbox change
    const [selectedItems, setSelectedItems] = useState({});
    const handleCheckboxChange = (id) => {
        const newSelectedItems = { ...selectedItems, [id]: !selectedItems[id] };
        setSelectedItems(newSelectedItems);
    };


    const handleFilterChange = (event) => {
        alert(event.target.value);
    };
    const handleFilterChange1 = async (event, todo) => {
        // alert(`Selected value: ${event.target.value}, Todo: ${todo}`);
        axios.post(ipofserver + 'changeStatusTodo', {
            idoftodo: todo,
            status: event.target.value,
        })
            .then(function (response) {
                alert('Task Todo status updated successfully!')
                window.location.href = '/home';
            })
            .catch(function (error) {
                return error;
            });


    };


    const deleteButton = (id) => {
        axios.post(ipofserver + 'deleteTodo', {
            idoftodo: id,
        })
            .then(function (response) {
                alert('Task deleted!')
                window.location.href = '/home';
            })
            .catch(function (error) {
                return error;
            });
    }

    const favButtontodo = (id) => {

        axios.post(ipofserver + 'favtodo', {
            idoftodo: id,
        })
            .then(function (response) {
                alert('Add favourate task!')
                window.location.href = '/home';

            })
            .catch(function (error) {
                return error;
            });
    }




    return (
        
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" className="checkAll" checked={selectAll}
                                onChange={handleSelectAllChange} name="checkAll" style={{ width: '20px', height: '20px', transform: 'scale(1.5)', cursor: 'pointer', marginLeft: '20px' }} />
                            <label htmlFor="checkAll" style={{ marginLeft: '10px', fontSize: '1.2rem' }}>Select All</label>
                        </th>
                        <th>
                            <div className="dropdown-container">
                                <select value={selectedFilter} onChange={handleFilterChange} >
                                    <option value="Completed">Completed</option>
                                    <option value="In-progress">In-progress</option>
                                    <option value="In-Hold">In-Hold</option>
                                </select>
                            </div>
                        </th>
                        <th>

                            <label >
                                <input
                                    type="checkbox"
                                    className="checkAll"
                                    name="checkAll"
                                    style={{ width: '20px', height: '20px', transform: 'scale(1.5)', cursor: 'pointer', marginLeft: '20px' }}
                                />
                                <label htmlFor="checkAll" style={{ marginLeft: '10px', fontSize: '1.2rem' }}>Select All</label>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    className="checkAll"
                                    name="checkAll"
                                    style={{ width: '20px', height: '20px', transform: 'scale(1.5)', cursor: 'pointer', marginLeft: '20px' }}
                                />
                                <label htmlFor="checkAll" style={{ marginLeft: '10px', fontSize: '1.2rem' }}>Completed</label>
                            </label>
                            <label >
                                <input
                                    type="checkbox"
                                    className="checkAll"
                                    name="checkAll"
                                    style={{ width: '20px', height: '20px', transform: 'scale(1.5)', cursor: 'pointer', marginLeft: '20px' }}
                                />
                                <label htmlFor="checkAll" style={{ marginLeft: '10px', fontSize: '1.2rem' }}>On Hold</label>
                            </label>
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {filteredTodos.map((todo, index) => {
                        return <tr>
                            <td><input type="checkbox" value={todo[0]}
                                checked={selectedItems[todo[0]] || false}
                                onChange={() => handleCheckboxChange(todo[0])} className='checkAll' name="item[]" />
                                <label htmlFor="checkAll" style={{ marginLeft: '10px', fontSize: '1.2rem' }}>{todo[3]}</label>
                            </td>
                            <td>
                                <div className="dropdown-container">
                                    <select value={todo[4]} onChange={(event) => handleFilterChange1(event, todo[0])}>
                                        <option value="Completed">Completed</option>
                                        <option value="In-progress">In-progress</option>
                                        <option value="In-Hold">In-Hold</option>
                                    </select>

                                </div>
                            </td>
                            <td>
                                <IconButton icon={faEdit} size="3x" />
                                <IconButton icon={faTrash} size="3x" onClick={event => deleteButton(todo[0])} />
                                <IconButton2 icon={faHeart} size="3x" todo={todo} onClick={event => favButtontodo(todo[0])} />
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

