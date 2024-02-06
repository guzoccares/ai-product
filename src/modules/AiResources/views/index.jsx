import React ,{useEffect,useState} from 'react'
import eco1 from  "../../assets/eco1.png"
import eco2 from  "../../assets/eco2.png"
import eco3 from  "../../assets/eco3.png"
import eco4 from  "../../assets/eco4.png"
import eco5 from  "../../assets/orgcover.png"
import { Link } from 'react-router-dom'
import { ecosystemApi } from '../_api/ecosystem'
import { notificationApi } from '../_api/notification'
import {useRecoilValue} from "recoil"
import { groupState,userState } from '../../Recoil/globalstate'
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom'
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";
import { db } from '../../Firebase'
import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc ,where} from 'firebase/firestore'
import ecoImg from "../../assets/ecoIcon.jpeg"
// import SearchBar from '../components/searchbar'
import Fuse from "fuse.js"
import NewLayout from '../../Layout/layout'
import { IoMdClose } from "react-icons/io";
import { MdChatBubbleOutline } from "react-icons/md";

import { useLocation,useParams} from "react-router-dom";


import { messageApi } from '../_api/message'








export default function  AiResources() {
  
    const [ecosystems,setEco] =useState([])
    const currentUser =useRecoilValue(userState)
    const group =useRecoilValue(groupState)
    const [searchQuery,setQuery]=useState("")
    const [areSearches,setSearches]=useState("")
   

    const location =useLocation()
    const words=location?.state?.keywords

    console.log(words,"words")

         
    const newWords = words?.map(word => word[0]);

       useEffect(()=>{
        const q = query(collection(db, "organizations"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const ecosystems = []
            querySnapshot.forEach((doc) => {
                  ecosystems.push({ ...doc.data(), id: doc.id })
    
            });
            const lowercaseQualifierArray = newWords.map(tag => tag.toLowerCase());

                    // Filter objects based on the qualifierArray
                    const filteredArray = ecosystems.filter(obj =>
                    obj.tags.some(tag => lowercaseQualifierArray.includes(tag.toLowerCase()))
                    );

                    filteredArray?.length===0 &&setSearches("No")
                    filteredArray?.length >0 &&setSearches("")

            setEco(filteredArray)
    

       
             });
       },[])

       
        
       const fuse =new Fuse([...ecosystems],{
          	isCaseSensitive: false,
            includeScore: true,
            shouldSort: true,
            includeMatches: false,
            findAllMatches: false,
            minMatchCharLength: 2,
            location: 0,
            threshold: 0.2,
            distance: 100,
            useExtendedSearch: true,
            ignoreLocation: false,
            ignoreFieldNorm: false,
            fieldNormWeight: 1,
         keys:["name","type"]
       })

      const result=fuse.search(searchQuery)

      console.log(result,"result rerrr")



  return (

    <NewLayout>

 
    <div className='w-full flex justify-center'>

 
              <div className='flex flex-col w-1/2 space-y-6 bg-slate-400 py-6 px-10 relative' 
                 style={{background: "#D9D9D9"}}
              >
                     <div className='flex flex-col space-y-2'>
                           <div className='flex justify-end'>
                           {areSearches?.length ==0&&
                              <IoMdClose 
                                className='text-xl '
                                onClick={()=>window.history.go(-1)}
                              />
                       
                              }

                           </div>
                           <div className=''>
                              <h5 className='text-lg font-semibold'>{areSearches?.length >0?"Nothing here matches your search.":"Here are some resources that we think can help:"}</h5>

                           </div>

                     </div>
         
         

               <>
                {result?.length ===0?

           
                 <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full overflow-y-scroll h-96'>

                    
                      {ecosystems?.length >0 &&ecosystems?.map((eco,)=>{
                           const isWord=eco?.tags
                           console.log(isWord,"TTTTTTT")
                           const isPending= eco?.pending?.some(e=>e?.id ===group?.id)
                        
                           const isMember= eco?.active?.some(e=>e?.id ===group?.id) 
                        // const isMember= eco?.active?.some(e=>e?.id ===group?.id) || eco?.creator ===group?.id;

                        return(
                        
                            <EcosystemCard 
                                eco={eco}
                                isPending={isPending}
                                currentUser={currentUser}
                                group={group}
                                isMember={isMember}

                            />

                        
                        )
                        })

                         }


                </div>

                   :

                   <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>

                            {result?.length >0 &&result?.filter((e)=>e?.id !== group?.id)?.map((eco,)=>{

                            const isPending= eco?.item?.pending?.some(e=>e?.id ===group?.id)

                            const isMember= eco?.item?.active?.some(e=>e?.id ===group?.id) 
                            // const isMember= eco?.active?.some(e=>e?.id ===group?.id) || eco?.creator ===group?.id;

                            return(

                                <EcosystemCard 
                                    eco={eco?.item}
                                    isPending={isPending}
                                    currentUser={currentUser}
                                    group={group}
                                    isMember={isMember}

                                />


                            )
                            })

                            }


                   </div>

              }
         </>
         {areSearches?.length===0&&ecosystems?.length ===0&&
            <div className='w-full flex justify-center top-0 absolute py-28'>
               <ClipLoader 
                    color={"rgba(62, 51, 221, 1)"}
                    loading={true}
                />
              </div>
            }

        
     {areSearches?.length >0&&
               <div className='w-full flex flex-col  top-0 absolute py-28 space-y-2'>

                  <h5 className="text-lg font-semibold">Suggestions:</h5>
                  <ul className='flex flex-col space-y-2'>

                 
                  {["Make sure all words are spelled correctly","Try different search items","Try more general search items","Try fewer search items","Go Back"].map((text)=>{
                     return(
                        <>
                        {text ==="Go Back"?
                        <li className="text-lg font-light hover:underline text-blue-600"   onClick={()=>window.history.go(-1)}>{text}</li>
                        :
                        <li className="text-lg font-semibold">{text}</li>

                        }
                        
                        </>
                     )
                  })

                  }
                   </ul>
               </div>

            }


      </div>
   

      </div>
      </NewLayout>
  )
}

const EcosystemCard=({eco,isPending,currentUser,isMember,group})=>{
    const [errorMsg, setErrorMsg] = useState(null)
    let navigate = useNavigate();
    const [isLoading,setLoading]=useState(false)

     const join=async(id)=>{
        setLoading(true)
        try{
          const result =await ecosystemApi.joinRequest(id,currentUser?.organizations[0],group)
          result&&setLoading(false)
     
        //   result&&navigate(`/connections/${group?.id}/pending`)

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
            const response=await messageApi.startConversation(eco,currentUser)
            console.log(response,"msg res")
            setLoading(false)
            response && navigate(`/ai-messenger`)
            setLoading(false)
            
  
          }catch(e){
            console.log(e)
          }
  
        }
      


    return(
        <div className='flex flex-col bg-white py-4 px-4'>
        <div className='flex flex-col items-center space-y-3'>
            <Link  to={`/resource-profile/${eco?.id}`}
                    state={{
                     eco,
                     account:group
                  }}
                  >
                <img 
                src={eco?.img}
                className="rounded-full w-32 h-32"
                />
           </Link>
            <h5 className=' text-center font-semibold '>{eco?.name}</h5>
     
                </div>

        <div className='flex flex-col items-center space-y-3 py-4'>
          {!isLoading?
              <MdChatBubbleOutline 
                 className='text-blue-600 text-2xl '
                 onClick={startConversation}
              />
              :
              <ClipLoader 
              color='blue'
            />
           }
     
          </div>


    </div>

    )
}