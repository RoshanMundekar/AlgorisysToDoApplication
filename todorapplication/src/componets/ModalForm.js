import React from 'react';
import '../stylecss/ModalForm.css'; // Import the CSS file for styling

const ModalForm = ({ showModal, handleClose, handleSubmit, todo }) => {
    if (!showModal) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2 style={{ color: 'black' }}>Adding Subtasks</h2>
                    <button onClick={handleClose} className="close-button">&times;</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label style={{ color: 'black' }}>TITLE</label>
                            <input type="text" defaultValue={todo[3]} name="name" required readOnly/>
                        </div>
                        <div className="form-group">
                            <label style={{ color: 'black' }}>CATEGORY</label>
                            <input type="text" id='newtask' name="newtask" required />
                        </div>
                        
                        <input type="text" id='Categoryid' defaultValue={todo[2]} name="Categoryid" required hidden/>
                        <input type="text" id='Userid' defaultValue={todo[1]} name="Userid" required hidden/>
                        <input type="text" id='todo_id' defaultValue={todo[0]} name="todo_id" required hidden/>
                       
                        <div className="modal-footer">
                            <button type="submit" className="submit-button">SUBMIT</button>
                            <button type="button" onClick={handleClose} className="cancel-button">RESET</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalForm;
