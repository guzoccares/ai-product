import { db,auth } from "../../Firebase";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,query,where,getDocs,deleteDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"




export const teamApi= {

    addInvitee:async function (invitee,group) {
         try{
            console.log("addding")
            const userRef = collection(db, "users");
            const q = query(userRef, where("email", "==", invitee?.email));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot,"emailll")
            let user;
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());

                user={
                    id:doc.id,
                    ...doc.data()
                }
              });
              console.log(user,"userrr")
              


            const collectionName=group?.type ==="eco"?"ecosystems" :"organizations"
            const groupRef=doc(db,collectionName,group?.id)
            const groupSnap = await getDoc(groupRef);
            console.log(groupSnap?.data(),"group")
            const array=[]

            const inviteeList=groupSnap?.data()?.invitees ===undefined? [] :groupSnap?.data()?.invitees
            console.log(inviteeList,"invitessssss")

            if(user===undefined) {
                throw new Error("This user does not exist")
            }

              await updateDoc(groupRef, {
                invitees:[
                    ...inviteeList,
                    {
                        id:user?.id,
                        email:invitee?.email,
                        name:user?.firstName?.length !=undefined ?user?.firstName + " "+ user?.lastName :user?.display

                    }
                   ]
               })
       
           

       

             const notificationSnap = await addDoc(collection(db, "notifications"),{
                name:group?.name,
                img:group?.img,
                message:`${group?.name} has requested you join as a teammate.`,
                type:"join request",
                from:{
                    id:group?.id,
                    type:group?.type
                },
                to:user?.id,
                date:new Date(),
                targetId:`${group?.id}-${user?.id}`

    
              })
              const result = await updateDoc(doc(db,"unseen",user?.id), {
                  notifications:true
              })
          
            const docSnap = await getDoc(groupRef);

            return {teammates:docSnap?.data()?.teammates,invitees:docSnap?.data()?.invitees,status:true}


            }catch(e){
                console.log(e)
                throw new Error(e);
            }
    },
        getAllTeammates:async function (group,currentUser) {
            const collection=group?.type=="eco"?"ecosystems":"organizations"
            const ecoRef =doc(db,collection,group?.id)
            const docSnap = await getDoc(ecoRef);
            console.log(docSnap?.data()?.invitees,"api")
            return {teammates:docSnap?.data()?.teammates,invitees:docSnap?.data()?.invitees}

            //  if(docSnap?.data().creator===currentUser?.id){
            //    return docSnap?.data()
            //  }

        },

        deletTeammate:async function (group,team) {
             console.log(team?.id,"deletedd")
             try{
                  const collectionName =group?.type=="eco"?"ecosystems":"organizations"
                  const ref =doc(db,collectionName,group?.id)
                  const docSnap = await getDoc(ref);
                  console.log(docSnap?.data(),"ecossye")
    
                  const teammates=docSnap?.data()?.teammates?.length ==undefined? []:docSnap?.data()?.teammates
                  console.log(teammates,"my teamm")
                  const newTeammates= teammates?.filter((teammate)=>teammate?.id !=team?.id )

                  console.log(newTeammates,"teamms")
            
                   await updateDoc(ref, {
                    teammates:[
                        ...newTeammates,
                      ]           
                   })
                   const snap = await getDoc(ref);

                      const userSnap = await getDoc(doc(db,"users",team?.id));
                     if(group?.type=="eco"){
                          console.log(userSnap?.data()?.ecosystems,"old eco")
                            const newEcosystem=userSnap?.data()?.ecosystems?.filter((eco)=>eco?.id != group?.id)

                            console.log(newEcosystem,"ecosstem")
                            
                            await updateDoc(doc(db,"users",team?.id), {
                            ecosystems:[
                                ...newEcosystem,
                                
                            ]
                            
                          })
         

                         }else{
                            console.log(userSnap?.data()?.organizations,"old iorg")
                            const newOrgs=userSnap?.data()?.organizations?.filter((eco)=>eco?.id != group?.id)
                            console.log(newOrgs,"ecosstem")
                            await updateDoc(doc(db,"users",team?.id), {
                             organizations:[
                                ...newOrgs
                              ]
                    
                             })

                       }


                    const notificationSnap = await addDoc(collection(db, "notifications"),{
                      name:group?.name,
                      img:group?.img,
                      message:`You have been removed as admin from ${group?.name}`,
                      type:"action",
                      from:{
                          id:group?.id,
                          type:group?.type
                      },
                      to:team?.id,
                      date:new Date()
          
                    })
                    const result = await updateDoc(doc(db,"unseen",team?.id), {
                      notifications:true
                     })
    
                   
                      return true


              }catch(e){
                console.log(e)
                throw new Error(e)
              }

        },
         removePendingTeammate:async function (group,teammate) {
            try{
              const collectionName =group?.type=="eco"?"ecosystems":"organizations"
              const ref =doc(db,collectionName,group?.id)
              const docSnap = await getDoc(ref);
              console.log(docSnap?.data(),"ecossye")

              const invitees=docSnap?.data()?.invitees?.length ==undefined? []:docSnap?.data()?.invitees
              const newInvitees=  invitees?.filter((invitee)=>invitee?.id !=teammate?.id )
        
               await updateDoc(ref, {
                invitees:[
                    ...newInvitees,
                  ]           
               })

               const userRef = collection(db, "notifications");
               const q = query(userRef, where("targetId", "==", `${group?.id}-${teammate?.id}`));
               const querySnapshot = await getDocs(q);
               console.log(querySnapshot,"emailll")
               let notificationId
                 querySnapshot.forEach(async(doc) => {
                   // doc.data() is never undefined for query doc snapshots
                   console.log(doc.id, " => ", doc.data())
                      notificationId=doc.id
                     });
                    console.log("hass")

                     console.log(notificationId,"notiff")

                     await deleteDoc(doc(db,"notifications",notificationId));

                  console.log("done")

              return true
             }catch(e){
              console.log(e)
              throw new Error(e)
            }
            
        },

        changeRole:async function (group,teammate,role) {
          
              const collectionName=group?.type ==="eco"?"ecosystems" :"organizations"
              const groupRef=doc(db,collectionName,group?.id)
              const groupSnap = await getDoc(groupRef);
              try{
                  if(role ==="owner"){
                     await updateDoc(groupRef, {
                      owners:[
                          ...groupSnap?.data()?.owners,
                            teammate
                  
                         ]
                        })

                      }else{
                        const owners= groupSnap?.data()?.owners?.filter((owner)=>owner !=teammate)
                      await updateDoc(groupRef, {
                      owners:[
                          ...owners
                            
                  
                         ]
                        })

                  }

                    return true

                 
                }catch(e){
                 console.log(e)
                 throw new Error(e)
              }
        }


}