import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
    const ticketsList = tickets.map(x => {
        return <tr key={x.id}>
            <td>{x.title}</td>
            <td>{x.price}</td>
            <td>
                <Link href="/tickets/[ticketId]" as={`/tickets/${x.id}`}>
                    <a>View</a>
                </Link>
            </td>
        </tr>
    });

    return (
        <div>
            <h1>Tickets</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketsList}
                </tbody>
            </table>
        </div>
    )
  };
  
  LandingPage.getInitialProps = async (context, client, currentUser) => {
        const { data } = await client.get("/api/tickets");
        return { tickets: data };
  };
  
  export default LandingPage;
  