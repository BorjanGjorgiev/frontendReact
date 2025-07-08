import {LoginFormValues} from "../../components/reusable/LoginFormValues";
import {LoginResponse} from "../../components/reusable/LoginResponse";
import axios from "axios";

export const login = async (data: LoginFormValues): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>
    (
        'http://localhost:8080/api/auth/login',
        data,
        { withCredentials: true }
    );
    return response.data;
};