import { Request, Response } from "express";
import { send } from "process";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import * as jwt from 'jsonwebtoken';
import config from "../config/config";

class AuthController {

    static login = async (req: Request, res: Response) => {

        const { username, password } = req.body
        
        if (!(username && password)) {
            return res.status(409).json({ message: 'user & pass are required' })
        }
        const authRepo = AppDataSource.getRepository(User);
        let user: User;
        try {
            user = await authRepo.findOneOrFail({
                where: {
                    username
                }
            })
        } catch (error) {
            return res.status(452).json({message:'user incorrect'})
        }

        if(!user.checkPassword(password)){
            return res.status(452).json({message:'password incorrect'})
        }

        const token= jwt.sign(
            {userId:user.id,username},
            config.jwtSecret,{expiresIn:'1h'}
        )

        return res.status(200).json({message:'login',token})

    }
}


export default AuthController
