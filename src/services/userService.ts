import axios from "axios";

interface UserResponseInterface {
    data : {
        results : object[]
    },
    config ?: object,
    headers?: object
}

export const getUserData = (): Promise<any> => {
       return axios
        .get("https://randomuser.me/api")
        .then((response : UserResponseInterface) => response?.data?.results[0])
        .catch((error) => error);
  
};
