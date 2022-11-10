const OrderIndex = (orders) => {
    return <ul>
        {orders.map((x) => {
            return <li key={x.id}>
                {x.ticket.title} - {x.status}
            </li>
        })}
    </ul>
}

OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get(`/api/orders`);
    return { orders: data };
};

export default OrderIndex;