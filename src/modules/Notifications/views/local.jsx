import React,{useEffect,useState} from 'react'
import { useRecoilValue,useRecoilState } from 'recoil'
import { groupState ,updateUserState,userState} from '../../Recoil/globalstate'
import { notificationApi } from '../api'
import ClipLoader from "react-spinners/ClipLoader";
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";
import { db } from '../../Firebase'
import { collection,  onSnapshot,
  doc, getDocs,
  query, orderBy, 
  limit,getDoc,setDoc ,
 updateDoc,addDoc ,deleteDoc, where,or} from 'firebase/firestore'
 import NotificationCard from '../components/notificationCard';

export default function Local() {
    const [currentUser,setCurrentUser] =useRecoilState(userState)
    const group =useRecoilValue(groupState)
    const [isUpdate,setUpdatedState]=useRecoilState(updateUserState)
    const [notifications,setNotifications]=useState([])
    const [isLoading,setLoading]=useState(false)
    const [areNotification,setAre]=useState("")

    useEffect(()=>{

      

        if(group?.id?.length >0){
             const q = query(collection(db,"notifications"),where('to', '==', group?.id),orderBy('date', 'desc'));
            
              const notifications= [];
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
                if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                     notifications.push({...doc?.data(),id:doc?.id});
                    console.log(doc?.data(),"feeed")
                });
                setNotifications(notifications)
              
              }
              notifications?.length===0 &&setAre("No notfications")
              notifications?.length >0 &&setAre("")
      
              
              });
          
              return () => {
                unsubscribe()
      
            };
      
          }
      
      },[group?.id])
  return (
    <div className='flex flex-col w-full h-full space-y-7 overflow-y-scroll py-6 no-scrollbar px-4 '>
     {
                      notifications?.filter((notification)=>notification?.to===group?.id)?.map((notification)=>{
                            console.log(notification,"notification account")
                       return(
                          <>
                     

                          
                              <NotificationCard 
                                  notification={notification}
                                  currentUser={currentUser}
                                  setNotifications={setNotifications}
                                  setCurrentUser={setCurrentUser}
                                  isUpdate={isUpdate}
                                  setUpdatedState={setUpdatedState}
                                />
                          

                         </>
                          )
                        })

                      }


 {areNotification?.length===0&&notifications?.length ===0&&
     <div className='w-full flex justify-center py-10'>
       <ClipLoader 
             color={"rgba(62, 51, 221, 1)"}
             loading={true}
         />
     </div>
     }

     {areNotification?.length >0&&
       <div className='w-full flex justify-center py-10'>
           <h5 className="text-lg font-semibold">You dont have any notification</h5>
       </div>

     }

</div>
  )
}
