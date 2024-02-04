import axios from "axios";



export const aiAPi= {

     keywords:async function (text) {


        const url=`https://guzo-ai.onrender.com/ai`
    

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
