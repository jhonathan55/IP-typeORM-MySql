
import { Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { validate } from "class-validator"

export class UserController {

    static newUser = async (req: Request, res: Response) => {

        const { username, password, role } = req.body
        const user = new User();
        user.username = username;
        user.password = password;
        user.role = role;
        const validationOpt = {
            validationError: { target: false, value: false },
        }
        const errors = await validate(user, validationOpt)
        if (errors.length > 0) {
            return res.status(400).send(errors)
        }

        const userRepository = AppDataSource.getRepository(User)
        try {
            user.hashPassword();
            await userRepository.save(user)

        } catch (error) {
            return res.status(500).json({
                message: "Error creating user",
                error: error.message
            })
        }
        return res.status(201).json({
            message: "User created"
        })
    }
    static getUsers = async (req: Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(User)
        let users;
        try {
            users = await userRepository.find()
        } catch (error) {
            res.status(500).json({
                message: "Error getting users",
                error: error.message
            })

        }
        if (users.length > 0) {
            return res.send(users)
        } else {
            return res.status(404).json({
                message: "No users found"
            })
        }
    }
    static getById = async (req: Request, res: Response) => {
        const { id } = req.params
        const userRepository = AppDataSource.getRepository(User)

        try {
            const user = await userRepository.findOneByOrFail({ id: parseInt(id) })
            res.send(user)
        } catch (error) {
            res.status(404).json({
                message: "User not found",
                error: error.message
            })
        }
    }
    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = AppDataSource.getRepository(User)
        let user: User;
        try {
            user = await userRepository.findOneByOrFail({ id: parseInt(id) })
        } catch (error) {
            return res.status(404).json({
                message: "User not found",
                error: error.message
            })
        }
        try {
            await userRepository.delete(id);
            res.status(200).json({
                message: "User deleted"
            })
        } catch (error) {
            res.status(500).json({
                message: "Error deleting user",
                error: error.message
            })
        }



    }
    static update = async (req: Request, res: Response) => {
        let user;
        const { id } = req.params;
        const { username, password, role } = req.body;
        const userRepository = AppDataSource.getRepository(User)
        try {
            user = await userRepository.findOneByOrFail({ id: parseInt(id) })
            user.username = username;
            user.password = password;
            user.role = role;
        } catch (error) {
            return res.status(404).json({
                message: "User not found",
                error: error.message
            })
        }

        const validationOpt = { validationError: { target: false, value: false } }
        const errors = await validate(user, validationOpt)
        if (errors.length > 0) {
            return res.status(400).send(errors)
        }
        try {
            await userRepository.save(user)
        } catch (error) {
            res.status(500).json({
                message: "Error updating user",
                error: error.message
            })
        }
        res.status(204).json({
            message: "User updated"
        })


    }

}