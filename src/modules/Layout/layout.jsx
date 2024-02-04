import React ,{useState,useEffect} from 'react'
import SearchBar from './searchBar'
import {IoMdNotificationsOutline} from "react-icons/io"
import {BiMenu} from "react-icons/bi"
import { Drawer } from "@mui/material";
import SidePanel from './sidePanel';
import TabsPanel from './tabsPanel';
import {useRecoilState,useRecoilValue} from "recoil"
import { userState,groupState } from '../Recoil/globalstate'
import LogOut from './logout';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from "firebase/firestore"
import { db } from '../Firebase'
import icon from "../assets/icon.png"
import text from "../assets/guzotext.png"
export default function NewLayout({children}) {
  return (
    <div className='w-full h-full  '>
          <div className='flex items-center'>
             <Header />
          </div>
        <div className='w-full'>
            {children}
        </div>
    </div>
  )
}


const Header=()=>{
    const currentUser =useRecoilValue(userState)
    const [hover,setHover]=useState(false)

    console.log(currentUser,"new")
     return(
        <div className='w-screen flex  py-20 px-20 items-center '>
             <div className='w-1/3'>
                   <img 
                     src={icon}
                   />
             </div>
             <div className='w-1/3 flex justify-center'>
                    <img 
                     src={text}
                   />
                
             </div>
             
             <div className='w-1/3 flex flex-col items-center relative spce-y-10'>
         

                

         
                    
                    <img 
                        src={currentUser?.img}
                        className='lg:w-8 lg:h-6 w-6 h-6 rounded-full'
                        onClick={()=>setHover(true)}
                       
                    />


               {hover&&
                  <div className='absolute w-full flex justify-end h-96 px-28 z-30 mt-10' >
                    <div className='w-72 h-44 rounded-lg bg-white flex flex-col space-y-4 items-center py-3' 
                        onMouseOver={()=>setHover(true)}>
                           {[
                             {text:"Home",
                              link:"/"

                             },
                             {text:"Messages",
                             link:"/"

                            },
                            {text:"Profile",
                            link:"/"

                            },
                             {text:"Settings",
                             link:"/"

                             }

                            ].map((tab)=>{
                              return(
                                <Link>
                                   
                                      <h5 className='text-sm text-slate-500'>{tab?.text}</h5>
                                </Link>

                              )
                            })

                           }

                    </div>


                  </div>
              }
                
                  
           


                
            </div>
   
   


        </div>
     )
}