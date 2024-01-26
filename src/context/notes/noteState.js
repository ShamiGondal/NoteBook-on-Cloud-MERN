import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000"
  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes)
  //Fetch all  Note

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnote`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const json = await response.json(); // Note the added () at the end
      setNotes(json);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };
  
  //ADD Note

  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json()
    setNotes(notes.concat(note))

   
  }

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    // const json = await response.json();
    // console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
      console.log(notes)
        setNotes(newNotes)
    }

  }
  //Delete Note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    // const json = await response.json();
    // console.log(json)
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;