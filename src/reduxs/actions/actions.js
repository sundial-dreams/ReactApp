export const ActType = {
   CLICK:Symbol("click"),
   ADD:Symbol("ADD")
};
export function ClickAct(swc) {
   return {
     type:ActType.CLICK,
     swc
   }
}