import { useContext, useEffect } from "react";
import Clock from "./Clock";
import { MainContext,MainContexttype } from "./ContextProvider";
import { formatTime, updateBoxes } from "./util/helper";
interface ClockContainer {
    boxes: [];
    colorKey: string;
    updateTime: (hours:number, minutes:number, seconds:number)=>void;
    areNumbersVisible: boolean;
  }
function ClockContainer() {
    const {state,changeState} = useContext(MainContext) as MainContexttype
    function updateTime(hours: number, minutes: number, seconds: number) {
      const newCurrentTime = formatTime(hours, minutes, seconds)
      changeState((p:any) => {return {...p,currentTime: newCurrentTime,
        boxes: updateBoxes(p.boxes, newCurrentTime.hours, newCurrentTime.minutes)}})
    }
    
    console.log(state)
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    updateTime(hours, minutes, seconds);
  }, []);
  return (
    <Clock
      boxes={state.boxes}
      colorKey={state.colorKey}
      areNumbersVisible={state.areNumbersVisible}
    />
  );
}

export default ClockContainer;
