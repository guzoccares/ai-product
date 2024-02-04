import React ,{useState,useRef,useEffect} from 'react'

export default function Photo({url,setUrl,group,setUpdate,file,setFile}) {

    console.log(url,"url photo")
    
    const hiddenFileInput = useRef()

    const handleClick = event => {
        hiddenFileInput.current.click()
    }
    
    const handleChange = async(e)=> {
      
        const dir = e.target.files[0]
        console.log(dir,"dir photooooooo")
        if (dir) {
        // setUpdate({
        //     ...profile,
        //     img: URL.createObjectURL(dir)
        //     })
        // }
        setUrl({
          ...url,
          img: URL.createObjectURL(dir)
        })
        setFile({
            ...file,
            img:dir
         })

        
      }
   

    }


    const deletePhoto=()=>{
        group["img"]=""
      setFile({
          ...file,
          img:{}
       })

       
    }


  return (
    <div className='flex flex-col w-full space-y-3'>
    <h5 className='text-sm font-semibold w-full '></h5>

    <div className='flex flex-col items-center w-full space-y-4'>
      {url?.img?.length>0?
            <div className='rounded-full h-56 w-56 flex flex-col justify-center items-center'
                 >
                    <img 
                      src={url?.img}
                      className="rounded-full w-full h-full"
                    />
                  
                  <input 
                    type="file"
                    className='hidden'
                    ref={hiddenFileInput}
                    onChange={(e)=>handleChange(e)}
                />


                </div>
                :
                <div className='rounded-full h-56 w-56 flex flex-col justify-center items-center' style={{background: "rgba(242, 242, 242, 0.6)"}}
                >
                 {group?.img?.length >0?
                     <img 
                       src={group?.img}
                        className="rounded-full w-full h-full"
                      />
                    :
                    <h5 className='text-sm font-light'>No photo image*</h5> 
          


                 }
                 
                   <input 
                      type="file"
                      className='hidden'
                      ref={hiddenFileInput}
                      onChange={(e)=>handleChange(e)}
                   />

               </div>

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
              onClick={deletePhoto}
              >
               Delete
           </button>

       </div>

   </div>


</div>
  )
}
