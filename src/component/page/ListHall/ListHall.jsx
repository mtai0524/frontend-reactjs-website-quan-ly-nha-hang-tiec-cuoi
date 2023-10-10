import { useState } from 'react'

import './ListHall.scss'
import { Button, Form } from 'react-bootstrap'

const ListHall = () => {
    const initalHall = [
        {
            title: "Hall 1 ",
            img_url: require("../../../assets/assets/img_6.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "Hall 2 ",
            img_url: require("../../../assets/assets/img_5.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "Hall 3 ",
            img_url: require("../../../assets/assets/img_5.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "Hall 4 ",
            img_url: require("../../../assets/assets/Untitled.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "Hall 5 ",
            img_url: require("../../../assets/assets/img_8.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },

    ]
    const [hall] = useState(initalHall)

    // =====Search=====
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault(); // Ngăn chặn sự kiện gửi form mặc định

        // Lấy giá trị từ input tìm kiếm
        const searchKeyword = e.target.kw.value.toLowerCase();

        // Sử dụng hàm filter để tìm kiếm trong danh sách menu
        const searchResults = hall.filter(item =>
            item.name.toLowerCase().includes(searchKeyword)
        );

        // Cập nhật trạng thái searchResult với kết quả tìm kiếm
        setSearchResult(searchResults);
    };
    return (
        <>
            <div className='tilte'>
                <h1>Danh Sách Sảnh Cưới</h1>


                <Form className="filter d-flex" onSubmit={handleSearch}>
                    <Form.Control
                        type="text"
                        placeholder="Nhập sảnh cưới bạn muốn tìm kiếm"
                        name="kw"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button type='submit'>Search</Button>
                </Form>
            </div>
            <div className='listhall' id='listhall'>
                <div className='listhall__container '>
                    <ul className='listhall__list'>{
                        hall.map(item => {
                            return <li className='listhall__item' key={item.title}>
                                <div className='listhall__item--img'>
                                    <img src={item.img_url} alt=""></img>
                                </div>
                                <div className='listhall__item--content'>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </li>
                        })
                    }</ul>
                </div>
            </div>
        </>


    )
}
export default ListHall;