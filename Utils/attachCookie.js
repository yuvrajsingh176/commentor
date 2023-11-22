const attachCookie = ({ res, token }) => {
    const oneday = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneday),
        credentials: 'include',
        sameSite: 'None',   
    })
    console.log('Response Headers:', res.getHeaders());
}
export default attachCookie;