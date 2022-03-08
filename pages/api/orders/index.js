import Orders from '../../../models/Order'
import dbConnect from '../../../utils/mongo'
export default async function handler(req, res) {
     const {method}=req;
       await dbConnect();
     if(method==='GET'){
        const orders=await Orders.find();
        res.status(200).json(orders);
     }
     if(method==='POST'){
         try {
             const orders=await Orders.create(req.body);
             res.status(201).json(orders);

         } catch (error) {
             res.status(500).json(error)
         }
     }
}       