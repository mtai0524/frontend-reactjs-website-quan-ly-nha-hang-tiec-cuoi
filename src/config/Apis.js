import axios from 'axios';

export const endpoint = {
  menu: 'api/menu',
  category: 'api/menu/getCate',
  hall: 'api/hall',
  service: 'api/service',
  categoryService: 'api/service/getCateService',
};

export default axios.create({
  baseURL: 'https://localhost:7296',
});
