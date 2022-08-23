import { Router } from "express";
import { UserController } from "../controller/UserController";


const router=Router();

router.post('/',UserController.newUser);
router.get('/',UserController.getUsers);
router.get('/:id',UserController.getById);
router.delete('/:id',UserController.delete);
router.patch('/:id',UserController.update);
export default router;