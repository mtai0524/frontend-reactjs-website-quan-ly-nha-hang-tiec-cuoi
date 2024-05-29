import { Link } from 'react-router-dom';
import Button from '../Button/button'
import './Branch.scss'

const Branch = () => {
    return (
        <div className='branch' id='branch'>
            <div className='branch__container container'>
                <div className='branch__left'>
                    <img src={require("../../assets/assets/img_2.png")} alt="" />
                </div>
                <div className='branch__right'>
                    <span className='text-gradient'>_Branch</span>
                    <h1>CHI NHÁNH<br />THUẬN TIỆN - RỘNG RÃI</h1>
                    <p>Chào mừng bạn đến với chi nhánh của chúng tôi! Tại đây, chúng tôi cam kết mang đến dịch vụ chất lượng và trải nghiệm độc đáo cho tất cả khách hàng. Với không gian thoải mái và tiện nghi, chúng tôi tự hào đáp ứng mọi nhu cầu của bạn. Đội ngũ nhân viên tận tâm và am hiểu sẽ luôn sẵn sàng phục vụ bạn mọi lúc. Hãy đến và khám phá những gì chúng tôi có để cung cấp tại chi nhánh này và hãy để chúng tôi biến mọi trải nghiệm của bạn thành một kỷ niệm đáng nhớ.</p>
                    <Link to="/listbranch">
                        <Button>Xem Tat Ca Cac Chi Nhanh</Button>
                    </Link>

                </div>
            </div>
        </div>

    )
}
export default Branch;
// demo git
// chia branch