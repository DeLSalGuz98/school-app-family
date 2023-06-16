import { db } from "../firebase/conection";
import { collection, doc, getDoc } from "firebase/firestore";

export const getOneDoc = async(collection, id)=>{
  const res = getDoc(doc(db, collection, id))
  return res
}