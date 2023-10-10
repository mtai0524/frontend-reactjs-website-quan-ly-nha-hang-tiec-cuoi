
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
                        <h1>AAAAAAAA
                            AAAAAAAAAAA
                            AAAAAAA</h1>
                        <p>Hay thuong thuc mon ngon cung nha hang
                            vi o day co rat nhieu do an
                            no se giup ban thoai mai hon
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
