
import Button from '../../component/Button/button'
import './Home.scss'
import Hall from '../../component/Hall/Hall'
import Branch from '../../component/Branch/Branch'
import Menu from '../../component/Menu/Menu'
import Service from '../../component/Service/Service'
import { Link } from 'react-router-dom'


const Home = () => {

    return (
        <>
            <div className="home" id="home">
                <div className="home__container container">
                    <div className="home__left">
                        <span className='text-gradient'>_Restaurant</span>
                        <h1>HỆ THỐNG NHÀ HÀNG
                            TIỆC CƯỚI

                        </h1>
                        <p>
                            Nhà hàng tiệc cưới là nơi lý tưởng để tổ chức lễ kết hôn hoàn hảo của bạn. Với không gian sang trọng, dịch vụ chuyên nghiệp và menu đa dạng từ các đầu bếp tài năng, chúng tôi cam kết mang đến cho bạn và khách mời trải nghiệm tiệc cưới đáng nhớ.
                            Hãy để chúng tôi biến giấc mơ cưới của bạn thành hiện thực tại nhà hàng tiệc cưới của chúng tôi.
                        </p>
                        <Link to="/bill"><Button > Order Here</Button></Link>
                    </div>
                    <div className="home__right">
                        <img src={require("../../assets/assets/img_1.png")} alt="" />
                    </div>
                </div>
            </div>
            <Branch />
            <Hall />
            <Menu />
            <Service />
        </>
    )
}
export default Home;
