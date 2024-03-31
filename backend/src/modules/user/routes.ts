import { UserController } from './controllers/userController';
import { authenticateToken } from "../../middlewares/auth";

export function UserRoutes(app: any) {
    const userController = new UserController();
    const PREFIX = '/api/v1/user';
    app.post(PREFIX + '/register', userController.register)
    app.post(PREFIX + '/login', userController.login)
    app.post(PREFIX + '/verify-email', authenticateToken, userController.verifyEmail)

}