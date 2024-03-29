import React,{useState} from 'react'
import Modal from '../Modal'
import {MdDelete} from "react-icons/md"
import {AiOutlineClose } from "react-icons/ai"
import { postApi } from './api'
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

export default function DeletePost({feed,group,setFeed}) {

     const [trigger,setTrigger]=useState(false)
     const [isLoading,setLoader]=useState(false)
     const [errorMsg, setErrorMsg] = useState(null)

     const [open, setOpen] = useState(false);

     let navigate =useNavigate()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


     const deletePost=async()=>{
         setLoader(true)
         try{
            const response =await postApi.deletePost(feed,group)
            response?.status&&setTrigger(false)
            response?.status&&setLoader(false)
            response?.status&&setOpen(true)
          
            response?.status&&setFeed(response?.post)

          }catch(e){
            console.log(e)
            setErrorMsg(e.message)
            setLoader(false)
          }
         
     }

  return (
    <>

       
         <h5 className='bg-red-600 flex items-center justify-center rounded-full p-2'
           onClick={()=>setTrigger(true)}
           >
           <MdDelete 
            className='text-white'
            />
 
          </h5>

          <Snackbar 
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical:"top", horizontal:"center"}}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Post has been deleted
            </Alert>
         </Snackbar>


        <Modal trigger={trigger}  cname="w-1/4 py-2   px-4 rounded-lg ">
             <div className='w-full flex justify-end px-6 py-2'>
                <AiOutlineClose 
                   onClick={()=>setTrigger(false)}
                />
              </div>

              <div className='flex flex-col space-y-4 py-4 px-4 w-full items-center'>
                  <h5>Are you sure you want to delete this post</h5>
                     {errorMsg && (
                        // <FadeIn><Alert severity="error">{errorMsg}</Alert></FadeIn>
                        <Alert severity="error">{errorMsg}</Alert>
                        )}


                  <div className='flex items-center justify-center space-x-4'>
                      {isLoading?
                             
                             <ClipLoader 
                                 color={"rgba(62, 51, 221, 1)"}
                                 loading={isLoading}
                             />
                           :
                       <button className='text-blue-700 rounded-full px-4 py-1 text-sm'
                             style={{background: "rgba(236, 235, 254, 1)"}}
                             onClick={()=>deletePost()}
                         
                            >
                             Continue
                
                        </button>
                        }

                  </div>

            </div>
         
         </Modal>
 
    </>
  )
}
