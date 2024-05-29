import { useEffect, useState } from "react";
import { getCartsById } from "../services/carts";

export function useCarts() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getCarts() {
      try {
        setStatus("loading");
        const cartsProduct = await getCartsById();
        console.log("data awal", cartsProduct);
        if (!ignore) {
          setData(cartsProduct);
          setStatus("success");
        }
      } catch (error) {
        setStatus("failed");
        setError(error);
      }
    }
    getCarts();
    return () => {
      ignore = true;
    };
  }, []);
  return { data, status, error };
}
