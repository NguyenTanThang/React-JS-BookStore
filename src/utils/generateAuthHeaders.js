
const generateAuthHeaders = (userInfo) => {
    return {
        Authorization: `Bearer ${userInfo.token}`,
    }
}

export default generateAuthHeaders;