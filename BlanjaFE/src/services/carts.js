import axios from "axios";

const BASE_URL = import.meta.env.VITE_BE_URL;
const carts = `${BASE_URL}cart/user`;

export async function getCartsById() {
  try {
    const result = await axios.get(carts, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return {
      cartsProducts: result.data.data,
    };
  } catch (error) {
    // console.log('err >> ', error.response.data);
    throw new Error({
      message: error.response.data.message,
      status: error.response.data.statusCode,
    });
  }
}
