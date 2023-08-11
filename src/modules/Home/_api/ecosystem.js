import { collection,  onSnapshot,
        doc, getDocs,
        query, orderBy, 
        limit,getDoc,setDoc ,
       updateDoc,addDoc } from 'firebase/firestore'
import { db } from '../../Firebase';


export const ecosystemApi = {
  
    getAllEcosystems: async function () {
       

        const q = query(collection(db, "ecosystems"));
        const ecosystems = []
          try{
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.map((doc) => {
                ecosystems.push({ ...doc.data(), id: doc.id })
              
            })
           
            return ecosystems 

            }catch(e){
            console.log(e)
            }
      },

        joinRequest: async function (ecoId,currentUser) {
            try{
                
                 const ecoRef =doc(db,"ecosystems",ecoId)
                 const userRef =doc(db,"users",currentUser?.id)
                //  console.log(ecoRef,"ref")
                 const docSnap = await getDoc(ecoRef);
                //  console.log(docSnap.id,"snap")
                 const ecosystem =docSnap?.data()
                //  console.log(ecosystem,"Ecosysyy")
                 const pendingMembers =ecosystem?.pending
                 console.log()
                 const result = await updateDoc(ecoRef, {
                    pending:[
                        ...pendingMembers,
                        {
                           ...currentUser
                        }
                       ]
                     })
                  
                     console.log(result,"result")
                
              const res = await updateDoc(userRef, {
                  pending:[
                     {
                       id:docSnap.id,
                       ...docSnap?.data()
                      }
                   ]
            
                 })

            console.log(res,"resss")
        
                    

             }catch(e){
                 console.log(e)
            }

             

         }
}