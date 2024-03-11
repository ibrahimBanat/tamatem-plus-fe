import {useMutation, useQuery} from 'react-query';

const fetchItems = async ({queryKey}) => {
    const [_key, {perPage, page}] = queryKey
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const response = await fetch(`${baseUrl}/items?page=${page}&perPage=${perPage}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};



const fetchItemView = async ({queryKey}) => {
    const [_key, {itemId}] = queryKey;
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const response = await fetch(`${baseUrl}/items/${itemId}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}
const updateItem = async (data) => {
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': data.authorization
        },
        body: JSON.stringify({
            name: data.item_name,
            description: data.item_description,
            price: parseInt(data.item_price)
        })
    }
    const response = await fetch(`${baseUrl}/items/${data.id}`, requestOptions);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}
export const useItemView = (itemId) => {
    return useQuery({queryKey: [`item-${itemId}`, {itemId}], queryFn: fetchItemView})
}

export const useItems = (page, perPage) => {
    return useQuery({queryKey: ["items", {page, perPage}], queryFn: fetchItems});
};

export const useItemEdit = () => {
    return useMutation(
        {
            mutationFn: (data) => {
                console.log(data);
                return updateItem(data)
            },
            onError: (error) => {
                throw error;
            },
        },
    )
}
