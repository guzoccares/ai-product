import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { db } from "../../Firebase";




const uploadFile=async(file)=>{
   const storage = getStorage();
   const fileId=Math.random().toString(36).substring(2,8+2);
   const storageRef = ref(storage, `/${fileId}`);
   console.log(storageRef,"shote")
   const snapshot=await uploadBytes(storageRef, file)

   return `https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`

}


export const profileApi= {
   editProfile:async function (group,file,profile) {
      console.log(profile,"ppp")
      // let collectionName="users"
      let collectionName="individuals"
      if(group?.type?.length >0){
        collectionName= group?.type=="eco"?"ecosystems":"organizations"

      }

         if(file?.img?.name?.length  >0 ){
            const img =await uploadFile(file?.img)
            console.log(img)

            profile["img"]=img
         }
         if(file?.cover?.name?.length  >0 ){
            const imgCover =await uploadFile(file?.cover)
            console.log(imgCover)

            profile["cover"]=imgCover
         }
         
           
        console.log(profile,"propfild apiii")
      try{    
          const profileRef =doc(db,collectionName,group?.id)

          const result = await updateDoc(profileRef,profile)
          const docSnap = await getDoc(profileRef);
         
          console.log(docSnap?.data(),"resulttt")
          return {profile:docSnap?.data(),status:true}
          
        
          return true
        }catch(e){
          console.log(e)
          throw new Error(e)
       }



   },
     fetchProfile:async function (group) {
        try{
         let collectionName="individuals"
         if(group?.type?.length >0){
           collectionName= group?.type=="eco"?"ecosystems":"organizations"

         }
       
         const profileRef =doc(db,collectionName,group?.id)
         const docSnap = await getDoc(profileRef);

         return docSnap.data()




         }catch(e){
           console.log(e)
           throw new Error(e)
        }
    }

}