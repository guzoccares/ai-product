import React,{useState,useRef,useEffect} from 'react'
import {AiOutlineMail} from "react-icons/ai"
import {MdLocationPin} from "react-icons/md"


// import ClipLoader from "react-spinners/ClipLoader";
// import { useOutletContext } from 'react-router-dom'
// import { Alert, Avatar, Button, Divider, InputBase } from "@mui/material";
import ReactSelect from "react-select";
import axios from "axios"
import { BsFlag } from 'react-icons/bs'


export default function IndividualForms({profile,setUpdate}) {

        const [country, setSelectedCountry] = useState();
        const [city, setSelectedCity] = useState();
        const [countries, setCountries] = useState(null);


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

        return(
            <div className="py-6 flex flex-col space-y-4">
       
                 <div className='flex flex-col w-full '>  

                    <label className='text-sm text-slate-600 font-semibold'>Individual Account Display Name*</label>
                    <input 
                        placeholder='Display Name'
                        className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                        name="displayName"
                        value={profile?.display}
                        onChange={(e)=>setUpdate({...profile,display:e.target.value})}
                    />

                    <h5 className='font-light text-slate-500 text-sm '>
                        {/* {errorMsg ?
                            <span className='text-red-600'>{errorMsg}</span>
                            :

                            "This will be the name that displays for your individual account."
                        } */}
                         This will be the name that displays for your individual account
                        
                    </h5>

                    </div>
    
           
    
    


               <div className='flex flex-col w-full space-y-2 '>
                    <label className='text-sm text-slate-700'>Location*</label>
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
                                setUpdate({...profile,location:opt?.label})
                                setSelectedCountry(opt);
                            // setSelectedCity({label:opt?.cities[0], value :opt?.cities[0]})
                            }}
                        />
                    </div>

                  </div>

                  <h5 className='font-light text-slate-500 text-sm '>Where are you located?</h5>
                            

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
                        <input 
                            placeholder='Add tags separated by a comma'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                            style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                        />

                        <h5 className='font-light text-slate-500 text-sm '>Tags help Guzo curate relevant connections and opportunities.</h5>

                 </div>
           
            
            </div>
        )
    }

