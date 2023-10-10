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

                    <h1>Danh Sách Dịch Vụ</h1>
                    <p>Hay thuong thuc mon ngon cung nha hang
                        vi o day co rat nhieu do an
                        no se giup ban thoai mai hon
                    </p>
                    <Button > Xem Tất Cả Dịch Vụ</Button>
                </div>

            </div>
        </div>
    )
}
export default Service;