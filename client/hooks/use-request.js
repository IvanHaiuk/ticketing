import { useState } from "react"
import axios from "axios";

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try{
            setErrors(null);
            const res = await axios[method](url, body);
            if (onSuccess) {
                onSuccess(res.data);
            }
            return res.data;
        } catch (err) {
            console.log(err);
            setErrors(
                <div className="alert alert-danger">
                    <h4>Ooops...</h4>
                    <ul className="my-0">
                        {err.response.data.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>
            );
            return null;
        }
    }

    return { doRequest, errors };
}