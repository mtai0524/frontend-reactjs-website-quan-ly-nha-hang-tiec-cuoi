import axios from 'axios';

export const endpoint = {
  menu: 'api/menu',
  hall: 'api/hall',
  service: 'api/service', // Thêm endpoint cho dịch vụ
};

export default axios.create({
  baseURL: 'https://localhost:7296',
});
