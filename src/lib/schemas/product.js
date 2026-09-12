import { z } from 'zod';

export const productSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, 'Product title must be at least 3 characters')
      .max(100, 'Product title cannot exceed 100 characters'),
    availability: z.preprocess((val) => val === 'true' || val === true, z.boolean().default(true)),
    stock: z.preprocess(
      (val) => (val === '' || val === null || val === undefined ? 1 : Number(val)),
      z.number({ invalid_type_error: 'Stock must be a valid number' }).min(0, 'Stock cannot be less than 0')
    ),
    price: z.preprocess(
      (val) => (val === '' || val === null || val === undefined ? NaN : Number(val)),
      z.number({ invalid_type_error: 'Price must be a valid number' }).gt(0, 'Price must be greater than 0')
    ),
    salePrice: z.preprocess(
      (val) => (val === '' || val === null || val === undefined || val === false || isNaN(Number(val)) ? undefined : Number(val)),
      z.number({ invalid_type_error: 'Sale price must be a valid number' }).min(0, 'Sale price cannot be negative').optional()
    ),
    description: z
      .string()
      .trim()
      .min(3, 'Description must be at least 3 characters long'),
    image: z.custom((val) => Boolean(val && (val instanceof File || typeof val === 'string')), {
      message: 'Main product image is required',
    }),
    gallery: z
      .array(z.any())
      .max(5, 'Maximum of 5 gallery images allowed')
      .optional()
      .default([]),
  })
  .refine(
    (data) => {
      if (data.salePrice !== undefined && data.salePrice !== null && !isNaN(data.salePrice)) {
        return data.salePrice < data.price;
      }
      return true;
    },
    {
      message: 'Sale price must be strictly less than the regular price',
      path: ['salePrice'],
    }
  );

