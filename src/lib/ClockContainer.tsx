import { useContext, useEffect } from "react";
import Clock from "./Clock";
import { MainContext, MainContexttype } from "./ContextProvider";
import { formatTime, updateBoxes } from "./util/helper";
import UpdateTime from "./UpdateTime";
import PlayStopClock from "./PlayStopClock";
import DigitalClock from "./DigitalClock";
import "./FiboClock.css";
import classNames from "classnames";
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
      <div id="clock_state">
        <p>
          <h3>Clock State</h3>
        </p>
        <h3 style={{ paddingBlock: "10px", textAlign: "center" }}>
          <span style={{ marginRight: "20px" }}>
            <span>Fibonacci Clock : </span>
            <em style={{ color: state.start_stop_clock ? "green" : "red" }}>
              {state.start_stop_clock ? "Works" : "stopped"}
            </em>
          </span>
          <span>
            <span>Fast Box Changing Mode : </span>
            <em style={{ color: state.on_off_changing ? "green" : "red" }}>
              {state.on_off_changing ? "ON" : "OFF"}
            </em>
          </span>
        </h3>
      </div>
      <Clock
        boxes={state.boxes}
        colorKey={state.colorKey}
        areNumbersVisible={state.areNumbersVisible}
      />
      <DigitalClock
        hours={state.realTime.getHours()}
        minutes={state.realTime.getMinutes()}
      />
      <div id="Dashboard">
        <button
          className="btn"
          onClick={() => {
            changeState((p: any) => {
              return { ...p, on_off_changing: !p.on_off_changing };
            });
          }}
        >
          stop/active mode changing
        </button>
        <button
          className="btn"
          onClick={() => {
            changeState((p: any) => {
              return { ...p, start_stop_clock: !p.start_stop_clock };
            });
          }}
        >
          start/stop fibonatchi Clock
        </button>
        <button
          className="btn"
          onClick={() => {
            console.log("+5 min");
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
            console.log("-5 min");
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
