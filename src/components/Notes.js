import { Close } from '@mui/icons-material';
import React, { useContext, useEffect, useState, } from 'react'
import { useNavigate } from "react-router-dom"
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes(props) {

    let navigate = useNavigate();

    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])

    const [showModal, setShowModal] = useState(false);
    const handleCancel = (e) => {
        setShowModal(false)
    }

    const updateNote = (currentNote) => {
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        setShowModal(!showModal)
    }

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const handleCLickUpdate = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        setShowModal(false)
        e.preventDefault();
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} mode={props.mode} />

            {/* Update Note Modal */}
            <div className='mt-6'>
                <div className={showModal ? `bg-gray-500/90 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none` : 'hidden'}>
                    <form className={`relative ${props.mode === 'dark' ? 'bg-[#322F3D] text-white' : 'bg-white text-gray-700'} shadow-md rounded p-3 md:p-6 mb-4 mx-2 w-full max-w-lg`} onSubmit={handleCLickUpdate}>
                        <span className='absolute top-0 right-0' onClick={handleCancel}><Close /></span>
                        <h1 className={`text-2xl text-center mb-4 font-bold ${props.mode === 'dark' ? ' text-amber-400' : ' text-gray-700'}`}>Edit Note</h1>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="title">
                                Title
                            </label>
                            <input className={`${props.mode === 'dark' ? 'bg-gray-300' : 'bg-gray-100'} text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight `} id="etitle" type="text" minLength={3} required placeholder="title" value={note.etitle} name='etitle' onChange={onChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea className={`${props.mode === 'dark' ? 'bg-gray-300' : 'bg-gray-100'} text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight `} id="edescription" type="text" rows="4" minLength={5} required name="edescription" placeholder="description" value={note.edescription} onChange={onChange} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold mb-2" htmlFor="tag">
                                Tag
                            </label>
                            <input className={`${props.mode === 'dark' ? 'bg-gray-300' : 'bg-gray-100'} text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight `} id="etag" type="text" name="etag" placeholder="tag" value={note.etag} onChange={onChange} />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-red-500 hover:bg-red-700 px-4 py-2 mr-2 rounded-md text-sm w-20 text-white font-semibold" onClick={handleCancel}>Close</button>

                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="submit" className="bg-indigo-500 hover:bg-indigo-700 px-4 py-2 ml-2 rounded-md text-sm w-20 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed" onClick={() => props.showAlert("Updated successfully!", "bg-green-200", "text-green-600", "Success")} >Update</button>
                        </div>
                    </form>
                </div>


                <h1 className={`${props.mode === 'dark' ? 'text-[#BB86FC]' : 'text-black'} text-2xl font-semibold pb-2 md:text-4xl text-center`}>Your Notes</h1>
                <div className='flex flex-wrap justify-center mt-4 break-words'>
                    <div className={`${props.mode === 'dark' ? 'text-red-300' : 'text-gray-600'}`}>{notes.length === 0 && 'No notes to display'}</div>
                    {notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} mode={props.mode} />;
                    })}

                </div>
            </div>
        </>
    )
}

export default Notes;