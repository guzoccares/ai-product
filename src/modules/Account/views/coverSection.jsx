import React,{useState,useEffect} from 'react'
import cover from "../../assets/orgcover1.png"
import orgPic from "../../assets/orgcover.png"

import {RiShareBoxFill} from "react-icons/ri"
import { profileApi } from '../../EditProfile/api'
import icon from "../../assets/orgIcon.jpeg"
import eco from "../../assets/ecoIcon.jpeg"
import EditProfile from '../../EditAccount'
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot}  from "firebase/firestore";
import { db } from '../../Firebase'


export default function CoverSection({group}) {
    console.log(group,"group[pp")
    const [trigger,setTrigger]=useState(false)

    const [group1,setgroup]=useState({})



     console.log(group1,"edit >>>>>>>>>>>>")

    
  return (
    <div className='w-full flex flex-col space-y-4'>
      
          <div className='w-full flex flex-col  bg-white  rounded-lg'>
              { group?.cover?.length>0?
                  
                     <img 
                      src={group?.cover}
                      className="w-full h-28"
  
                      />
                           :
                      <div className="w-full h-28 rounded-t-lg" style={{background:"#5A5A5A"}}>
                      </div>



              }


                <div className='flex lg:flex-row flex-col py-6 space-x-4 px-4'>
                    {group?.name?.length > 0?
                         <img 
                            src={group?.img !=undefined&&group?.img}
                            className="rounded-full h-28 w-28 "
                        />
                             :
                        <>
                          {group?.img?.length>0?
                             <img 
                               src={group?.img !=undefined&&group?.img}
                                className="rounded-full sm:h-28 sm:w-28"
                             />
                             :
                             <div className='rounded-full h-28 w-28  p-2 items-center justify-center flex border'
                                 >
                                  {group?.firstName !=undefined&&
                                    <h5 className='font-semibold text-6xl'> {group?.firstName?.slice(0,1) +group?.lastName?.slice(0,1)}</h5>
                                  } 
                             </div>
                              }
                           </>
                         }
             

                    <div className='flex  flex-col w-full'>
                         <div className='flex items-center justify-between w-full'>
                            {group?.name?.length >0?
                              <div className='flex flex-col'>
                               <h5 className='text-xl font-semibold w-full'>{group?.name}</h5>
                               
                              </div>
                              :
                              <>
                                  {group?.firstName !=undefined?
                                 <h5 className='text-xl font-semibold w-full'> {group?.firstName + " " + group?.lastName } </h5>
                                    :
                                 <h5 className='text-xl font-semibold w-full'> {group?.display } </h5>
                                  }
                              </>
                              
                           }
                             
                           <div className='flex items-center w-1/2 space-x-1'>
                                {/* <EditProfile 
                                  group={group}
                                />   */}



                           </div>
                          
                                                                        

                         </div>
                        <div className='flex flex-col pt-6 space-y-4'>
                      

                                <h5 className='text-slate-900 font-semibold text-sm'>{group?.location} </h5>

                        </div>
                    

                    </div>
                    
                </div>
              

                <div className='px-4 py-2 flex flex-col space-y-6'>
                   {group?.about?.length !=undefined&&
                      <div className='flex flex-col space-y-2 px-4 py-2 rounded-lg '  style={{background: "linear-gradient(0deg, #ECEBFE, #ECEBFE)"}} >
                          <h5 className='text-lg font-semibold'>About {group?.type?.length>0? group?.name :group?.firstName}</h5>
                          {group?.about?.length >0&&

                          
                              <p className=''>
                                {group?.about?.slice(0,`${trigger?group?.about?.length :100}`)}

                                {
                                  group?.about?.length> 100&&
                                   <>
                                     {trigger?
                                         <span className='font-semibold text-xs' onClick={()=>setTrigger(false)}>....see less</span>
                                         :
                                         <span className='font-semibold text-xs' onClick={()=>setTrigger(true)}>....see more</span>


                                     }
                                     
                                   </>
                                 
                                }
                           
                          </p>
                          }

                     </div>

                   }
                    
                </div>
               
                  <div className='py-8 flex justify-end px-8'>
                       <EditProfile />
                    
                </div>

        </div>
                
         

    </div>
  )
}
