import cookie from "cookie";

export default async function handler(req, res) {
    const {method,query:{id}}=req;
    const{username,password}=req.body;
    if(method==='POST'){
        try {
            if(username===process.env.ADMIN_USERNAME && password==process.env.ADMIN_PASSWORD){
                res.setHeader("Set-Cookie",cookie.serialize("token",process.env.TOKEN,{
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                }))
                res.status(200).json("Logged In Successfull!")
            }
            res.status(403).json("Invalid Credentials")
        } catch (error) {
            res.status(500).json(error)
        }
    }

}