import { Delete, Edit } from '@mui/icons-material';
import noteContext from '../context/notes/noteContext';
import React, { useContext, useState } from 'react'

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    const [confirmDelete, setConfirmDelete] = useState(false)
    const handleConfirmDelete = ()=>{
        setConfirmDelete(!confirmDelete);
    }

    return (
        <>
            <div className={`box-border relative mx-2 my-4 p-2 max-w-sm rounded overflow-hidden shadow-md  ${props.mode === 'dark' ? 'shadow-amber-500 bg-[#041C32]' : 'shadow-gray'} pb-6`}>
                <div className="px-2 md:px-6 text-sm md:text-base py-4">
                    <h1 className={`${props.mode === 'dark' ? 'text-red-500' : 'text-orange-600'} font-bold text-lg md:text-xl mb-2`}>{note.title}</h1>
                    <p className={`${props.mode === 'dark' ? 'text-white' : 'text-lime-900-900'}`}>{note.description}</p>

                    <p className={`rounded mt-6 p-1 inline-block font-semibold ${props.mode === 'dark' ? 'bg-green-200  text-black' : 'text-gray-700 bg-green-200 '}`}><small className="text-xs">{note.tag}</small></p>

                    <div className='absolute bottom-0 right-0 p-2'>
                        <span className=' cursor-pointer p-1 hover:bg-slate-200' onClick={() => (updateNote(note))}><Edit fontSize="small" color="primary" /></span>
                        <span className=' cursor-pointer p-1 hover:bg-slate-200' onClick={handleConfirmDelete}><Delete fontSize="small" color="error" /></span>
                    </div>
                </div>
            </div>
            <div className={confirmDelete ?`bg-gray-500/90 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none` : 'hidden'}>
                <div className={`${props.mode==='dark'? 'bg-[#322F3D] text-white' : 'bg-white text-gray-700'} p-10 rounded-md text-center`}>
                    <h1 className="text-xl mb-4 font-bold">Do you want to Delete ?</h1>

                    <button className="bg-red-500 hover:bg-red-700 px-4 py-2 mr-2 rounded-md text-xs w-20 text-white font-semibold"  onClick={handleConfirmDelete}>Cancel</button>

                    <button className="bg-indigo-500 hover:bg-indigo-700 px-4 py-2 ml-2 rounded-md text-xs w-20 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"  onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully!", "bg-green-200", "text-green-600", "Success") }}>Confirm</button>
                </div>
            </div>
                    
        </>
    )
}

export default NoteItem;