import { Request } from "express";
import { logger } from '../../../libs/logger';
import { pagination } from '../../../libs/pagination';
import { prisma } from '../../../prisma/prismaClient';

export class CategoryService {

    // getCategory function
    async getCategory(req: Request) {
        try {
            const {
                page,
                limit
            }: any = req.query

            // Find category
            const result = await pagination('category', page, limit);
            logger.info("Fetched category data successfully", result);
            return Promise.resolve(result);
        } catch (err: any) {
            return Promise.reject(err);
        }
    }


    // update category function
    async updateCategories(req: Request) {
        try {
            const {
                categories
            }: any = req.body
            const updatedCategories = []

            // Iterate over the categories array in the payload using for await loop
            for await (const category of categories) {
                const { id, isActive } = category;
                try {
                    // Update the category with the provided id
                    await prisma.category.update({
                        where: { id },
                        data: { isActive },
                    });
                    logger.info(`Category with ID ${id} updated successfully.`);
                    updatedCategories.push(id);
                } catch (error:any) {
                    if (error.code === 'P2025') {
                        logger.error(`Category with ID ${id} does not exist.`);
                    } else {
                        logger.error(`Error updating category with ID ${id}:`, error);
                    }
                }
            }

            logger.info("Updated categories successfully", updatedCategories);
            return Promise.resolve({ updatedItems: updatedCategories });
        } catch (err: any) {
            logger.error("Error while updating categories", err);
            return Promise.reject(err);
        }
    }
}


