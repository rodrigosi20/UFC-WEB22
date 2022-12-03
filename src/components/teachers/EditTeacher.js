import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

import FirebaseContext from '../../utils/FirebaseContext'
import TeacherService from '../../services/TeacherService'

const EditTeacherPage = () => {
    return (
        <FirebaseContext.Consumer>
            {}
            {value => <EditTeacher firebase={value}/>}
        </FirebaseContext.Consumer>
    )
}


const EditTeacher = (props) => {

    const [name,setName] = useState('')
    const [course,setCourse] = useState('')
    const [wage,setWage] = useState(0.0)
    const navigate = useNavigate() 
    const params = useParams()

    useEffect(
        () => {
            TeacherService.retrive(
                props.firebase.getFirestoreDb(),
                (teacher)=>{
                    setName(teacher.name)
                    setCourse(teacher.course)
                    setWage(teacher.wage)
                },
                params.id
            )

        },
        []
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        const teacherUpdated = {name,course,wage}
        TeacherService.update(
            props.firebase.getFirestoreDb(),
            (result)=>{
                navigate('/listTeacher')
            },
            params.id,
            teacherUpdated
        )
    }

    return (
        <div style={{marginTop:20}}>
            <h2>Editar Professor</h2>

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        className='form-control'
                        placeholder='Digite seu nome'
                        value={(name === null || name === undefined)?'':name}
                        onChange={
                            (event)=>{
                                //console.log(event.target.value)
                                setName(event.target.value)
                            }
                        }
                    />
                </div>

                <div className='form-group'>
                    <label>Curso:</label>
                    <input 
                        type="text" 
                        className='form-control'
                        placeholder='Digite seu curso'
                        //{(course === null || course === undefined)?'':name} mesma coisa da linha 64
                        value={course ?? ''}
                        onChange={
                            (event)=>{
                                setCourse(event.target.value)
                            }
                        }
                    />
                </div>

                <div className='form-group'>
                    <label>Salário:</label>
                    <input 
                        type="number"
                        step='any'
                        className='form-control'
                        placeholder='Digite seu salário'
                        value={wage ?? 0.0}
                        onChange={
                            (event)=>{
                                setWage(event.target.value)
                            }
                        }
                    />
                </div>

                <div className='form-group' style={{marginTop:15}}>
                    <input 
                        type="submit" 
                        value="Editar Professor"
                        className='btn btn-primary'
                    />
                </div>
            </form>
        </div>
    )
}

export default EditTeacherPage