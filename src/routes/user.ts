import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middleware/jwt";

const router=Router();

router.post('/',[checkJwt],UserController.newUser);
router.get('/',UserController.getUsers);
router.get('/:id',UserController.getById);
router.delete('/:id',UserController.delete);
router.patch('/:id',UserController.update);
export default router;