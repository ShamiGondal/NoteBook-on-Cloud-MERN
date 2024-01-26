import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext"
import myimage from '../assests/bannerimage.png'

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Successfully", "success")
    }
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return <>
        <div className="container-fluid  ">
            <div className="text-center">
                <lord-icon
                    src="https://cdn.lordicon.com/oqyaxvft.json"
                    trigger="hover"
                    style={{width:'100px' ,height: '100px'}}>
                </lord-icon>
            </div>
            <h3 className='text-center pb-5 fw-bold fs-2 '>
                Welcome to your <span className='text-primary'>INoteBook</span>
            </h3>

            <div className="container bg-dark p-md-5 text-light p-3 py-5 shadow-lg rounded-5  w-100  my-3">
                <div className="row">
                    <div className="col ">
                        <h3 className='text-center'>Add Notes</h3>
                        <div className="my-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title" onChange={handleChange} value={note.title} minLength={5} required placeholder="Title" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description" onChange={handleChange} value={note.description} minLength={5} required rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <textarea className="form-control" id="tag" name="tag" onChange={handleChange} value={note.tag} minLength={3} rows="1"></textarea>
                        </div>
                        <div className="">
                            <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary mb-3" onClick={handleClick}>Add Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default AddNote;