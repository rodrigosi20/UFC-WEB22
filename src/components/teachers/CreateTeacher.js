import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import FirebaseContext from '../../utils/FirebaseContext'
import TeacherService from '../../services/TeacherService'

//consumir o context
const CreateTeacherPage = () => {
    return (
        <FirebaseContext.Consumer>
            {/* conexao farebase */}
            {value => <CreateTeacher firebase={value}/>}
        </FirebaseContext.Consumer>
    )
}

const CreateTeacher = (props) => {

    const [name,setName] = useState('')
    const [course,setCourse] = useState('')
    const [wage,setWage] = useState(0.0)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const newTeachers = {name,course,wage}

        TeacherService.add(
            props.firebase.getFirestoreDb(),
            (id)=> {
                alert(`Professor ${id} adicionado!`)
                navigate('/listTeacher')
            },
            newTeachers
        )
    }

    return (
        <div style={{marginTop:20}}>
            <h2>Criar Professor</h2>

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        className='form-control'
                        placeholder='Digite seu nome'
                        onChange={
                            (event)=>{
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
                        value="Criar Professor"
                        className='btn btn-primary'
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateTeacherPage