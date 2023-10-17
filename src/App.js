import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer";
import Home from "./layout/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListHall from "./component/page/ListHall/ListHall";
import ListBranch from "./component/page/ListBranch/ListBranch";
import Login from "./component/page/Login/Login";
import Register from "./component/page/Register/Register";
import Bill from "./component/page/Bill/Bill";
import ListMenu from "./component/page/ListMenu/ListMenu";
import Profile from "./component/page/Profile/Profile";
import { AuthProvider } from "./component/Context/AuthProvider";
import Feedback from "react-bootstrap/esm/Feedback";



const App = () => {

  return (
    <div>
<AuthProvider>
    
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/listmenu" element={<ListMenu />} />

          <Route path="/listhall" element={<ListHall />} />
          <Route path="/listbranch" element={<ListBranch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/profile" element={<Profile />} />

          <Route path="/login/register" element={<Register />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>

    </div>
  )

}
export default App;