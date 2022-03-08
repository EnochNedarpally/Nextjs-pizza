import Product from '../../../models/Product'
import dbConnect from '../../../utils/mongo'
export default async function handler(req, res) {
     const {method,query:{id}}=req;
        dbConnect();
     if(method==='GET'){
        const product=await Product.findById(id);
        res.status(200).json(product);
     }
     if(method==='PUT'){
        
     }
     if(method==='DELETE'){
        try {
           await Product.findByIdAndDelete(id);
           res.status(200).json("The product has been deleted!")
        } catch (error) {
           res.status(500).json(error);
        }
    }
}       