import { CircularProgress } from "@mui/material";
import axios from "axios";
import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./authentication/Index";
import Invite from "./authentication/Invite";
import Share from "./authentication/Share";
import Profile from "./OrgProfile";
import Home from "./Home/views";
import Feeds from "./Home/views/feed";
import Ecosystems from "./Home/views/ecosystem";
import Connections from "./Connections";
import Active from "./Connections/views/active";
import Pending from "./Connections/views/pending";
import Collaborations from "./Collaborations";
import Myopportunities from "./Collaborations/views/myopportunities";
import JoinedOpportunities from "./Collaborations/views/joinedOpportunities";
import Contacts from "./Collaborations/views/contacts";
import Messenger from "./Messenger";
import GroupChat from "./Messenger/views/groupchat";
import DM from "./Messenger/views/dm";
import { Onboarding,
       Accounts,
       Register,EmailAuth,
       AuthTypes,FactorAuth,
       CreateProfiles,
       Individual,
       Eco,
       Login
      } from "./Onboarding";
import Org from "./Onboarding/views/Profiles/org";
import Notifications from "./Notifications";
import {Settings ,EditProfile} from "./Settings";
import Posts from "./OrgProfile/views/posts";
import Members from "./OrgProfile/views/members";
import Ecosystem from "./Ecosystem/views";
import { onAuthStateChanged } from "firebase/auth"
import { userState } from "./Recoil/globalstate";
import { useRecoilState } from 'recoil';
import { auth,db } from "./Firebase";
import { doc,getDoc}  from "firebase/firestore";
import EcoMembers from "./Ecosystem/views/members";
import ViewProfile from "./ViewProfile";
import Feed from "./Feed";
import { Collaboration,Post,CollabContacts } from "./Collaboration";
import Teammates from "./Teammates";
import ForgetPassword from "./Onboarding/views/ForgetPassword";
import { CreateAccount,
         AccountTypes,
         AccountProfiles,
         IndividualAccount,
         EcoAccount,
         OrgAccount
         } from "./CreateAccount";
import { groupState } from "./Recoil/globalstate";

import PostManagemnet from "./Ecosystem/views/post";
import ErrorBoundary from "./ErrorBoundary";
import AuthGuard from "./AuthGuard";
import { useNavigate } from 'react-router-dom'
import Local from "./Notifications/views/local";
import Global from "./Notifications/views/global";
import SpaceSettings from "./spaceSettings/views";
import PosterProfile from "./Profile ";
import AiChat from "./Aichat/views";
import AiResources from "./AiResources/views";
import AiProfile from "./Aiprofile/views";
import Account from "./Account/views";
import AiMessenger from "./AiMessenger /views";

const NewRoutes = () => {
  const navigate =useNavigate()


  const [currentUser,setcurrentUser]=useRecoilState(userState)
  const group=useRecoilState(groupState)
  console.log(currentUser,"user")
  let authListner=null
  const user = localStorage.getItem("user");
  useEffect( ()=>{ 
    console.log(JSON.parse(user),"user")
    if(JSON.parse(user)?.id?.length >0){
      setcurrentUser(JSON.parse(user)?.organizations[0])
    }
 
  },[user])

  useEffect( ()=>{
    if(group?.id?.length >0){
      const unsub = onSnapshot(
        doc(db, "ecosystems", "74hCT0Z4T5Tcft68HMJ2"), 
        { includeMetadataChanges: true }, 
        (doc) => {
          // ...
  
          console.log(true,"ecosysysy listener")
        });

    }
     
  
  },[group])





  return (
    <>       
            <ErrorBoundary>
              <Routes>
       
                <Route path="/auth/*" element={<Index/>} />
                <Route path="/" element={<Onboarding/>} >
                     <Route path="accounts" element={<Accounts/>} />
                      <Route path="" element={<Register/>} >
                          <Route path="" element={<AuthTypes/>} />
                          <Route path="email-password" element={<EmailAuth/>} />
                          <Route path="login" element={<Login/>} />
                          <Route path="reset" element={<ForgetPassword/>} />

                      </Route>
                    
                      <Route path="2fa" element={<FactorAuth/>} />
                    <Route path="create-profile" element={<CreateProfiles />} >
                        <Route path="" element={<Individual currentUser={currentUser}/>}   />
                        <Route path="org" element={<Org currentUser={currentUser}/>} />
                        <Route path="ecosystem" element={<Eco currentUser={currentUser}/>} />
                    </Route>
                </Route>
                <Route path="/share" element={<Share/>} />
                <Route path="/invite" element={<Invite/>} />
                 <Route path="/profile/:id/*" element={<Profile/>}  />
                  
                 <Route path="/eco-profile/:id/*" element={<ViewProfile/>}>
            
                     
                     
                  </Route>
                <Route path="/home/:id/*" element={<AuthGuard><Home/></AuthGuard>} >
                    <Route path="" element={<Feeds/>} />
                    <Route path="ecosystems" element={<Ecosystems/>} />
                </Route>
                <Route path="/connections/:id/*" element={<Connections/>} >
                     <Route path="" element={<Active/>} />
                     <Route path="pending" element={<Pending/>} />
                </Route>
                <Route path="/collaborations/:id/*" element={<Collaborations/>} >
                     <Route path="" element={<Myopportunities/>} />
                     <Route path="joined" element={<JoinedOpportunities/>} />
                     <Route path="contacts" element={<Contacts/>} />
                </Route>
                <Route path="/collaboration/:id/*" element={<Collaboration/>} >
                     <Route path="" element={<Post/>} />
                     <Route path="contacts" element={<CollabContacts/>} />
                </Route>
                <Route path="/messages/:id/*" element={<Messenger/>} >
                     <Route path="" element={<DM/>} />
                     <Route path="group" element={<GroupChat/>} />
                
                </Route>
                <Route path="/notifications/:id/*" element={<Notifications/>} >
                    <Route path="global" element={<Local/>} />
                    <Route path="" element={<Global/>} />

                </Route>
                <Route path="/settings/:id/*" element={<AuthGuard><Settings/></AuthGuard>} />
                <Route path="/settings-/:id/*" element={<AuthGuard><SpaceSettings/></AuthGuard>} />
                <Route path="/setting-edit-profile/:id/*" element={<EditProfile/>} />
                <Route path="/ecosystem/:id/*" element={< Ecosystem />} >
                    <Route path="" element={<EcoMembers/>} />
                    <Route path="post" element={<PostManagemnet/>} />
                </Route>
                <Route path="/feed/:id" element={<Feed/>} />
                <Route path="/team/:id/*" element={<Teammates/>} />
                <Route path="/create-account" element={<CreateAccount/>} >
                   <Route path="" element={<AccountTypes/>} />
                    <Route path="profile" element={<AccountProfiles/>} >
                       <Route path="Individual" element={<IndividualAccount/>} />
                       <Route path="ecosystem" element={<EcoAccount/>} />
                       <Route path="organization" element={<OrgAccount/>} />
                    </Route>

                </Route>

                <Route path="/posterprofile/:id/*" element={<PosterProfile/>}>
                </Route>


                <Route path="/ai" element={<AiChat/>}></Route>
                <Route path="/resources" element={<AiResources/>}></Route>
                <Route path="/resource-profile/:id/*" element={<AiProfile/>} />
                <Route path="/account" element={<Account currentUser={currentUser}/>}  />
                <Route path="/ai-messenger" element={<AiMessenger/>}  />
              
            </Routes>
            </ErrorBoundary>
     
       
    </>
  );
};

export default NewRoutes;
