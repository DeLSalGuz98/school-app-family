import { collection, addDoc, setDoc, doc } from "firebase/firestore";
//resources
import { db } from "../firebase/conection";

export const saveData = async(nameCollection, data)=>{
  try {
    const res = await addDoc(collection(db, nameCollection), data);
    return res;
  } catch (error) {
    return error;
  }
}

export const saveDataId = async (nameCollection, id, data)=>{
  try {
    await setDoc(doc(db, nameCollection, id), data);
    return {'message': 'user created succesfully'};
  } catch (error) {
    return error;
  }
}