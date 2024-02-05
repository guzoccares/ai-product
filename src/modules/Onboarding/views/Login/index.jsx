import React,{useEffect, useState} from 'react'
import {MdLocationPin} from "react-icons/md"
import { Link } from 'react-router-dom'
import { authApi } from '../../_api/auth'
import { useNavigate } from "react-router-dom";
import {useRecoilValue} from "recoil"
import { accountTypeState } from '../../../Recoil/globalstate'
import ClipLoader from "react-spinners/ClipLoader";
import mail from "../../../assets/icons/email.png"
import gmail from "../../../assets/icons/google.png"
import linkdin from "../../../assets/icons/linkdin.png"
import { Alert, Avatar, Button, Divider, InputBase } from "@mui/material";
import { userState } from '../../../Recoil/globalstate';
import { useRecoilState } from 'recoil';
export default function Login() {
    const [currentUser,setcurrentUser]=useRecoilState(userState)
    let navigate = useNavigate();
    useEffect(()=>{
        localStorage.clear();

    },[])
    const [errorMsg, setErrorMsg] = useState(null)
    const account =useRecoilValue(accountTypeState)
    console.log(account,"email")

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [isLoading,setLoader]=useState(false)





    const auths=[
        {
            icon:gmail,
            name:"Sign in with Google",
            link:"",
            click:async()=>{ 
                setErrorMsg(null)
                 try{
                    const user=await authApi.googleLogin()
            
                    setLoader(false)
                    localStorage.clear();
                    user?.id.length >0&&localStorage.setItem('user',JSON.stringify(user));
                    user?.id.length >0&& navigate(`/ai}`)

                //      console.log(user,"user")
                //     const accounts=[...user?.ecosystems,...user?.organizations]

                //     console.log(accounts,accounts?.length,"accc")
                //     console.log(user?.individual)
                //     if(accounts?.length >0){
                //         user?.id.length >0&& navigate(`/home/${accounts[0]?.id}`)
                //         console.log("top")
                //      }else{
                //         if(user?.individual != undefined){
                //             console.log("mid")

                //             user?.id.length >0&& navigate(`/home/${user?.individual?.id}`)
                //         }else{
                //             console.log("last")
                //             user?.id?.length >0&&setcurrentUser(user)
                //             user?.id.length >0&& navigate(`/create-account`)

                //     }
                
                //    }

                    // console.log(user?.display?.length,user?.display,"oo")
                    // if(accounts[0]?.id?.length >0){
                    //     user?.id.length >0&& navigate(`/home/${accounts[0]?.id}`)
                    //   }else{
                    //    if(user?.display?.length ===0){

                    //       console.log("in here 1")
                           
                    //        user?.id?.length >0&&setcurrentUser(user)
                    //        user?.id.length >0&& navigate(`/create-account`)
                    //    }else{
                    //     user?.id.length >0&& navigate(`/home/${user?.id}`)
                    //     console.log("in here 22")
                    //    }
                    // }
                   }catch(e){
                     console.log(e)
                     setErrorMsg(e.message)
                  }

            }
            
    
        },
        // {
        //     icon:linkdin,
        //     name:"Sign in with LinkedIn",
        //     link:"",
        //     click:()=>{navigate("email-password")}
    
        // }
     ]

    const login=async()=>{
         
       
          setLoader(true)
          setErrorMsg(null)

          if (email.length < 3) {
            setErrorMsg(' email is invalid ');
            setLoader(false);
            return;
          }
  
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
              setErrorMsg( "email is invalid" );
              setLoader(false);
          }
          try{
             const user=await authApi.login(email,password)
             console.log(user,"userrr")
            
             setLoader(false)
             user?.id.length &&localStorage.clear();
             user?.id.length >0&&localStorage.setItem('user',JSON.stringify(user));
             user?.id.length >0&& navigate(`/ai}`)
            //  const accounts=[...user?.ecosystems,...user?.organizations]
            //  console.log(accounts,accounts?.length,"accc")
            //   if(accounts?.length >0){
            //     user?.id.length >0&& navigate(`/home/${accounts[0]?.id}`)
            //   }else{
            //      if(user?.individual != undefined){
            //         user?.id.length >0&& navigate(`/home/${user?.individual?.id}`)
            //      }else{
            //         user?.id?.length >0&&setcurrentUser(user)
            //         user?.id.length >0&& navigate(`/create-account`)

            //      }
           
            //  }
    
            //  console.log(accounts,"accc")
            //  if(accounts[0]?.id?.length >0){
            //     user?.id.length >0&& navigate(`/home/${accounts[0]?.id}`)
            //   }else{
            //    if(user?.display?.length ==0){
                   
            //        user?.id?.length >0&&setcurrentUser(user)
            //        user?.id.length >0&& navigate(`/create-account`)
            //    }else{
            //     user?.id.length >0&& navigate(`/home/${user?.id}`)
            //    }
            // }
               


            }catch(e){
                console.log(e)
                setErrorMsg(e.message);
                setLoader(false)
            }
   


        }




  return (
    <div className='w-full flex justify-center  '>
            <div className='w-4/5 flex bg-white rounded-lg  border flex-col items-center space-y-8 py-8' style={{borderColor:" linear-gradient(0deg,rgba(130, 122, 247, 0.5), rgba(130, 122, 247, 0.5)),linear-gradient(0deg, #FFFFFF, #FFFFFF)"}}>
                 <h5 className='text-xl font-semibold text-center'>Sign in to your Guzo account.</h5>
                    <div className='px-8 py-1 w-3/5'>
                        {errorMsg && (
                        // <FadeIn><Alert severity="error">{errorMsg}</Alert></FadeIn>
                        <Alert severity="error">{errorMsg}</Alert>
                        )}

                    </div>

                    <div className='flex flex-col w-full items-center px-10 space-y-4'>
                        
                        <div className='flex flex-col w-3/5 space-y-4'>
                            <div className='flex flex-col w-full space-y-2'>
                                    <label className='text-sm text-slate-700'>Email</label>
                                    <input 
                                        placeholder='Email'
                                        className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                        name="email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />

                            </div>

                            <div className='flex flex-col w-full space-y-2'>
                                    <label className='text-sm text-slate-700'>Password</label>
                                    <input 
                                        placeholder='Password'
                                        className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    />

                            </div>

                            

                            <div className='py-2 flex justify-start w-full'>
                                <Link to="/reset">
                                <h5 className='text-purple-600 text-sm underline'>Forgot password?</h5>

                                </Link>
                            </div>

                        </div>
                    

                    </div>

                    
                      

                      <div className='flex flex-col items-center space-y-3'>
                          {isLoading?
                             
                             <ClipLoader 
                                 color={"rgba(62, 51, 221, 1)"}
                                 loading={isLoading}
                             />
                             :
                            <button className='text-blue-700 rounded-full px-12 py-1.5'
                                style={{background: "rgba(236, 235, 254, 1)"}}
                                onClick={login}
                              
                                >
                                   Sign in
                            </button>
                           


                        }

                          {/* <p className='text-sm font-semibold w-1/2'>
                             By signing up, you agree to 

                             <span className='text-blue-700 underline'> Terms of Service</span>, 
                             <span className='text-blue-700 underline'>Privacy Policy</span>, and 
                             <span className='text-blue-700 underline'> Cookie Policy</span>.
                          </p> */}

                      </div>


                      <div className='flex flex-col space-y-4 items-center w-full'>
                            <h5 className='h-0.5  w-1/3 text-black border '></h5>
                            <div className='flex flex-col w-1/3 space-y-4'>

                                {auths?.map((auth)=>{
                   
                                    
                                        return(
                                            <>
                                            <div className='flex items-center space-x-6 px-4 w-full border py-3 rounded-lg '
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


                            </div>


                            <h5 className='h-0.5  w-1/3 text-black border '></h5>
                            <div className='flex flex-col space-y-2 items-center w-full'>
                             <h5>Don’t have an account?</h5>
                            <Link to="/">
                                <button className='border border-blue-700 text-blue-700 rounded-full px-10 py-1'>Sign up</button>
                            </Link>
        

                     </div>


                  </div>
               
 
            </div>

    </div>
  )
}


