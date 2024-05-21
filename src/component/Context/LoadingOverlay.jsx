import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './LoadingOverlay.css'; // Đảm bảo bạn đã import CSS

function LoadingOverlay() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading state
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Tạo một delay để mô phỏng quá trình tải dữ liệu
  }, []);

  if (loading) {
    return (
      <div className="overlay">
        <Spinner animation="border" />
      </div>
    );
  }

  return null;
}

export default LoadingOverlay;
