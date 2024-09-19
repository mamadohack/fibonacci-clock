import { useContext, useEffect, useRef, useState } from "react";
import { MainContext, MainContexttype } from "./ContextProvider";
import { formatTime, updateBoxes } from "./util/helper";

function PlayStopClock() {
  const timeRest= 60- (new Date().getSeconds());
  const [delaytimer,setDelayTimer] = useState(timeRest);
  if(timeRest !== delaytimer) setDelayTimer(timeRest);
  const intervalIdClock = useRef<any>(null);
  const { state, changeState } = useContext(MainContext) as MainContexttype;
  function updateTime() {
    const now = state.realTime;
    now.setMinutes(now.getMinutes() + 1);
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const newCurrentTime = formatTime(hours, minutes, seconds);
    changeState((p: any) => {
      return {
        ...p,
        realTime: now,
        currentTime: newCurrentTime,
        boxes: updateBoxes(
          p.boxes,
          newCurrentTime.hours,
          newCurrentTime.minutes,
          p.SameDisplay
        ),
      };
    });
  }

  const startClock = () => {
    intervalIdClock.current = setInterval(updateTime, 1000 * delaytimer);
  };
  const stopClock = () => {
    clearInterval(intervalIdClock.current);
  };
  useEffect(() => {
    startClock();

    return () => {
      stopClock();
    };
  }, [delaytimer]);

  return null;
}

export default PlayStopClock;
