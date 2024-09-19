import { useContext, useEffect } from "react";
import Clock, { boxtype } from "./Clock";
import { MainContext, MainContexttype, stateType } from "./ContextProvider";
import { formatTime, updateBoxes } from "./util/helper";
import UpdateTime from "./UpdateTime";
import PlayStopClock from "./PlayStopClock";
import DigitalClock from "./DigitalClock";
import "./FiboClock.css";
interface ClockContainer {
  boxes: boxtype[]
  colorKey: "sandy";
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
    changeState((p: stateType) => {
      return {
        ...p,
        currentTime: newCurrentTime,
        realTime: now,
        boxes: updateBoxes(
          p.boxes,
          newCurrentTime.hours,
          newCurrentTime.minutes,
          p.SameDisplay
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
        <p style={{fontSize:"1.7em"}}>Clock State</p>
        <h3 style={{ paddingBlock: "10px", textAlign: "center" }}>
          <span style={{ marginRight: "20px" }}>
            <span>Time Changing : </span>
            <em style={{ color: state.start_stop_clock ? "green" : "red" }}>
              {state.start_stop_clock ? "moving" : "stopped"}
            </em>
          </span>
          <span style={{ marginRight: "20px" }}>
            <span>Fast Box Changing Mode : </span>
            <em style={{ color: state.on_off_changing ? "green" : "red" }}>
              {state.on_off_changing ? "ON" : "OFF"}
            </em>
          </span>
          <div><span>
            <span>Same Display Mode (Default:ON) : </span>
            <em style={{ color: state.SameDisplay ? "green" : "red" }}>
              {state.SameDisplay ? "ON" : "OFF"}
            </em>
          </span></div>
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
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            className="btn"
            style={{ marginRight: "20px" }}
            onClick={() => {
              changeState((p: stateType) => {
                return {
                  ...p,
                  on_off_changing: !p.on_off_changing,
                  SameDisplay: !p.SameDisplay,
                };
              });
            }}
          >
            stop/active Random mode changing
          </button>
          <button
            className="btn"
            onClick={() => {
              changeState((p: stateType) => {
                return { ...p, start_stop_clock: !p.start_stop_clock };
              });
            }}
          >
            start/stop Time
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            className="btn"
            style={{ marginRight: "20px" }}
            onClick={() => {
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
          <button
            className="btn"
            onClick={() => {
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
        </div>
      </div>
      {state.on_off_changing && <UpdateTime />}
      {state.start_stop_clock && <PlayStopClock />}
    </>
  );
}

export default ClockContainer;
