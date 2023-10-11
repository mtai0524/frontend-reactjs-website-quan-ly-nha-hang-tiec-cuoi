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
                    <span className='text-gradient'>Chi Nhanh</span>
                    <h1>Tat Ca Cac Chi Nhanh<br />Chi Nhanh Dep</h1>
                    <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    <Link to="/listbranch">
                        <Button>Xem Tat Ca Cac Chi Nhanh</Button>
                    </Link>

                </div>
            </div>
        </div>

    )
}
export default Branch;