import React,{useState,useRef,useEffect} from 'react'
import {AiOutlineMail} from "react-icons/ai"
import {MdLocationPin} from "react-icons/md"


// import ClipLoader from "react-spinners/ClipLoader";
// import { useOutletContext } from 'react-router-dom'
// import { Alert, Avatar, Button, Divider, InputBase } from "@mui/material";
import ReactSelect from "react-select";
import axios from "axios"
import { BsFlag } from 'react-icons/bs'
import { IoCloseOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";



export default function OrgForms({profile,setUpdate,tags,setTags}) {

        const [country, setSelectedCountry] = useState();
        const [city, setSelectedCity] = useState();
        const [countries, setCountries] = useState(null);
        // const [tags,setTags]=useState([])
        const [tag,setTag]=useState("")


        useEffect(() => {
            getCountries();
        }, []);
        
        async function getCountries() {
            await axios
            .get("https://countriesnow.space/api/v0.1/countries/")
            .then((response) => {
                setCountries(response?.data?.data);
            });
        }
        
        const style = {
            control: (base) => ({
            ...base,
            border: "0px solid rgba(242,242,242,0.6)",
            width: "100%",
            boxShadow: "none",
            backgroundColor: "rgba(242,242,242,0.6)",
            fontSize: "14px",
            "@media (min-width:600px)": {
                width: "100%",
            },
            "@media (min-width:1200px)": {
                width: "100%",
            },
            }),
        };
          
        const createTag=()=>{
            setTags(prevArray => [...prevArray, tag]);

            setTag("")
          
         
           
  
          }
          console.log(profile,tags,"profile org edit")
  
          const remove=(indexToRemove)=>{
   
            const newArray = [...tags.slice(0, indexToRemove), ...tags.slice(indexToRemove + 1)];
  
            // Update the array state
            setTags(newArray);
          }
        
        return(
            <div className="py-6 flex flex-col space-y-4">
       
                  <div className='flex flex-col w-full'>  
    
                           <label className='text-sm text-slate-600 font-semibold'>Organization Name*</label>
                            <input 
                                placeholder='Ecosystem Space Name'
                                className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                // name="ecoName"
                                value={profile?.name}
                                onChange={(e)=>setUpdate({...profile,name:e.target.value})}
                            />
        
                            <h5 className='font-light text-slate-500 text-sm '>This email will NOT be shared on the organization profile. This email will be used for all Guzo correspondence.</h5>
        
                     </div>
    
                        <div className='flex flex-col w-full'>  
                            <label className='text-sm text-slate-600 font-semibold'>Organization Contact Email*</label>
                            <div className='flex items-center space-x-4 px-4 rounded-md'
                                    style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                    >
                                    <AiOutlineMail
                                        className="text-slate-500 font-semibold text-lg "
                                    />
                                    <input 
                                        placeholder='Email'
                                        className=' py-2  w-full rounded-md text-sm outline-none'
                                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                        // name="ecoEmail"
                                        value={profile?.email}
                                        onChange={(e)=>setUpdate({...profile,email:e.target.value})}
                                
                                    />
                          </div>
                         <h5 className='font-light text-slate-500 text-sm '>This email will NOT be shared on the ecosystem profile. This email will be used for all Guzo correspondence.</h5>
        
                     </div>
    
    
                        <div className='flex flex-col w-full '>  
    
                            <label className='text-sm text-slate-600 font-semibold'>Contact Phone Number*</label>
                                <div className='flex items-center space-x-4 px-4 rounded-md'
                                style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                >
                                <BsFlag
                                    className="text-slate-500 font-semibold text-lg "
                                        />
                                <input 
                                    placeholder='(201) 555-0123'
                                    className=' py-2  w-full rounded-md text-sm outline-none'
                                    style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                    name="phoneNum"
                                    value={profile?.phone}
                                    onChange={(e)=>setUpdate({...profile,phone:e.target.value})}
                            
                            
                                />
                            </div>
    
                            <h5 className='font-light text-slate-500 text-sm '>This phone number will NOT be shared on the organization profile. This phone number is for Guzo organization verification.</h5>
    
                      </div>


               <div className='flex flex-col w-full space-y-2 '>
                    <label className='text-sm text-slate-700'>Organization Location*</label>
                    <div className='flex items-center space-x-4 px-4 rounded-md'
                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                     >
                    <MdLocationPin 
                    className="text-slate-500 font-semibold text-lg "
                    />
                   
                  <div className="border-[1px] border-[rgba(242,242,242,0.6)] rounded-[8px] w-full">
                        <ReactSelect
                            styles={style}
                            placeholder={profile?.location}
                            options={
                            countries &&
                            countries?.map((item, index) => ({
                                label: item?.country + "," + item?.iso3,
                                value: item?.country,
                                cities: item?.cities,
                            }))
                            }
                            value={country}
                            menuPlacement="auto"
                            menuPosition="fixed"
                            noOptionsMessage={(opt) => {
                            if (opt.inputValue === "") {
                                return "Select your country";
                            } else {
                                return "no search results for " + opt?.inputValue;
                            }
                            }}
                            components={{
                            IndicatorSeparator: () => null,
                            }}
                            onChange={(opt) => {
                            setSelectedCountry(opt);
                            // setSelectedCity({label:opt?.cities[0], value :opt?.cities[0]})
                            setUpdate({...profile,location:opt?.label})
                            }}
                        />
                    </div>

                  </div>

                  <h5 className='font-light text-slate-500 text-sm '>Where is your ecosystem headquartered?</h5>
                            

              </div>

               <div className='flex flex-col w-full '>  
    
                    <label className='text-sm text-slate-600 font-semibold'>About*</label>
                       
                        <textarea
                            placeholder='About section'
                            className=' pb-6 pt-2 px-4  w-full rounded-md text-sm outline-none'
                            style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                            name="phoneNum"
                            value={profile?.about}
                            onChange={(e)=>setUpdate({...profile,about:e.target.value})}
                            
                    
                    
                        />
                 

                    <h5 className='font-light text-slate-500 text-sm '>Share something about you</h5>

                </div>
                
                <div className='flex flex-col w-full '>  

                        <label className='text-sm text-slate-600 font-semibold'>Descriptive Tags</label>
                           <div className='flex items-center space-x-4'>
                              <input 
                                    placeholder='Add tags separated by a comma...'
                                    className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                    style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                    value={tag}
                                    onChange={(e)=>setTag(e.target.value)}
                                />

                                <IoIosAddCircle
                                    className='text-4xl  text-blue-500 hover:text-blue-300' 
                                    onClick={()=>createTag()}
                                 />

                           </div>


                            

                            <h5 className='font-light text-slate-500 text-sm '>Tags help Guzo curate relevant connections and opportunities.</h5>

                     </div>

                     <div className='flex flex-wrap  justify-start items-center space-x-3 py-4 '>
                          
                             {tags?.map((tword,index)=>{
                                return(
                                   <button className="rounded-lg py-0.5  px-2 border text-sm text-slate-600 font-light space-x-6 flex items-center justify-between ">
                                     <span> {tword}</span>
                                     <IoCloseOutline 
                                       className='text-lg'
                                       onClick={()=>remove(index)}
                                     />

                                    </button>
                                )
                             })

                             }

                        </div>
            </div>

            
            
        )
    }

