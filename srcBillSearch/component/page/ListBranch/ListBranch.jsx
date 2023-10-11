import { useState } from 'react'
import './ListBranch.scss'
import { Button, Card, Col, Row } from 'react-bootstrap'

const ListBranch = () => {
    const initalBranch = [
        {
            title: "Hall 1 ",
            img_url: require("../../../assets/assets/img_8.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "Hall 2 ",
            img_url: require("../../../assets/assets/img_4.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "Hall 3 ",
            img_url: require("../../../assets/assets/img_5.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "Hall 4 ",
            img_url: require("../../../assets/assets/img_7.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "Hall 5 ",
            img_url: require("../../../assets/assets/img_8.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
    ]
    const [branch, setBranchs] = useState(initalBranch)
    return (
        <>
            <Row className='branch'>
                {branch.map(b => {
                    return <Col xs={12} md={3} >
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                })}


            </Row>
        </>
    )
}
export default ListBranch;