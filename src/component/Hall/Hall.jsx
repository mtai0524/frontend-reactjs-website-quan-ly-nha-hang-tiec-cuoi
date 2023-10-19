import './Hall.scss'
import Button from '../Button/button';
import { Link } from 'react-router-dom';


const Hall = () => {
    return (
        <div className='hall' id='hall'>
            <div className='hall__container container'>
                <div className='hall__left'>
                    <img src={require("../../assets/assets/img_5.png")} alt="" />

                </div>
                <div className='hall__right'>
                    <span className='text-gradient'>_Hall</span>
                    <h1>SẢNH CƯỚI<br />ĐA DẠNG, PHONG PHÚ</h1>
                    <p>Sảnh cưới là không gian tuyệt đẹp và thoải mái, tạo điểm nhấn hoàn hảo cho lễ kết hôn của bạn. Với trang trí lộng lẫy, ánh sáng ấm áp và không gian rộng rãi, sảnh cưới của chúng tôi là nơi lý tưởng để chia sẻ khoảnh khắc đáng nhớ cùng với người thân và bạn bè. Hãy để chúng tôi tạo nên không gian lãng mạn cho ngày trọng đại của bạn.</p>

                    <Link to="/listhall">
                        <Button >Xem Chi Tiết Sảnh Cưới</Button>
                    </Link>

                </div>
            </div>
        </div >

    )
}
export default Hall;