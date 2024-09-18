import { useContext, useEffect, useRef } from "react";
import { MainContext, MainContexttype } from "./ContextProvider";
import { formatTime, updateBoxes } from "./util/helper";

function UpdateTime() {
    console.log('UpdateTime rended');
  const intervalId = useRef<any>(null);
  const {state,changeState} = useContext(MainContext) as MainContexttype

  function updateTime(hours: number, minutes: number, seconds: number) {
    const newCurrentTime = formatTime(hours, minutes, seconds)
    changeState((p:any) => {return {...p,currentTime: newCurrentTime,
      boxes: updateBoxes(p.boxes, newCurrentTime.hours, newCurrentTime.minutes)}})
  }
  const getCurrentTime = () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    updateTime(hours, minutes, seconds)
  }
  const startClock = () => {
    intervalId.current = setInterval(getCurrentTime, 100 * 15);
  };
  const stopClock = () => {
    clearInterval(intervalId.current);
  }
  useEffect(() => {
    startClock();

    return () => {stopClock()}
  }, []);
  return null;
}

export default UpdateTime;
