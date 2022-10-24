const URL = 'http://localhost:5000';

// Register user request

export const newUser = async (userData) => {
    const response = await fetch(`${URL}/signup`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (!response.ok) throw new Error( data.message || 'Something Went Wrong');
    return data;
}

// Login user request

export const loginUser = async (userData) => {
    const response = await fetch(`${URL}/login`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (!response.ok) throw new Error( data.message || 'Something Went Wrong');
    return data;
}

// Get user request

export const getUser = async(token) => {
    const userRes = await fetch(`${URL}/protected`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': token
        }
    });
    const userData = await userRes.json();
    if (!userRes.ok) throw new Error( userData.message ||'Something Went Wrong');
    return userData;
}