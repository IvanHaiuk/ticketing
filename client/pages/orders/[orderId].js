import { useEffect, useState } from "react";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order }) => {
    const [timeLeft, setTimeLeft] = useState("");
    
    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        }

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        }
    }, [order]);

    if (timeLeft < 0) {
        return <div> Order is expired</div>
    }

    return <div>
        {timeLeft} seccnds until order expires
    </div>
}

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);
    return { order: data };
};

export default OrderShow;