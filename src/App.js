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
import ListService from "./component/page/ListService/ListService";
import Profile from "./component/page/Profile/Profile";
import { AuthProvider } from "./component/Context/AuthProvider";
import Feedback from "react-bootstrap/esm/Feedback";
import History from "./component/page/History/History";
import Payment from "./component/page/Payment/Payment";
import { useEffect } from "react";




const App = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.innerHTML = `
      window.__lc = window.__lc || {};
      window.__lc.license = 18027936;
      window.__lc.integration_name = "manual_onboarding";
      ;(function(n,t,c){
        function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}
        var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0;n.type="text/javascript";n.src="https://cdn.livechatinc.com/tracking.js";t.head.appendChild(n)}};
       !n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e
      }(window,document,[].slice))
    `;

    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);
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
            <Route path="/listservice" element={<ListService />} />

            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/login/register" element={<Register />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/history" element={<History/> } />
            <Route path="/payment-success" element={<Payment/> } />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>

    </div>
  )

}
export default App;