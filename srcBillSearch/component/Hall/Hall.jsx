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
                    <span className='text-gradient'>Sảnh Cưới</span>
                    <h1>Tat Ca Cac Chi Nhanh<br />Sảnh Cưới VipPro</h1>
                    <p>vbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</p>

                    <Link to="/listhall">
                        <Button >Xem Chi Tiết Sảnh Cưới</Button>
                    </Link>

                </div>
            </div>
        </div >

    )
}
export default Hall;