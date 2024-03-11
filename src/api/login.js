import {useMutation} from 'react-query';

const fetchUser = async (body) => {
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    try {
        const response = await fetch(`${baseUrl}/users/login`, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    } catch (e) {
        throw new Error(e?.message? e.message : 'Something Went Wrong');
    }
};


const fetchAccess = async (a) => {
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const response = await fetch(`${baseUrl}/users/access`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(a)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
export const useLogin = () => {
    return useMutation(
        {
            mutationFn: (data) => {
                return fetchUser(data)
            },
            onError: (error) => {
                throw error;
            },
        },
    )
};

export const useAccess = () => {
    return useMutation({
        mutationFn: (data) => {
            return fetchAccess(data)
        },
        onError: (error) => {
        },
    })
};

export const handleLoginSuccess = (newAccessToken, newRefreshToken, handleLogin) => {
    handleLogin(newAccessToken, newRefreshToken);
}
