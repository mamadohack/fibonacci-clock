import { useContext, useEffect } from "react";
import Clock from "./Clock";
import { MainContext, MainContexttype } from "./ContextProvider";
import { formatTime, updateBoxes } from "./util/helper";
import UpdateTime from "./UpdateTime";
import PlayStopClock from "./PlayStopClock";
interface ClockContainer {
  boxes: [];
  colorKey: string;
  updateTime: (hours: number, minutes: number, seconds: number) => void;
  areNumbersVisible: boolean;
}
function ClockContainer() {
  const { state, changeState } = useContext(MainContext) as MainContexttype;
  function updateTime(
    hours: number,
    minutes: number,
    seconds: number,
    now: Date
  ) {
    const newCurrentTime = formatTime(hours, minutes, seconds);
    changeState((p: any) => {
      return {
        ...p,
        currentTime: newCurrentTime,
        realTime: now,
        boxes: updateBoxes(
          p.boxes,
          newCurrentTime.hours,
          newCurrentTime.minutes
        ),
      };
    });
  }

  useEffect(() => {
    const now = state.realTime;
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    updateTime(hours, minutes, seconds, now);
  }, []);
  return (
    <>
      <Clock
        boxes={state.boxes}
        colorKey={state.colorKey}
        areNumbersVisible={state.areNumbersVisible}
      />
      <div id="Dashboard">
        <button
          className="btn"
          onClick={() => {
            changeState((p: any) => {
              return { ...p,
                 on_off_changing: !p.on_off_changing };
            });
          }}
        >
          stop/active mode changing
        </button>
        <button
          className="btn"
          onClick={() => {
            console.log('+5 min')
            const now = state.realTime;
            now.setMinutes(now.getMinutes() + 5);
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            updateTime(hours, minutes, seconds, now);
          }}
        >
          + 5 minite
        </button>
        <button
          className="btn"
          onClick={() => {
            console.log('-5 min')
            const now = state.realTime;
            now.setMinutes(now.getMinutes() - 5);
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            updateTime(hours, minutes, seconds, now);
          }}
        >
          - 5 minite
        </button>
      </div>
      {state.on_off_changing && <UpdateTime />}
      {state.start_stop_clock && <PlayStopClock />}
    </>
  );
}

export default ClockContainer;
