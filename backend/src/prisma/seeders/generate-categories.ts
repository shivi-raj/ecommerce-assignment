import { logger } from "../../libs/logger";
import { prisma } from "../prismaClient";
import { faker } from '@faker-js/faker';

async function generateUniqueDepartments(count: number) {
    const records = await prisma.category.findMany();
    const existingCategories = records.map((item:any) => item?.title);
    const uniqueDepartments = new Set();
    while (uniqueDepartments.size < count) {
        const department = faker.person.firstName();
        if(existingCategories.includes(department)){
            continue;
        }
        uniqueDepartments.add(department);
    }
    return Array.from(uniqueDepartments);
}



// Define the seeder function
async function seed() {
    try {
        // Define seed data
        let categories: any[] = await generateUniqueDepartments(100);
        categories = categories.map((item: any) => ({
            title: item
        }))
        // Seed users
        const createdCategories = await prisma.category.createMany({
            data: categories,
        });
        logger.info('categories seeded successfully:', createdCategories);
    } catch (error) {
        logger.error('Error seeding database:', error);
    }
}

// Execute the seeder function
seed();
