const URL = 'http://localhost:5000';

// Create review request

export const newReview = async (reviewData, projectId, userToken) => {
    const response = await fetch(`${URL}/projects/${projectId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(reviewData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userToken
        }
    });
    const data = await response.json();
    if (!response.ok) throw new Error( data.message || 'Something Went Wrong');
    return data;
}

// Delete review request

export const deleteReview = async (projectId, reviewId, userData) => {
    const response = await fetch(`${URL}/projects/${projectId}/reviews/${reviewId}`, {
        method: 'DELETE',
        body: JSON.stringify({ author: userData.author }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userData.token
        }
    });
    const data = await response.json();
    if (!response.ok) throw new Error( data.message || 'Something Went Wrong');
    return data;
}
