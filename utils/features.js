import jwt from 'jsonwebtoken'



export const sendCookie = (newUserID , res , message , statusCode) => {
    const token = jwt.sign({_id: newUserID} , process.env.JWT_SECERT)
    console.log(process.env.NODE_ENV)
    res.status(statusCode).cookie(
        'token' , token , {
            httpOnly: true ,
            maxAge: 15 * 60 * 1000 ,
            sameSite: process.env.NODE_ENV === 'localHost' ? 'lax' : 'none',
            secure: process.env.NODE_ENV === 'localHost' ? true : false
        }
    ).json({
        success: true ,
        messgae: message
    });
}