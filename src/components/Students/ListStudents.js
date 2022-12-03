import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import FirebaseContext from '../../utils/FirebaseContext'
import StudentService from '../../services/StudentService'

const ListStudentPage = () => {
    return (
        <FirebaseContext.Consumer>
            {value => <ListStudents firebase={value} />}
        </FirebaseContext.Consumer>
    )
}

const ListStudents = (props) => {

    const [students, setStudents] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(
        () => {
            StudentService.list_on_snapshot(
                props.firebase.getFirestoreDb(),
                (students) => {
                    //console.log(students)
                    setStudents(students)
                }
            )
        }
        ,
        []
    )

    function deleteStudentV2(id) {
        if (window.confirm('Deseja excluir?')) {
            StudentService.delete(
                props.firebase.getFirestoreDb(),
                ()=>{
                   let studentsTemp = students
                   for(let i=0;i<studentsTemp.length;i++){
                        if(studentsTemp[i].id===id){
                            studentsTemp.splice(i,1)
                            break
                        }
                   }
                   setStudents(studentsTemp)
                   setReload(!reload)
                },
                id
            )
        }
    }

    function deleteStudent(id) {
        if (window.confirm('Deseja excluir?')) {
            StudentService.delete(
                props.firebase.getFirestoreDb(),
                ()=>{
                    let studentsResult = students.filter(
                        (student)=>student.id !== id
                    )
                    setStudents(studentsResult)
                },
                id
            )
        }
    }

    const generateTableBody = () => {

        return students.map(
            (element, index) => {
                element.key = index
                return (
                    <tr>
                        <td>{element.id}</td>
                        <td>{element.name}</td>
                        <td>{element.course}</td>
                        <td>{element.ira}</td>
                        <td>
                            <Link to={'/editStudent/' + element.id} className='btn btn-primary'>
                                Editar
                            </Link>
                        </td>
                        <td>
                            <button className='btn btn-danger' onClick={() => deleteStudentV2(element.id)}>
                                Apagar
                            </button>
                        </td>
                    </tr>
                )
            }
        )
    }

    return (
        <div>
            <h1>Listar Estudante</h1>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Curso</th>
                        <th>IRA</th>
                        <th colSpan={2}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {generateTableBody()}
                </tbody>
            </table>
        </div>
    )
}

export default ListStudentPage