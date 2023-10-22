import { Link } from 'react-router-dom';
import Button from '../Button/button';
import './Service.scss'

const Service = () => {
    return (
        <div className="service" id="service">
            <div className="service__container container">
                <div className="service__left">
                    <div className="service__right">
                        <img src={require("../../assets/assets/Untitled.png")} alt="" />
                    </div>

                    <h1>DỊCH VỤ </h1>
                    <p>Dịch vụ của chúng tôi đa dạng và xuất sắc. Tại đây, bạn có thể tận hưởng không gian sang trọng và thực đơn đa dạng cho các sự kiện như tiệc cưới, hội nghị, hoặc họp mặt gia đình. Đội ngũ chuyên nghiệp của chúng tôi sẽ đảm bảo rằng mọi dịch vụ được cung cấp vượt quá sự mong đợi của bạn, giúp tạo nên những kỷ niệm đáng nhớ.
                    </p>
                    <Link to="/listservice"><Button>Xem Tất Cả Dịch Vụ</Button></Link>
                </div>

            </div>
        </div>
    )
}
export default Service;