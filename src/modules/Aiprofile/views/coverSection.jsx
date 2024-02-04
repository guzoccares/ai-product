import React, { useEffect,useState } from 'react'
import cover from "../../assets/orgcover1.png"
import {FiMessageSquare} from "react-icons/fi"
import {BsThreeDots} from "react-icons/bs"
import {IoMdNotifications} from "react-icons/io"
import { groupState,userState } from '../../Recoil/globalstate'
import {useRecoilValue} from "recoil"
import { ecosystemApi } from '../_api'
import { useNavigate } from 'react-router-dom'
import eco from "../../assets/img3.png"
import { messageApi } from '../_api/message'
import { ClipLoader } from 'react-spinners'


export default function CoverSection({group,account}) {
    console.log(group,"group")
    const currentUser =useRecoilValue(userState)
    const [trigger,setTrigger]=useState(false)

 
      const active=group?.active?.some(member => member?.id===account?.id) || group?.creator ===currentUser?.id
      const pending=group?.pending?.some(member => member?.id===account?.id)


      const isPending= eco?.pending?.some(e=>e?.id ===group?.id)
      console.log(isPending,eco?.name)
      const isMember= eco?.active?.some(e=>e?.id ===currentUser?.id) || eco?.creator ===currentUser?.id;




       
    
      const [errorMsg, setErrorMsg] = useState(null)
      let navigate = useNavigate();
      const [isLoading,setLoading]=useState(false)
  
       const join=async()=>{
          setLoading(true)
          console.log(account,"accco")
          try{
        
            const result =await ecosystemApi.joinRequest(group?.id,currentUser,account)
             result&&setLoading(false)
       
            // result&&navigate(`/connections/${group?.id}/pending`)
  
          //  const response =await notificationApi.sendNotification(currentUser?.accessToken,currentUser?.notificationToken)
            
  
            }catch(e){
                console.log(e)
                setLoading(false)
                setErrorMsg(e)
            }
       }
     

       const startConversation=async()=>{
        setLoading(true)
        try{
            const response=await messageApi.startConversation(group,currentUser)
            console.log(response,"msg res")
            setLoading(false)
            response && navigate(`/ai-messenger`)
            setLoading(false)
            
  
          }catch(e){
            console.log(e)
          }
  
        }
 
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
                    <img 
                    src={group?.img}
                    className="rounded-full lg:h-36 lg:w-36 h-10 w-10"
                    />

                    <div className='flex  flex-col w-full'>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex flex-col space-x-1'>
                                 <h5 className='text-xl font-semibold'>{group?.name }</h5>
                                  

                            </div>

                        </div>
                        <div className='flex flex-col py-8 space-y-4 '>
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


                    <div className='flex justify-end w-full items-center py-2'>
                           <div className='flex items-center space-x-4'>
                           {!isLoading?
                             <button
                                  style={{background: "rgba(236, 235, 254, 1)"}}
                                  className='text-blue-700 rounded-full px-8 text-sm py-1.5'
                                  onClick={startConversation}
                                  > 
                                

                                
                                    Message
                               </button>
                                 :
                                 <ClipLoader 
                                   color='blue'
                                 />
                                 }

                                  {/* <button
                                  style={{background: "rgba(236, 235, 254, 1)"}}
                                  className='text-blue-700 rounded-full px-8 text-sm py-1.5'
                                  >
                                      Follow
                                  </button> */}

                           </div>
                       
                    </div>


                </div>
               


        </div>


    </div>
  )
}
