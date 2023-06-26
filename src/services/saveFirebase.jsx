import { collection, addDoc, setDoc, doc } from "firebase/firestore";
//resources
import { db } from "../firebase/conection";

export const saveData = async(nameCollection, data)=>{
  try {
    await addDoc(collection(db, nameCollection), data);
    return {'message': 'success'};
  } catch (error) {
    return error;
  }
}

export const saveDataId = async (nameCollection, id, data)=>{
  try {
    await setDoc(doc(db, nameCollection, id), data);
    return {'message': 'user created successfully'};
  } catch (error) {
    return error;
  }
}