import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, onSnapshot } from 'firebase/firestore'

class TeacherService {

    static list = (firestoreDb,callback)=> {
        getDocs(collection(firestoreDb, 'teacher'))
        .then(
            (teacherSnapshot)=>{
                const teachers = []
                //Laço
                teacherSnapshot.forEach(
                    (teacher)=>{
                        const id = teacher.id
                        const {name,course,wage} = teacher.data()
                        teachers.push({id,name,course,wage})
                    }
                )
                callback(teachers)
            }
        )
        .catch(error=>console.log(error))
    }

    static list_on_snapshot = (firestoreDb,callback)=>{
        const q = query(collection(firestoreDb, 'teacher'))
        const unscribe = onSnapshot(
            q,
            (querySnaphot)=>{
                const teachers = []
                querySnaphot.forEach(
                    (document)=>{
                        const id = document.id
                        const{name,course,wage} = document.data()
                        teachers.push({id,name,course,wage})

                    }
                )
                callback(teachers)
            }
        )
    }

    static add = (firestoreDb, callback, teacher) => {
        addDoc(collection(firestoreDb, 'teacher'),teacher)
        .then(
            (docRef)=>{
                callback(docRef.id)
            }
        )
        .catch(error=>console.log(error))
    } 

    static retrive = (firestoreDb, callback, id) => {
        getDoc(doc(firestoreDb, 'teacher', id))
        .then(
            (docSnap)=>{
                if(docSnap.exists()){
                    callback(docSnap.data())
                }
            }
        )
        .catch(error=>console.log(error))
    }

    static update = (firestoreDb, callback, id, teacher) => {
        updateDoc(
            doc(firestoreDb, 'teacher', id),
            teacher)
        .then(
            ()=>{
                callback(true)
            }
        )
        .catch(error=>console.log(error))
    }

    static delete = (firestoreDb, callback, id) => {
        deleteDoc(doc(firestoreDb, 'teacher', id))
        .then(()=>callback(true))
        .catch(error=>console.log(error))
    }
}

    

export default TeacherService