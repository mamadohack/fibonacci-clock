import { createContext, useRef, useState } from "react";
import boxes from "./util/boxes";
import { formatTime } from "./util/helper";
export type MainContexttype = {
    state : any;
    changeState : (e:any) => void;
}

export const MainContext = createContext<MainContexttype | null >(null);
function ContextProvider({ children }: { children: React.ReactNode }) {
  const initialTime = new Date();
  const initialHours = initialTime.getHours();
  const initialMinutes = initialTime.getMinutes();
  const initialSeconds = initialTime.getSeconds();

  const [MainState, setMainState] = useState({
    boxes,
    colorKey: "sandy",
    realTime: initialTime,
    currentTime: formatTime(initialHours, initialMinutes, initialSeconds),
    areNumbersVisible: true,
    isOptionsOpen: false,
    on_off_changing:false,
    start_stop_clock:true
  });
  return <MainContext.Provider value={{state:MainState,changeState:setMainState}}>{children}</MainContext.Provider>;
}

export default ContextProvider;
