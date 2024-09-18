import "./App.css";
import "./index.css"
import ClockContainer from "./lib/ClockContainer";
function App() {
    console.log('app rendered')

  return (
    <main className="main" >
      <div className="container">
      <ClockContainer></ClockContainer>
      </div>
    </main>
    
  );
}

export default App;
