import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitems from './Noteitems';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    let navigate = useNavigate()
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    useEffect(() => {
        const authtoken = localStorage.getItem('token')
        if (!authtoken) {
            navigate("/login")
        } else {
            getNotes()
        }
        // eslint-disable-next-line  
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        e.preventDefault();
        refClose.current.click();
        props.showAlert("Updated Successfully", "success")

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='p-4'>
            <AddNote showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="my-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required placeholder="Title" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required rows="3"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <textarea className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} rows="1"></textarea>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3 mt-5 bg-white rounded-5 shadow-lg p-md-5 p-lg-5 py-5">
                <h2 className='fw-bold'>
                    <lord-icon
                        src="https://cdn.lordicon.com/jtypwtfq.json"
                        trigger="hover"
                        style={{ width: '40px', height: '40px'}}>
                    </lord-icon>
                    Your Notes</h2>
                <div className="container mx-2   ">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {Array.isArray(notes) && notes.map((note) => {
                    return <Noteitems key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </div>
    )
}

export default Notes