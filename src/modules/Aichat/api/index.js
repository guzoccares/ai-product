import axios from "axios";



export const aiAPi= {

     keywords:async function (text) {


        const url=`https://ai-guzo.onrender.com/`
    

        const config = {
            headers:{
                'Content-Type': 'application/json',
                },
                };

        
        try{
        
            const response= await axios.post(
                    url,
                     {
                       text:text
                     },
                    config
               )
              return response
            }catch(e){
            console.log(e)
            throw new Error(e)
            }
            
         }
     
    }
