import "./digitalClock.css";
interface Prop {
  hours: number;
  minutes: number;
}
function DigitalClock(Prop: Prop) {
  const timePrinter = (hour: number,minutes:number): {currentHour:string,currentMinute:string} => {
    let currentHour: string | number =hour;
    let currentMinute: string | number =minutes;
   if (currentHour>12) {
        currentHour = currentHour - 12
    }
    if (currentHour<10) {
        currentHour = "0" + currentHour;
    }
    
  
    if(currentMinute<10){
        currentMinute = "0" + currentMinute
    }
    return {currentHour:String(currentHour),currentMinute:String(currentMinute)}
  };

  const {currentHour,currentMinute} = timePrinter(Prop.hours,Prop.minutes)
  return (
    <section>
      <div className="clockk">
        <div className="bigtime">
          <div className="time numbers hr">
            <span id="hours">{currentHour}</span>
          </div>
          <div className="time hr dot" id="blink">
            <span>:</span>
          </div>
          <div className="time numbers hr">
            <span id="minutes">{currentMinute}</span>
          </div>
        </div>
        <div className="lowtime">
          {/* <div className="time bottom numbers"><span id="seconds">00</span></div> */}
          <div className="time bottom low">
            <span id="sessions">{Prop.hours >= 12 ? "PM" : "AM"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DigitalClock;
