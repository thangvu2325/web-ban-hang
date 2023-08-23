import axios from 'axios';
import { Order } from '@/types/frontEnd';

export const addOrder = async (order: Order) => {
  try {
    await axios.post('http://localhost:3001/api/addorder', order);
    return true;
  } catch (error) {
    console.error('Error fetching data:', error);
    return false;
  }
};
// export const deleteOrder = async () => {
//   try {
//     const response = await axios.get('http://localhost:3001/api/listItemList/');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };