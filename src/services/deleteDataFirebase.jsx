import { db } from "../firebase/conection";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteOneDoc = async(nameCollection, idDoc)=>{
  try {
    await deleteDoc(doc(db, nameCollection, idDoc))
  } catch (error) {
    return error
  }
}