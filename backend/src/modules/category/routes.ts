import { authenticateToken } from '../../middlewares/auth';
import { CategoryController } from './controllers/categoryController';

export function CategoryRoutes(app: any) {
    const categoryController = new CategoryController();
    const PREFIX = '/api/v1/category';
    app.get(PREFIX, authenticateToken, categoryController.getCategory);
    app.put(PREFIX, authenticateToken, categoryController.updateCategories);
}  