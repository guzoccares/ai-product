import React ,{useState,useRef,useEffect} from 'react'

export default function Cover({url,setUrl,group,file,setFile}) {


    const hiddenFileInput = useRef()

    const handleClick = event => {
        hiddenFileInput.current.click()
    }

    const handleChange = async(e)=> {
        const dir = e.target.files[0]
        console.log(dir,"dir")
        if (dir) {
        // setUpdate({
        //     ...profile,
        // cover: URL.createObjectURL(dir)
        //     })
        // }
        setUrl({
          ...url,
          cover: URL.createObjectURL(dir)
        })
        setFile({
            ...file,
            cover:dir
         })
      }
   

    }

    const deletCover=()=>{
      setUrl({
        ...url,
        cover:""
      })
      group["cover"]=""
       setFile({
          ...file,
          cover:{}
        })
       
    }

  return (
     <div className='flex flex-col w-full space-y-3'>
                <h5 className='text-sm font-semibold w-full '></h5>

                <div className='flex flex-col items-center w-full space-y-4'>
                     {url?.cover?.length>0?
                        <div className=' h-56 w-full flex flex-col justify-center items-center'
                            >
                                <img 
                                src={url?.cover}
                                className="w-full h-full"
                                />
                              <input 
                                type="file"
                                className='hidden'
                                ref={hiddenFileInput}
                                onChange={(e)=>handleChange(e)}
                            />


                              </div>
                            :
                            <>
                         
                          {group?.cover?.length >undefined || group?.cover?.length > 0 ?
                                <div className=' h-56 w-full flex flex-col justify-center items-center' style={{background: "rgba(242, 242, 242, 0.6)"}}
                                >
                                        <img 
                                        src={group?.cover}
                                            className=" w-full h-full"
                                        />
                                 </div>
                                :
                                <div className='w-full h-56  flex flex-col justify-center items-center' style={{background: "rgba(242, 242, 242, 0.6)"}}
                                >
                                     <h5 className='text-sm font-light'>No cover image*</h5> 
                                </div>
                    


                             }

                            <input 
                                type="file"
                                className='hidden'
                                ref={hiddenFileInput}
                                onChange={(e)=>handleChange(e)}
                            />

                   
                        </>

                   }


                    <div className='flex items-center space-x-6'>
                        <button
                        style={{background: "rgba(236, 235, 254, 1)"}}
                        className='text-blue-700 rounded-full px-8 py-1.5'
                        onClick={handleClick}
                        
                        
                        >
                           Edit
                        </button>
                        <button
                        className='text-white bg-black rounded-full px-8 py-1.5'
                        >
                        Delete
                    </button>

                </div>

            </div>


</div>
  )
}
