import { collection, addDoc } from "firebase/firestore";
//resources
import { db } from "../firebase/conection";

export const saveData = async(nameCollection, data)=>{
  try {
    const res = await addDoc(collection(db, nameCollection), data)
    return res
  } catch (error) {
    return error
  }
} 