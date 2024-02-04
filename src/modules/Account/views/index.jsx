import React,{useState,useEffect} from 'react'
import Layout from '../../Layout'
import CoverSection from './coverSection'
import CreatePost from './createPost'
import Posts from './posts'
import Suggestions from './suggestions'
import { groupState ,userState} from '../../Recoil/globalstate'
import {useRecoilValue} from "recoil"
import EcoFeed from './ecoFeed'
import { profileApi } from '../../EditProfile/api'
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot}  from "firebase/firestore";
import { db } from '../../Firebase'
import NewLayout from '../../Layout/layout'

export default function Account({currentUser}) {
    const group =useRecoilValue(userState)
    
    console.log(group,"group profile account")
    const [profile,setUpdate]=useState({})



    
        useEffect(()=>{
      
              // const response =await profileApi.fetchProfile(group)
              // console.log(response,"res profile")
              if(group?.id?.length >0){
              // let collectionName="users"
              let collectionName="individuals"
              if(group?.type?.length >0){
                collectionName= group?.type=="eco"?"ecosystems":"organizations"
       
              }

              const unsub = onSnapshot(doc(db,"organizations",group?.id), (doc) => {
                console.log("Current data: ", doc.data());
                setUpdate(doc.data())
               });
              }
            
              // const profileRef =doc(db,collectionName,group?.id)
              // const docSnap = await getDoc(profileRef);
       
              // return docSnap.data()
             },[])
 
              console.log(profile,"ppppppo>>>")
  return (
        <NewLayout>
      
          

            <div className='flex w-full justify-center h-full '>
             
                <div className='lg:w-1/2 w-full overflow-y-auto h-full no-scrollbar'>
                  <CoverSection group={group}/>
                 
                  
                </div>
       
               

            </div>
            
        </NewLayout>
  )
}
