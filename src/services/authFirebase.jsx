import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence} from "firebase/auth";
import { auth } from "../firebase/conection";

export const createUser = async(email, password)=>{
  try {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    return error;
  }
}

export const authUser = async({email, password})=>{
  try {
    await setPersistence(auth, browserLocalPersistence  )
    const {user} = await signInWithEmailAndPassword(auth, email, password);
    return user
  } catch (error) {
    return error;
  }
}

export const observer = ()=>{
  const user = auth.currentUser
  if (user) {
    return user
  }else{
    return user
  }
}

export const exitSession = async()=>{
  try {
    await signOut(auth)
    return {'message': 'log-out'}
  } catch (error) {
    return error
  }
}
