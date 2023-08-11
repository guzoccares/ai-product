import React,{useState,useRef} from 'react'
import img2 from "../assets/feedorg.png"
import {IoMdImage} from "react-icons/io"
import {AiTwotoneCalendar,AiOutlineHistory} from "react-icons/ai"
import {ImFilesEmpty} from "react-icons/im"
import {RiCheckboxBlankFill,RiArrowDropDownLine} from "react-icons/ri"
import Request from './request'
import Files from './files'
import Events from './events'
import Share from './share'
import {MdArrowDropDown} from "react-icons/md"
import { postApi } from './_api/post'
import ClipLoader from "react-spinners/ClipLoader";

export default function CreatePosts ({group,currentUser}) {
     const [request,setReq]=useState(false)
     const [event,setEvent]=useState(false)
     const [file,setFile]=useState(false)
     const [share,setShare]=useState(false)
     const [others,setOthers]=useState(false)
     const [isLoading,setLoader]=useState(false)

     const [requests,setRequests]=useState([])

    const [post,setPost]=useState({
                                  title:"",
                                  body:"",
                                  img:{}
                                })
    const [requestPost,setRequest]=useState({
        title:"",
        body:"",
        })
    const [eventPost,setEvt]=useState({
        title:"",
        body:"",
        img:""
        })


    const [url,setUrl]=useState("")

   


    console.log(post,"post")
    console.log(requestPost,"rrpost")

    const makePost=async(group)=>{
        console.log("groppp")
        setLoader(true)
        const payload={
            post,
            requests,
            eventPost
        }

        try{
           const result =await postApi.makePost(group,payload,currentUser)
           setLoader(true)
        }catch(e){
            console.log(e)
            setLoader(false)
        }

       }

    

  return (
      <>
       { others?
       
          <>
              {request&&<Request  
                   setOthers={setOthers}
                   requestPost={requestPost}
                   setRequest={setRequest}
                   setRequests={setRequests}
                   requests={requests}

              
                />}
              {event&&<Events  
                       setOthers={setOthers}
                       eventPost={eventPost}
                       setEvt={setEvt}
                       setUrl={setUrl}
                       setEvent={setEvent}
                       url={url}

              />}
              {file&&<Files 
                setOthers={setOthers}
                url={url}
                setUrl={setUrl}
                setPost={setPost}
                post={post}
               />}
              {share&&<Share  setOthers={setOthers}/>}


          </>
         



        :


<div className='w-full flex justify-center h-full overflow-y-scroll'>
      
      <div className='w-4/5 flex flex-col h-full space-y-10 py-4 '>

        <div className='flex items-center space-x-2 w-full'>
                <img 
                src={group?.img}
                className="h-10 w-10 rounded-full"
                />

                <div className='flex flex-col '>
                    <h5 className='font-semibold'>{group?.name}</h5>
                    <h5 className='text-sm font-light'>{group?.type}</h5>
                    <div className='flex items-center space-x-1'>
                        <h5 className='text-sm font-semibold '>Share Options</h5>
                        <MdArrowDropDown 
                        className='text-lg'
                          onClick={()=>setShare(true) || setOthers(true)}
                        />
                    </div>
                   

                </div>
         </div>

         <div className='flex flex-col space-y-4'>
                    <>
                    { url?.src?.length > 0&&
                        <div className='w-1/2 py-4'>
                                <img
                                  src={url?.src}
                                  className='w-full h-full rounded-lg'
                                />
                        </div>
                      }
                    </>
                     

                <div className='flex flex-col w-full space-y-2'>
                        <label className='text-sm text-slate-700'>Post Title*</label>
                        <input 
                            placeholder='Give your post a title...'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
                            name="title"
                            value={post?.title}
                            onChange={(e)=>setPost({...post,title:e.target.value})}
     
                        />

                 </div>

                 <div className='flex flex-col w-full space-y-2'>
                        <label className='text-sm text-slate-700'>Post Title*</label>
                        <textarea
                            placeholder='Include a description of your opportunity, request, project, event, initiative, need.....'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
                            name="body"
                            value={post?.body}
                            onChange={(e)=>setPost({...post,body:e.target.value})}
     
     
                        />

                 </div>
                  <div className='flex flex-col'>
                    {requests?.map((req)=>{
                         return(
                            <RequestCard 
                              req={req}
                            />
                         )

                        })}

                  </div>
                 


                <button className='text-blue-700 rounded-full px-8 py-1.5 w-1/2'
                        style={{background: "rgba(236, 235, 254, 1)"}}
                        onClick={()=>setReq(true) || setOthers(true)}
                        >
                 Add a Request
                </button>
              
                 <div className='flex flex-col w-full space-y-2'>
                        <label className='text-sm text-slate-700'>Tags</label>
                        <input 
                            placeholder='Add up to (5) descriptive tags that will help people discover your post.....'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
     
                        />

                 </div> 

                 <div className='flex  flex-col space-y-4'>
                    <h5 className='text-sm font-semibold'>Additional Details</h5>

                    <div className='flex items-center space-x-4'>
                        {[{
                            icon:<IoMdImage/>,
                            click:()=>setFile()
                           },
                            {
                                icon:<AiTwotoneCalendar />,
                                click:()=>setEvent(true)
                            },
                            {
                                icon:<ImFilesEmpty/>,
                                click:()=>setFile(true)
                         }
                        ].map((action)=>{
                            return(
                                <h5 className='rounded-full p-3 items-center justify-center text-lg text-slate-700'
                                  style={{background: "rgba(242, 242, 242, 1)" }}
                                  onClick={()=>action.click() || setOthers(true)}
                                >
                                    {action.icon}
                                </h5>
                            )
                        })

                        }


                    </div>

                    <div className='flex w-full items-center justify-center'>
                        {[1,2].map(()=>{
                             return(
                                <RiCheckboxBlankFill
                                className='text-slate-300 text-2xl'
                                 />
                             )
                        })

                        }
                       

                      </div>
                 </div>

                 <div className='flex items-center justify-end'>
                    <div className='flex items-center space-x-4'>
                        <h5
                             className='text-blue-700 rounded-full px-4 py-2'
                           style={{background: "rgba(236, 235, 254, 1)"}}
                        >
                          <AiOutlineHistory />
                        </h5>
                        {isLoading?
                             
                             <ClipLoader 
                                 color={"rgba(62, 51, 221, 1)"}
                                 loading={isLoading}
                             />
                             :
                            <button
                                style={{background: "rgba(236, 235, 254, 1)"}}
                                className='text-blue-700 rounded-full px-12 py-1.5'
                                onClick={()=>makePost(group)}
                            >
                                Post
                            </button>
                           }

                    </div>
                 </div>




         </div>
    
      </div>
      </div>

    }
    </>
  )
}




const RequestCard=({req})=>{
    const randomNumber = Math.floor(Math.random() * 4) + 1;

    const color=[
        "",
        "rgba(197, 193, 251, 1)",
        "rgba(205, 247, 243, 1)",
        "rgba(254, 247, 197, 1)",
        "rgba(255, 198, 201, 1)"
    ]
    return(
        <div className='w-full '>
            <div className='flex items-center justify-between w-full py-2 rounded-md px-4' style={{background:`${color[randomNumber]}`}}>
                <h5 className='text-sm font-semibold' >{req?.title}</h5>
                <RiArrowDropDownLine
                  className='text-3xl font-semibold'
                 />


            </div>

        </div>
     )
}