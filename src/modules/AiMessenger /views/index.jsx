import React,{useEffect,useRef,useState} from 'react'
import Layout from '../../Layout'
import Contacts from '../components/contacts'
import Chatbox from './chatbox'
import { userState,groupState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'
import { io } from "socket.io-client";
import {doc,setDoc,
       addDoc,collection,
       getDoc,getDocs,
       query, where,updateDoc,orderBy,onSnapshot} from "firebase/firestore"
import { db } from '../../Firebase'
import { useLocation} from "react-router-dom";
import GroupChat from './groupchat'
import NewLayout from '../../Layout/layout'


export default function AiMessenger() {

  
   const socket = useRef();

   const location =useLocation()
   const currentUser=useRecoilValue(userState)
   const [currentChat,setCurrentChat] =useState()
   const [receiverInfo,setReceiver] =useState({})
   const [messages,setMessages]=useState([])
   const [active,setActive]=useState("dm")
   const [conversations,setConversations]=useState([])
   const [groups,setGroups]=useState([])
   const [textsubmit,setTextsubmit]=useState(false)

   const [isLoading,setLoader]=useState(false)
   const [newMessage, setNewMessage] = useState("");
   const [areContacts,setContacts]=useState("")



    useEffect(()=>{
      const getConversations = async () => {
          try{
          
            console.log(currentUser?.id,"cur conv")
            const q = query(collection(db, "conversations"), where("members", "array-contains",currentUser?.id),orderBy("lastMessage", "desc"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
              const convs= [];
              querySnapshot.forEach((doc) => {
                   console.log("qqqqqqqqqq")
                  convs.push({...doc?.data(),id:doc?.id});
                  console.log(doc?.id,"id")
               
              });
                 console.log(convs,"convssssss")
                 convs?.length===0 &&setContacts("No contact")
                 convs?.length >0 &&setContacts("")
              setConversations(convs)
            })
            
      
         
           }catch(error){
            console.log(error)
          }
        };

        if(currentUser?.id?.length >0){
          getConversations();
        }
        
   
       },[currentUser?.id])  

       useEffect(()=>{
           const seen=async()=>{
              const result = await updateDoc(doc(db,"unseen",currentUser?.id), {
                messages:false
              })
           }

           currentUser?.id?.length >0&& seen()
           
         },[currentUser?.id])

     console.log(currentUser,conversations,"grou chatatt")


     const send=async (e)=>{
        console.log(newMessage,"sending")
        if (newMessage?.length == 0) {
          return;
        }
        e.preventDefault();
        setLoader(true)

        console.log(currentUser,"user >.>>>")
        
        const message = {
          sender: {
               id:currentUser?.id,
               img: currentUser?.img?.length >0?currentUser?.img :"",
              //  type:currentUser?.type?.length>0&&currentUser?.type ,
               name:currentUser?.name?.length ===undefined?`${currentUser?.firstName + currentUser?.lasttName}`:currentUser?.name,
             
          },
          text: newMessage,
          conversationid:currentChat.id,
          date:Number(Date.now()),
          time:new Date()
        };
        const receiverId = currentChat?.members.find(
          (member) => member !== currentUser.id
        );
 
          setTextsubmit(false)
        try{
          
            const docRef = await addDoc(collection(db, "messages"),message);
        
             const docSnap = await getDoc(docRef);
             console.log(docSnap?.data(),"came")
             docSnap?.exists()&& setNewMessage("")
             docSnap?.exists()&& setLoader(false)
             const receiver= currentChat?.members?.find((member)=>member !=currentUser?.id )
             console.log(receiver,"reci")
             const result = await updateDoc(doc(db,"unseen",receiver), {
                 messages:true
               })
            await updateDoc(doc(db,"conversations",currentChat?.id), {
               lastMessage:Number(new Date()),
               unseen:true,
               lastSender:currentUser?.id
              })

       
      
            }catch (err) {
              console.log(err)
              setLoader(false)
          }
      }
  
    


  return (
    <NewLayout>
             <div className='w-full flex justify-center'>

 
       <div className='flex w-3/4 space-x-6 px-12'>
          <div className='w-1/3   overflow-y-scroll no-scrollbar' style={{ height:"80vh"}}>
             <Contacts 
                conversations={conversations}
                setCurrentChat={setCurrentChat}
                currentChat={currentChat}
                currentUser={currentUser}
                receiverInfo={receiverInfo}
                setReceiver={setReceiver}
                groups={groups}
                active={active}
                setActive={setActive}
                areContacts={areContacts}
               
               />
          </div>
          <div className='w-3/5 h-96 bg-white' style={{height:"80vh"}}>
            {active==="dm"&&
                <Chatbox 
                currentChat={currentChat}
                messages={messages}
                send={send}
                setNewMessage={setNewMessage}
                currentUser={currentUser}
                receiverInfo={receiverInfo}
                conversations={conversations}
                newMessage={newMessage}
                isLoading={isLoading}
                
                
              
              />

            }

    

         </div>


       </div>

       </div>
    </NewLayout>
   
  )
}
