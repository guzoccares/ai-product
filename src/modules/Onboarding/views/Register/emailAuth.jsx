import React,{useState} from 'react'
import {MdLocationPin} from "react-icons/md"
import { Link } from 'react-router-dom'
import { authApi } from '../../_api/auth'
import { useNavigate } from "react-router-dom";
import {useRecoilValue} from "recoil"
import { accountTypeState } from '../../../Recoil/globalstate'
import ClipLoader from "react-spinners/ClipLoader";

export default function EmailAuth() {
    let navigate = useNavigate();

    const account =useRecoilValue(accountTypeState)
    console.log(account,"email")

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [firstName,setFirst]=useState("")
    const [lastName,setLast]=useState("")
    const [isLoading,setLoader]=useState(false)

    const signUpWithEmail=async()=>{
        const payload={
            email,
            firstName,
            lastName,
            organizations:[],
            ecosystems:[],
            pending:[]

          }
          setLoader(true)
          try{
             const uid =await authApi.register(email,password,payload)
             console.log(uid)
             let route=""
             if(account==="Organization"){
                route="org"
             }else if(account==="Ecosystem"){
                route="network"
             }
             setLoader(true)
             uid.length >0&& navigate(`/new/onboard/profile/${route}`)

            }catch(e){
                console.log(e)
            }
   


        }

  return (
    <div className='w-full flex justify-center  '>
            <div className='w-1/2 flex bg-white rounded-lg  border flex-col  space-y-8 py-8' style={{borderColor:" linear-gradient(0deg,rgba(130, 122, 247, 0.5), rgba(130, 122, 247, 0.5)),linear-gradient(0deg, #FFFFFF, #FFFFFF)"}}>
                 <h5 className='text-xl font-semibold text-center'>Sign up with Email</h5>

                    <div className='flex flex-col w-full px-6 space-y-4'>
                        <div className='flex items-center w-full space-x-4'>
                            <div className='flex flex-col w-1/2 space-y-2'>
                                <label className='text-sm text-slate-700'>First Name</label>
                                <input 
                                    placeholder='First Name'
                                    className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                    style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e)=>setFirst(e.target.value)}

                                />

                            </div>
                            <div className='flex flex-col w-1/2 space-y-2'>
                                <label className='text-sm text-slate-700'>Last Name</label>
                                    <input 
                                        placeholder='Last Name'
                                        className=' py-2 px-4 w-full rounded-md text-sm outline-none  '
                                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e)=>setLast(e.target.value)}
                                    />

                            </div>

                        </div>
                        <div className='flex flex-col w-full space-y-4'>
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
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    />

                            </div>

                            <div className='flex flex-col w-full space-y-2'>
                                    <label className='text-sm text-slate-700'>Location</label>
                                    <div className='flex items-center space-x-4 px-4 rounded-md'
                                    style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                    >
                                        <MdLocationPin 
                                        className="text-slate-500 font-semibold text-lg "
                                        />
                                            <input 
                                                placeholder='Neighborhood, City, or Zip'
                                                className=' py-2  w-full rounded-md text-sm outline-none'
                                                style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                            
                                            />
                                    </div>
                                

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
                            <button className='text-blue-700 rounded-full px-8 py-1.5'
                                style={{background: "rgba(236, 235, 254, 1)"}}
                                onClick={signUpWithEmail}
                            
                                >
                                Sign up
                            </button>
                           


                        }
                         {/* <Link to="">
                              <button className='text-blue-700 rounded-full px-8 py-1.5'
                                style={{background: "rgba(236, 235, 254, 1)"}}
                                onClick={signUpWithEmail}
                            
                               >
                                Sign up
                            </button>
                          </Link> */}

                          <p className='text-sm font-semibold w-1/2'>
                             By signing up, you agree to 

                             <span className='text-blue-700 underline'> Terms of Service</span>, 
                             <span className='text-blue-700 underline'>Privacy Policy</span>, and 
                             <span className='text-blue-700 underline'> Cookie Policy</span>.
                          </p>

                      </div>
               
 
            </div>

    </div>
  )
}

