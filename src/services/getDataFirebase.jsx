import { db } from "../firebase/conection";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export const getOneDoc = async(collection, id)=>{
  const res = getDoc(doc(db, collection, id))
  return res
}

//get multiple data from firebase
export const getParentsFromFirebase = async()=>{
  const parents = []
  const q = await query(collection(db, 'user'), where('permissions', '==', 'parents'))
  const res = await getDocs(q)
  res.forEach(doc=>{
    const user = {...doc.data(), id: doc.id}
    parents.push(user);
  })
  return parents
}

export const getMultipeDataWithCondition = async(collectionName, key, condition, value)=>{
  const resArray = []
  const q = await query(collection(db, collectionName), where( key, condition, value))
  const res = await getDocs(q)
  res.forEach(doc=>{
    const element = {...doc.data(), id: doc.id}
    resArray.push(element);
  })
  return resArray
}

export const getListTeacherForMessage = async(level, section)=>{
  const resArray = []
  const q = await query(collection(db, 'course'), 
  where( 'grado', '==', level),
  where( 'seccion', '==', section))
  const res = await getDocs(q)
  res.forEach(doc=>{
    const element = {...doc.data(), id: doc.id}
    resArray.push(element);
  })
  return resArray
}
export const getListParentsForMessage = async(level, section)=>{
  const resArray = []
  const q = await query(collection(db, 'student'), 
  where( 'level', '==', level),
  where( 'section', '==', section))
  const res = await getDocs(q)
  res.forEach(doc=>{
    const element = {...doc.data(), id: doc.id}
    resArray.push(element);
  })
  return resArray
}
// export const getListParentsAndTeachersForMessage = async()=>{
//   const resArray = []
//   const q = await query(collection(db, 'user'), 
//   where( 'permissions', '==', 'parents'),
//   where( 'permisions', '==', 'teacher'))
//   const res = await getDocs(q)
//   res.forEach(doc=>{
//     const element = {...doc.data(), id: doc.id}
//     resArray.push(element);
//   })
//   return resArray
// }

export const getMessagesToUser = async(idUser, statusMessage)=>{
  const resArray = []
  const q = await query(collection(db, 'messages'), where('toUser','==', idUser), where('statusMessage', '==', statusMessage))
  const res = await getDocs(q)
  res.forEach(doc=>{
    const element = {...doc.data(), id: doc.id}
    resArray.push(element);
  })
  return resArray
}