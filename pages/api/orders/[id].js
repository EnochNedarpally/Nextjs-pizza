import Orders from '../../../models/Order'
import dbConnect from '../../../utils/mongo'
export default async function handler(req, res) {
     const {method,query:{id}}=req;
       await dbConnect();
     if(method==='GET'){
        const order=await Orders.findById(id);
        res.status(200).json(order);
     }
     if(method==='PUT'){
        try {
          const order=await Orders.findByIdAndUpdate(id,req.body,{new:true});
          res.status(200).json(order);
        } catch (error) {
          res.status(500).json(error);
        }
     }
     if(method==='DELETE'){
       
    }

}       