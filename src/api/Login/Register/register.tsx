import axios from "axios";
import {RegisterFormValues} from "../../../components/reusable/RegisterFormValues";

export const registerUser = async (data: Omit<RegisterFormValues, 'confirmPassword'>) => {
    const response = await axios.post('http://localhost:8080/api/auth/register', data);
    return response.data;
};