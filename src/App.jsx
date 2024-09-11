import { Route, Routes } from "react-router-dom";
import ScheduledCard from "./component/ScheduledCard";
import Slide from "./component/Slide";
import Slide1 from "./component/Slide1";
import Slide2 from "./component/Slide2";
import DirectFrom from "./component/DirectFrom";
import ServiceRequestForm from "./component/ServiceRequestForm";
import LoactionService from "./component/LoactionService";
import LocationDirect from "./component/LocationDirect";
import ScheduledCard1 from "./component/ScheduledCard1";
import ScheduledCard2 from "./component/ScheduledCard2";
import Cheque from "./component/Cheque1";
import UploadCheuqe from "./component/UploadCheque";
import SlideNew from "./component/SlideNew";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Slide />}></Route>
          <Route path="/slide1" element={<Slide1 />}></Route>
          <Route path="/slide2" element={<Slide2 />}></Route>
          <Route path="/scheduledCard" element={<ScheduledCard />}></Route>
          <Route path="/DirectFrom" element={<DirectFrom />}></Route>
          <Route
            path="/ServiceRequestForm"
            element={<ServiceRequestForm />}></Route>
          <Route path="/Cheque1" element={<Cheque />}></Route>
          <Route path="/UploadCheque" element={<UploadCheuqe />}></Route>
          <Route path="/LoactionService" element={<LoactionService />}></Route>
          <Route path="/LocationDirect" element={<LocationDirect />}></Route>
          <Route path="/ScheduledCard1" element={<ScheduledCard1 />}></Route>
          <Route path="/ScheduledCard2" element={<ScheduledCard2 />}></Route>
          <Route path="/SlideNew" element={<SlideNew />}></Route>
        </Routes>

        {/* <Slide></Slide>
            <Slide1></Slide1>
            <Slide2></Slide2>
            <ScheduledCard></ScheduledCard> */}
      </div>
    </>
  );
}

export default App;
