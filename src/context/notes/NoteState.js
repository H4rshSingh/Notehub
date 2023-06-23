import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // const host = "http://localhost:5000";
  const host = "https://notehub.onrender.com";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //  Get all Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json);
  }


  //  Add a Note
  const addNote = async (title, description, tag) => {
    props.setProgress(30);
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    props.setProgress(100);
    const note = await response.json();
    setNotes(notes.concat(note));
    props.showAlert("Note has been addded successfully!", "bg-green-200", "text-green-600", "Success")
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // Api calls
    props.setProgress(10);
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    props.setProgress(30);
    await response.json();
    props.setProgress(70);
    const newNotes = notes.filter((note) => { return note._id !== id })
    props.setProgress(100);
    setNotes(newNotes)
  }


  // editNote a Note
  const editNote = async (id, title, description, tag) => {
    // Api calls
    props.setProgress(10);
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    props.setProgress(30);
    await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    props.setProgress(70);
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    props.setProgress(100);
    setNotes(newNotes)
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>

  )
}

export default NoteState;