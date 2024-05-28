import { Router } from "express";
import { model, Schema } from "mongoose";

const router = Router();

interface User {
    name: string,
    email: string,
    password: string
};
const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
        default: "Joao"
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = model<User>('User', userSchema);

router.post('/user', async (req, res)=>{
    try{
        const user = req.body;
        const response = await userModel.create(user);
        res.status(201).json(response);
    }catch(error) {
        console.log(error);
    };
});

router.get('/user', async (_req, res)=>{
    try{
    const response = await userModel.find({}, { password: 0 });
    res.status(200).json(response);
    }catch(err){
        res.status(400).json({err})
    }
});




export default router;