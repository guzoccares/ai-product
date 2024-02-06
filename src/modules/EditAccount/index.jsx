import React ,{useState,useRef,useEffect} from 'react'
import "./edit.css"
import {AiOutlineClose } from "react-icons/ai"
import guzo from "../assets/guzoLogo.png"
import { useRecoilValue,useRecoilState } from 'recoil'
import { groupState ,updateUserState,userState} from '../Recoil/globalstate'
import { profileApi } from './api'
import {BiSolidPencil} from "react-icons/bi"
import {AiOutlineMail} from "react-icons/ai"
import EcoForms from './forms/eco'
import IndividualForms from './forms/individual'
import OrgForms from './forms/org'
import Cover from './imgUpload/cover'
import Photo from './imgUpload/photo'
import ClipLoader from "react-spinners/ClipLoader";
export default function EditProfile() {
     
    const group =useRecoilValue(userState)
     
    const [isUpdate,setUpdatedState]=useRecoilState(updateUserState)
    const [currentUser,setCurrentUser]=useRecoilState(userState)
    const [trigger,setTrigger]=useState(false)
    const [isLoading,setLoader]=useState(false)
    const [tags,setTags]=useState([])

    const [profile,setUpdate]=useState()
    const [url,setUrl]=useState({
        img:"",
        cover:""
        })
    const [file,setFile]=useState({
      img:{},
      cover:{}
      })


    console.log(file,"fileee")
        useEffect(()=>{
           const fetchProfile=async()=>{
              const response =await profileApi.fetchProfile(group)
              console.log(response,"res profile")
              setUpdate(response,"response")
            }

            if(group?.id?.length >0){
              fetchProfile()
            }
         

         },[group])

     

    const edit=async()=>{
      setLoader(true)
         try{
            console.log({...profile,tags:tags},"sunmt tag>>>>")
            const response =await profileApi.editProfile(group,file,{...profile,tags:tags})
            response?.status&&setUpdate(response?.profile)
            response?.status&&setLoader(false)
            response?.status&&setTrigger(false)
            response?.status&&setUpdatedState(!isUpdate)
          }catch(e){
            console.log(e)
            setLoader(false)
          }
      }
  

      console.log(profile,"Edittt")
      console.log(file,"Edittt file")

  return (
      <>
        <div className='w-full flex justify-end'>
               <h5   className='text-blue-700 rounded-full px-8 text-sm py-1.5'
                  style={{background: "rgba(236, 235, 254, 1)"}}
                  onClick={()=>setTrigger(true)}
               >
                         
                         Edit
                {/* <BiSolidPencil
                  className='text-blue-600 text-lg '
                /> */}
    
                             
              </h5>

            {/* <button 
                className=' border rounded-full py-1 px-8 text-sm font-semibold' 
                style={{borderColor: "rgba(40, 28, 245, 1)"}}
               
            >
                Edit profile
                </button> */}


        </div>
    

        <Modal trigger={trigger}  cname="w-full py-2 h-full  px-4 rounded-lg overflow-y-scroll " >
               <div className='w-full flex justify-end px-6 py-2'>
                    <AiOutlineClose 
                    onClick={()=>setTrigger(false) || setUrl({cover:"",img:""})}
                    className="text-xl"
                  />

               </div>

              <div className='h-full'>
                    <div className='w-full h-full'>
                        <div className='flex  h-full w-full justify-center  items-center space-x-20'>
                            
                            <img 
                            src={guzo}
                            className="w-1/7"
                            />

                            <div className='w-3/5 h-full overflow-y-scroll no-scrollbar '>

                                <div className='flex flex-col w-full bg-white py-6 px-6 '>
                                     {group?.type?.length>0?
                                            <>
                                              {group?.type=="eco"?
                                            <h5 className='text-xl font-semibold'>Edit ecosystem profile</h5>
                                                :
                                                <h5 className='text-xl font-semibold'>Edit organization profile</h5>
                                            }
                                            </>
                                            :
                                            <h5 className='text-xl font-semibold'>Edit individual profile</h5>
                                         }
                                  
                                      <div className='flex flex-col w-full space-y-4'>
                                          <Photo 
                                            url={url}
                                            setUrl={setUrl}
                                            setUpdate={setUpdate}
                                            group={profile}
                                            file={file}
                                            setFile={setFile}
                                          />
                                          <Cover 
                                              url={url}
                                              setUrl={setUrl}
                                              setUpdate={setUpdate}
                                              group={profile}
                                              file={file}
                                              setFile={setFile}
                                          />

                                            
                                        
                                      </div>


                                   
                                      {group?.type?.length>0?
                                        <>
                                           {group?.type=="eco"?
                                            <EcoForms 
                                               profile={profile}
                                               setUpdate={setUpdate}
 
                                            />
                                            :
                                            <OrgForms 
                                              profile={profile}
                                              setUpdate={setUpdate}
                                              tags={tags}
                                              setTags={setTags}
                                            />
                                         }
                                        </>
                                        :
                                        <IndividualForms 
                                          profile={profile}
                                          setUpdate={setUpdate}
                                        />
                                     }
                                 


                                </div>

                                <div className='flex  py-6  items-center w-full justify-between'
                                   style={{background: "rgba(248, 248, 248, 1)"}}
                                >
                                    <h5 style={{color: "rgba(37, 31, 134, 1)"}}
                                      onClick={()=>setTrigger(false)}
                                        >Back</h5>
                                        {isLoading?
                                                
                                                <ClipLoader 
                                                    color={"rgba(62, 51, 221, 1)"}
                                                    loading={isLoading}
                                                />
                                                              :
                                                <button className='px-6 py-2 text-blue-600 rounded-full' 
                                                style={{background: "rgba(237, 237, 237, 1)"}}
                                                onClick={edit}
                                                > Continue</button>
                                              }
                            
                                  </div>




                            </div>

                        </div>
                          

                     </div>






                  







              </div>


       </Modal>

      </>
    )
}






function Modal({children ,cname,trigger,onClose}) {
    return (
      <div>
            { trigger?
              <div className="edit-overlay-style">
                  <div className={`modal-upload ${cname}`}>
                     {children}
                  </div> 
                  
              </div>
           : <div></div>
              
              }
  
      </div>
    )
  }