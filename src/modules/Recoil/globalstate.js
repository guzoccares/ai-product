import {atom} from "recoil"


export const accountTypeState =atom({
   key:"account",
   default:"Individual"
})

export const groupState =atom({
   key:"hotel",
   default:{id:""}
})

export const userState =atom({
    key:"user",
    default:{id:""}
 })



 export const updateUserState =atom({
   key:"updateuser",
   default:false
})