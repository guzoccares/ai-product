import React, { useEffect, useState } from 'react'
import mail from "../../../assets/icons/email.png"
import gmail from "../../../assets/icons/google.png"
import linkdin from "../../../assets/icons/linkdin.png"
import {useRecoilValue} from "recoil"
import { accountTypeState } from '../../../Recoil/globalstate'
import { Link } from 'react-router-dom'
import { Alert, Avatar, Button, Divider, InputBase } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { authApi } from '../../_api/auth'


export default function AuthTypes() {
   let navigate = useNavigate();
   const [errorMsg, setErrorMsg] = useState(null)
    const [activeAuth,setAuth]=useState("")
    const account =useRecoilValue(accountTypeState)
    console.log(account,"avcc")

    useEffect(()=>{
      const getAuthorizationCode=()=>{
        setErrorMsg(null)
         try{
           const urlSearchParams = new URLSearchParams(window?.location?.search);
            const code= urlSearchParams?.get('code');
           code?.length>0&&authApi.linkedinAuth(code)
           console.log(code,"codee")
           code?.length>0&&setErrorMsg("You dont have permissions");
         }catch(e){
            console.log(e)
          

         }


      }
      getAuthorizationCode()

     },[])
 



    const auths=[
        {
            icon:gmail,
            name:"Sign up with Google",
            link:"",
            click:async()=>{
              setErrorMsg(null)
              try{
                const user=await authApi.googleAuth(account)
                let route=""
                 if(account==="Organization"){
                     route="org"
                   }else if(account==="Ecosystem"){
                     route="ecosystem"
                 }
   
                  localStorage.clear();
                  localStorage.setItem('user',JSON.stringify(user));
   
                  user?.id.length >0&& navigate(`/ai`)
   
                  console.log(route,"rrrr")

              }catch(e){
                 console.log(e)
                 setErrorMsg(e.message);

              }
        
             

            }
            
    
        },
        // {
        //     icon:linkdin,
        //     name:"Sign up with LinkedIn",
        //     link:"",
        //     click:async()=>{
        //       setErrorMsg(null)
        //       // const user=await authApi.linkedinAuth()
        //       // let route=""
        //       //  if(account==="Organization"){
        //       //      route="org"
        //       //    }else if(account==="Ecosystem"){
        //       //      route="ecosystem"
        //       //  }
 
        //       //   localStorage.clear();
        //       //   localStorage.setItem('user',JSON.stringify(user));
 
        //       //   user?.id.length >0&& navigate(`/create-profile/${route}`)
 
        //       //   console.log(route,"rrrr")
        //       // window.location.href=`https://www.linkedin.com/uas/login?session_redirect=%2Foauth%2Fv2%2Flogin-success%3Fapp_id%3D213727482%26auth_type%3DAC%26flow%3D%257B%2522scope%2522%253A%2522profile%2522%252C%2522authorizationType%2522%253A%2522OAUTH2_AUTHORIZATION_CODE%2522%252C%2522redirectUri%2522%253A%2522http%253A%252F%252Flocalhost%253A3001%252Fregister%2522%252C%2522currentStage%2522%253A%2522LOGIN_SUCCESS%2522%252C%2522state%2522%253A%2522987654321%2522%252C%2522appId%2522%253A213727482%252C%2522currentSubStage%2522%253A0%252C%2522authFlowName%2522%253A%2522generic-permission-list%2522%252C%2522creationTime%2522%253A1694904355312%257D&fromSignIn=1&trk=oauth&cancel_redirect=%2Foauth%2Fv2%2Flogin-cancel%3Fapp_id%3D213727482%26auth_type%3DAC%26flow%3D%257B%2522scope%2522%253A%2522profile%2522%252C%2522authorizationType%2522%253A%2522OAUTH2_AUTHORIZATION_CODE%2522%252C%2522redirectUri%2522%253A%2522http%253A%252F%252Flocalhost%253A3001%252Fregister%2522%252C%2522currentStage%2522%253A%2522LOGIN_SUCCESS%2522%252C%2522state%2522%253A%2522987654321%2522%252C%2522appId%2522%253A213727482%252C%2522currentSubStage%2522%253A0%252C%2522authFlowName%2522%253A%2522generic-permission-list%2522%252C%2522creationTime%2522%253A1694904355312%257D`
        //             window.location.href=` https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77qrf2uomwidm7&redirect_uri=https://guzo.vercel.app/register&state=995545&scope=openid`
   
        //      }
    
        // },
        {
            icon:mail,
            name:"Sign up with Email",
            link:"",
            click:()=>{navigate("email-password")}
        }
     ]
  return (
      <div className='w-full flex justify-center  '>
            <div className='w-4/5 flex bg-white rounded-lg  border flex-col items-center py-8 space-y-6 ' style={{borderColor:" linear-gradient(0deg,rgba(130, 122, 247, 0.5), rgba(130, 122, 247, 0.5)),linear-gradient(0deg, #FFFFFF, #FFFFFF)"}}>
                 <h5 className='text-xl font-semibold '>Sign up for Guzo</h5>
                  {errorMsg && <div className='px-8 py-1 '>
                      <Alert severity="error">{errorMsg}</Alert>
                        

                    </div>
                  }

                 {auths?.map((auth)=>{
                   
                
                     return(
                        <>
                        <div className='flex items-center space-x-6 px-4 w-2/5 border py-3 rounded-lg '
                          onClick={auth?.click}
                        >
                            <img  
                              src={auth?.icon}
                              className="w-4"
                            />
                            
          

                             <h5 className="font-light text-sm">
                              {auth?.name}
                                
                               
                                </h5>

                          
                        
                          
                        </div>
                        </>
                     )
                 })
                 }


                 <div className='flex flex-col space-y-4 items-center w-full'>
                    <h5 className='h-0.5  w-1/3 text-black border '></h5>
                    <div className='flex flex-col space-y-2 items-center w-full'>
                      <h5>Already have an account?</h5>
                     <Link to="login">
                        <button className='border border-blue-700 text-blue-700 rounded-full px-10 py-1'>Sign in</button>
                     </Link>
   

                    </div>


                 </div>
 
            </div>

    </div>
  )
}


