import {ActType} from "../actions/actions";
const initState = {
  swc : false
};

export function ClickReducer(state=initState,action) {
   switch (action.type) {
     case ActType.CLICK:{
       return {
         ...state,swc:action.swc
       }
     }
     default:{
       return state
     }
   }
}