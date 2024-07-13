import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import ArrowLeft from '../components/ArrowLeft'

const NotePage = ({ history }) => {
    let params = useParams()
    let noteId = params.id

    let [note, setNote] = useState({})
    let navigate = useNavigate()

    useEffect(()=>{
        if(noteId!=='new') getNote()
    }, [])

    let getNote = async ()=>{
        let response = await fetch(`http://13.233.157.119:8004/notes/${noteId}`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async ()=>{
        await fetch(`http://13.233.157.119:8004/notes/`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let updateNote = async ()=>{
        await fetch(`http://13.233.157.119:8004/notes/${noteId}`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let deleteNote = async ()=>{
        await fetch(`http://13.233.157.119:8004/notes/${noteId}`, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({...note})
        })
        navigate('/')
    } 

    let handleSubmit = ()=>{
        if(noteId!='new' && !note.body ){
            deleteNote()
        }else if(noteId!='new'){
            updateNote()
        }else if(noteId=='new' && !note.body){
            navigate('/')
        }else if (noteId === 'new' && note !== null) {
            createNote()
        }
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to="/" onClick={handleSubmit}>
                        <ArrowLeft />
                    </Link>
                </h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote} >Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea value={note.body} onChange={(e)=> { setNote({...note, 'body':e.target.value}) }}></textarea>
        </div>
    )
}

export default NotePage