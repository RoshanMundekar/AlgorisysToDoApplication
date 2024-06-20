import React from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from './IconButton';
import { ipofserver } from '../global';
import axios from "axios";
import '../stylecss/Subtask.css';
const Subtask = ({ showModal, handleClose, todo, tableData }) => {
    if (!showModal) {
        return null;
    }

    const deleteButton1 = (id) => {
        axios.post(ipofserver + 'deleteTodocat', {
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


    const handleFilterChange2 = async (event, todo) => {
        // alert(`Selected value: ${event.target.value}, Todo: ${todo}`);
        axios.post(ipofserver + 'changeTodocat', {
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

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2 style={{ color: 'black' }}>show Subtasks</h2>
                    <button onClick={handleClose} className="close-button">&times;</button>
                </div>

                <tbody>

                    {tableData.map((todo, index) => {
                        return <tr>

                            <td>
                                <input type="checkbox" value={todo[0]}
                                    className='checkAll' name="item[]" />
                                <label htmlFor="checkAll" style={{ marginLeft: '10px', fontSize: '1.2rem',color: 'black' }}>{todo[5]}</label>
                            </td>
                            <td>
                                <div className="dropdown-container"  style={{ marginLeft: '200px', fontSize: '1.2rem',color: 'black' }}>
                                    <select value={todo[6]} onChange={(event) => handleFilterChange2(event, todo[0])}>
                                        <option value="Completed">Completed</option>
                                        <option value="In-progress">In-progress</option>
                                        <option value="In-Hold">In-Hold</option>
                                    </select>

                                </div>
                            </td>
                            <td>
                                <div  style={{ marginLeft: '190px', fontSize: '1.2rem',color: 'black' }}>
                                <IconButton icon={faEdit} size="3x"  />
                                <IconButton icon={faTrash} size="3x" onClick={event => deleteButton1(todo[0])} />
                                </div>
                               
                            </td>
                        </tr>
                    })}
                </tbody>




            </div>
        </div>
    );
};

export default Subtask;
