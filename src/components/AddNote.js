import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="w-full px-2 max-w-6xl m-auto ">
            <h1 className={`${props.mode==='dark'? 'text-white' : 'text-black'} text-xl font-semibold pb-2 md:text-4xl`}>Add a Note</h1>
            <form className={`${props.mode==='dark'? 'bg-[#322F3D] text-white' : 'bg-white text-gray-700'} shadow-md rounded p-3 md:p-6 mb-4`} onSubmit={handleAddNote}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="title">Title</label>
                    <input className={`${props.mode==='dark'? 'bg-gray-300 ' : 'bg-gray-100'} text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight`} id="title" type="text" placeholder="title" name='title' value={note.title} minLength={3} required onChange={onChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="description">Description</label>

                    <textarea className={`${props.mode==='dark'? 'bg-gray-300' : 'bg-gray-100'} text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight `} id="description" type="text" rows="4" name="description" value={note.description} minLength={5} required placeholder="description" onChange={onChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="tag">Tag</label>
                    <input className={`${props.mode==='dark'? 'bg-gray-300' : 'bg-gray-100'} text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight`} id="tag" type="text" name="tag" placeholder="tag" value={note.tag} onChange={onChange} />
                </div>
                <div className="flex items-center justify-between">
                    {/* <button disabled={note.title.length < 3 || note.description.length <5} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-60 disabled:cursor-not-allowed" onClick={() => props.showAlert("Note has been addded successfully!", "bg-green-200", "text-green-600", "Success") }>Add Note</button> */}
                    <button disabled={note.title.length < 3 || note.description.length <5} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-60 disabled:cursor-not-allowed" >Add Note</button>
                </div>
            </form>
        </div>
    )
}

export default AddNote