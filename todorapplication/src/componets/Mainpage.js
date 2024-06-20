import React, { useState, useEffect } from 'react';
import '../stylecss/main.css';
import { Link } from 'react-router-dom';

import { faEdit, faTrash, faHeart, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import IconButton from './IconButton';
import IconButton2 from './hearticon';

import { ipofserver } from '../global';
import axios from "axios";
import ModalForm from './ModalForm';
import Subtask from './Subtask';

export default function Mainpage() {
    const [todos, setTodos] = useState([]);
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








    useEffect(() => {
        const user_id = JSON.parse(localStorage.getItem('user'))[0];
        axios.get(`${ipofserver}gettodos/user?user_id=${user_id}`)
            .then(res => {
                // console.log(res.data)
                setTodos(res.data)
                // alert(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    const [formData, setFormData] = useState({
        input_todo: '',
        input_user: JSON.parse(localStorage.getItem('user'))[0],
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const clearInput = () => {
        setFormData({
            input_todo: '',
            input_user: '',
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.input_todo === '' || formData.input_user === '') {
            alert("Please enter all details!");
        } else {
            axios.post(ipofserver + 'addtodo', formData)
                .then(function (response) {
                    if (response.data === "success") {

                        alert(`task add succesfully!`);
                        clearInput();
                        window.location.href = '/home';

                    } else {
                        alert("Task already added by user!");
                        clearInput();
                    }
                })
                .catch(function (error) {
                    console.error('Error occurred during :', error);
                    alert("An error occurred during !");
                });
        }
    }


    // Handle dropdown change
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




    const [headerCheckboxes, setHeaderCheckboxes] = useState({
        ALL: false,
        COMPLETED: false,
        ON_HOLD: false
    });

    // Handle header checkbox changes
    const handleHeaderCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setHeaderCheckboxes(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };








    const [searchQuery, setSearchQuery] = useState('');
    // Filter todos based on search query
    const filteredTodos = todos.filter(todo =>
        todo[3].toLowerCase().includes(searchQuery.toLowerCase())


    );







    const handleSearchChange1 = (event) => {
        setSearchQuery(event.target.value);
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



    const [showModal, setShowModal] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);

    const handleEditClick = (todo) => {
        setCurrentTodo(todo);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentTodo(null);
    };



    const handleSubmitModal = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const response = await axios.post(ipofserver + 'addcategory', formData);

            if (response.data === "success") {
                alert('Add category successfully');
                handleCloseModal();
            } else {
                alert(`Failed to please try again!`);
            }
        } catch (error) {
            console.error('Failed to please try again!');

        }

        // Update the todo in your state here

        handleCloseModal();
    };


    const [showModal1, setShowModal1] = useState(false);
    const [currentTodo1, setCurrentTodo1] = useState(null);
    const [tableData, setTableData] = useState([]);

    const handleEditClick1 = (todo) => {
        setCurrentTodo1(todo);
        setShowModal1(true);
        fetchTableData(todo[2], todo[0]);
    };

    const handleCloseModal1 = () => {
        setShowModal1(false);
        setCurrentTodo1(null);
        setTableData([]);
    };

    const fetchTableData = (categoryId, todoid) => {

        const user_id = JSON.parse(localStorage.getItem('user'))[0];
        axios.get(`${ipofserver}getcatgory/user?user_id=${user_id}&categoryId=${categoryId}&todoid=${todoid}`)
            .then(response => {

                setTableData(response.data); // Assuming response.data is an array of table rows
            })
            .catch(error => {
                console.error('Error fetching table data:', error);
                // Handle error as needed
            });
    };


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Set the number of items per page
    const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    // Get the current items based on the current page
    const currentTodos = filteredTodos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    const [selectedItems1, setSelectedItems1] = useState({});
    const [selectAll1, setSelectAll1] = useState(false);
    const [filterCompleted, setFilterCompleted] = useState(false);
    const [filterOnHold, setFilterOnHold] = useState(false);

    const handleSelectAllChange1 = () => {
        setSelectAll(!selectAll);
    };

    const handleFilterCompletedChange = () => {
        setFilterCompleted(!filterCompleted);
    };

    const handleFilterOnHoldChange = () => {
        setFilterOnHold(!filterOnHold);
    };

    useEffect(() => {
        const newSelectedItems = {};
        if (selectAll) {
            filteredTodos.forEach(todo => {
                newSelectedItems[todo[0]] = true;
            });
        }
        setSelectedItems(newSelectedItems);
    }, [selectAll, filteredTodos]);



    const filteredBySelection = currentTodos.filter(todo => {
        if (selectAll1) return true;
        if (filterCompleted && todo[4] === 'Completed') return true;
        if (filterOnHold && todo[4] === 'In-Hold') return true;
        return selectedItems1[todo[0]];
    });

    


    return (
        <div>
            <div className="App mt-5">
                <h1 style={{ color: 'black' }}>WHAT DO YOU WANT TO DO TODAY?</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="searchbox-wrap">
                    <input type="text" id="input_todo" name="input_todo" value={formData.input_todo} onChange={handleChange} placeholder="Search for something..." />
                    <input type="text" id="input_todo" name="input_user" value={formData.input_user} onChange={handleChange} hidden />
                    <button type='submit'>
                        <span>Add</span>
                    </button>
                </div>
            </form>
            <div>
                <form className="search-container">
                    <input type="text" id="search-bar"
                        placeholder="search here ..."
                        value={searchQuery}
                        onChange={handleSearchChange1}
                    />
                    <Link to="#">
                        <img
                            className="search-icon"
                            src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
                            alt="Search"
                        />
                    </Link>
                </form>
            </div>


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
                                        checked={selectAll1}
                                        onChange={handleSelectAllChange1}
                                        style={{ width: '20px', height: '20px', transform: 'scale(1.5)', cursor: 'pointer', marginLeft: '20px' }}
                                    />
                                    <label htmlFor="checkAll" style={{ marginLeft: '10px', fontSize: '1.2rem' }}>Select All</label>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="checkAll"
                                        name="filterCompleted"
                                        checked={filterCompleted}
                                        onChange={handleFilterCompletedChange}
                                        style={{ width: '20px', height: '20px', transform: 'scale(1.5)', cursor: 'pointer', marginLeft: '20px' }}
                                    />
                                    <label htmlFor="checkAll" style={{ marginLeft: '10px', fontSize: '1.2rem' }}>Completed</label>
                                </label>
                                <label >
                                    <input
                                        type="checkbox"
                                        className="checkAll"
                                        name="filterOnHold"
                                        checked={filterOnHold}
                                        onChange={handleFilterOnHoldChange}
                                        style={{ width: '20px', height: '20px', transform: 'scale(1.5)', cursor: 'pointer', marginLeft: '20px' }}
                                    />
                                    <label htmlFor="checkAll" style={{ marginLeft: '10px', fontSize: '1.2rem' }}>On Hold</label>
                                </label>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {(filteredBySelection.length > 0 ? filteredBySelection : currentTodos).map((todo, index) => {
                        {/* {currentTodos.map((todo, index) => { */}
                            return <tr key={index}>

                                <td>

                                    <FontAwesomeIcon icon={faPlusCircle} size="3x" className="rounded-plus-icon" onClick={() => handleEditClick1(todo)} />

                                    <input type="checkbox" value={todo[0]}
                                        checked={selectedItems[todo[0]] || false}
                                        onChange={() => handleCheckboxChange(todo[0])} className='checkAll' name="item[]" />
                                    <label htmlFor="checkAll" style={{ marginLeft: '10px', fontSize: '1.2rem', color: 'black' }}>{todo[3]}</label>
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
                                    <IconButton icon={faEdit} size="3x" onClick={() => handleEditClick(todo)} />
                                    <IconButton icon={faTrash} size="3x" onClick={event => deleteButton(todo[0])} />
                                    <IconButton2 icon={faHeart} size="3x" todo={todo} onClick={event => favButtontodo(todo[0])} />
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>


            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>

            <ModalForm
                showModal={showModal}
                handleClose={handleCloseModal}
                handleSubmit={handleSubmitModal}
                todo={currentTodo || { name: '', status: 'In-progress' }}
            />

            <Subtask
                showModal={showModal1}
                handleClose={handleCloseModal1}
                todo={currentTodo1 || { name: '', status: 'In-progress', userId: '', categoryId: '' }}
                tableData={tableData}
            />
        </div >
    )
}
