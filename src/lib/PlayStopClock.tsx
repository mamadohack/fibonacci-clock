import { useContext, useEffect, useRef } from "react";
import { MainContext, MainContexttype } from "./ContextProvider";
import { formatTime, updateBoxes } from "./util/helper";

function PlayStopClock() {
  console.log("playstopclock");
  const intervalIdClock = useRef<any>(null);
  const { state, changeState } = useContext(MainContext) as MainContexttype;
  function updateTime(hours: number, minutes: number, seconds: number) {
    const newCurrentTime = formatTime(hours, minutes, seconds);
    changeState((p: any) => {
      return {
        ...p,
        currentTime: newCurrentTime,
        boxes: updateBoxes(
          p.boxes,
          newCurrentTime.hours,
          newCurrentTime.minutes
        ),
      };
    });
  }
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    updateTime(hours, minutes, seconds);
  };
  const startClock = () => {

    intervalIdClock.current = setInterval(getCurrentTime, 1000 * 60);
  };
  const stopClock = () => {
    clearInterval(intervalIdClock.current);
  };
  useEffect(() => {
    startClock();

    return () => {
      stopClock();
    };
  }, []);

  return null;
}

export default PlayStopClock;
