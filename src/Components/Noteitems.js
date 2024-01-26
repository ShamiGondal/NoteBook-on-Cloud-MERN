import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext"

const Noteitems = (props) => {

    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (<div className="container  px-5 ">
        <div className="col-md-12">
            <div className="card my-3 bg-dark text-light ">
                <div className="card-body  ">
                    <div className="d-flex align-items-center justify-content-between  ">
                       <div className="">
                        <h5 className="card-title  ">{note.title}</h5>
                        </div>
                        <div className="">
                            <button className="btn border-none "><i className="fa-solid fa-pen-to-square  text-primary pointer-event" onClick={() => { updateNote(note) }} ></i></button>
                            <button className="btn border-none "><i className="fa-solid fa-trash text-danger" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success") }}></i></button>
                        </div>
                    </div>
                    <p className="card-text ">{note.description}</p>
                    <p className="card-text  ">{note.tag}</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Noteitems;