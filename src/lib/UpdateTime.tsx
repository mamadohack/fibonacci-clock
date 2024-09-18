import { useContext, useEffect, useRef } from "react";
import { MainContext, MainContexttype } from "./ContextProvider";
import { updateBoxes } from "./util/helper";

function UpdateTime() {
  console.log("UpdateTime rended");
  const intervalId = useRef<any>(null);
  const { state, changeState } = useContext(MainContext) as MainContexttype;

  const ChangeBoxes = () => {
    changeState((p: any) => {
      return {
        ...p,
        boxes: updateBoxes(
          p.boxes,
          p.currentTime.hours,
          p.currentTime.minutes
        ),
      };
    });
  };
  const startClock = () => {
    intervalId.current = setInterval(ChangeBoxes, 100 * 20);
  };
  const stopClock = () => {
    clearInterval(intervalId.current);
  };
  useEffect(() => {
    startClock();

    return () => {
      stopClock();
    };
  }, []);
  return null;
}

export default UpdateTime;
