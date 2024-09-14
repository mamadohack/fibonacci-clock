import { useContext, useEffect } from "react";
import Clock from "./Clock";
import { MainContext,MainContexttype } from "./ContextProvider";
interface ClockContainer {
    boxes: [];
    colorKey: string;
    updateTime: (hours:number, minutes:number, seconds:number)=>void;
    areNumbersVisible: boolean;
  }
function ClockContainer({boxes,colorKey,updateTime,areNumbersVisible}:ClockContainer) {
    const {state,changeState} = useContext(MainContext) as MainContexttype

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
      boxes={boxes}
      colorKey={colorKey}
      areNumbersVisible={areNumbersVisible}
    />
  );
}

export default ClockContainer;
