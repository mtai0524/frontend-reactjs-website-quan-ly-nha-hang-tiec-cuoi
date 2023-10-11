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



const App = () => {

  return (
    <div>

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
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )

}
export default App;