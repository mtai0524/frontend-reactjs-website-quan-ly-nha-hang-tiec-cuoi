// import React, { useState, useEffect } from 'react';
// import { Button, Form, Card, Row, Col } from 'react-bootstrap';

// const ListHall = () => {
//   const [hallData, setHallData] = useState([]);
//   const [searchResult, setSearchResult] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState('');

//   useEffect(() => {
//     // Fetch data from the API
//     fetch('https://localhost:7296/api/hall')
//       .then((response) => response.json())
//       .then((data) => setHallData(data));
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();

//     const keyword = searchKeyword.toLowerCase();

//     // Filter the halls based on the search keyword
//     const searchResults = hallData.filter((item) =>
//       item.name.toLowerCase().includes(keyword)
//     );

//     setSearchResult(searchResults);
//   };

//   return (
//     <div>
//       <div className='title'>
//         <h1>Danh Sách Sảnh Cưới</h1>
//         <Form className='filter d-flex' onSubmit={handleSearch}>
//           {/* ... (previous code) */}
//         </Form>
//       </div>
//       <div className='listhall' id='listhall'>
//         <div className='listhall__container'>
//           <Row xs={1} sm={2} md={3}>
//             {searchResult.length > 0
//               ? searchResult.map((item) => (
//                   <Col key={item.hallId}>
//                     <Card className='listhall__item'>
//                       <Card.Img
//                         variant='top'
//                         src={item.image}
//                         className='card-img-custom' // Apply the custom class
//                       />
//                       <Card.Body>
//                         <Card.Title>{item.name}</Card.Title>
//                         <Card.Text>{item.description}</Card.Text>
//                         <Card.Text>Chi nhánh: {item.branchName}</Card.Text>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 ))
//               : hallData.map((item) => (
//                   <Col key={item.hallId}>
//                     <Card className='listhall__item'>
//                       <Card.Img
//                         variant='top'
//                         src={item.image}
//                         className='card-img-custom' // Apply the custom class
//                       />
//                       <Card.Body>
//                         <Card.Title>{item.name}</Card.Title>
//                         <Card.Text>{item.description}</Card.Text>
//                         <Card.Text>Chi nhánh: {item.branchName}</Card.Text>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 ))}
//           </Row>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListHall;
