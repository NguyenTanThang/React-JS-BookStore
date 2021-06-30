const calculateRatings = (reviews) => {
    const sum = reviews.reduce((a, c) => {
        return a + c.star; 
    }, 0);
    const avg = sum / reviews.length;
    return avg.toFixed(1);
}

export default calculateRatings;