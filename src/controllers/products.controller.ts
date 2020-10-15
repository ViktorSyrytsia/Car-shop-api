import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { DocumentProduct } from '../models/product.model';
import responses from '../helpers/responses';
import productsService from '../db/products.service';
import { checkError } from '../helpers/check-error';

const findAllProducts = async (req: Request, res: Response) => {
  try {
    const products: DocumentProduct[] = await productsService.findAll(req.query);
    return responses.success(res, StatusCodes.OK, products);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const findProductsByCar = async (req: Request, res: Response) => {
  try {
    const products: DocumentProduct[] =
      await productsService.findByCar(new Types.ObjectId(req.params.id), req.query);
    return responses.success(res, StatusCodes.OK, products);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const findProductsByType = async (req: Request, res: Response) => {
  try {
    const products: DocumentProduct[] =
      await productsService.findByProductType(new Types.ObjectId(req.params.id), req.query);
    return responses.success(res, StatusCodes.OK, products);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const findProductsByProvider = async (req: Request, res: Response) => {
  try {
    const products: DocumentProduct[] =
      await productsService.findByProvider(new Types.ObjectId(req.params.id), req.query);
    return responses.success(res, StatusCodes.OK, products);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const findProductById = async (req: Request, res: Response) => {
  try {
    const product: DocumentProduct =
      await productsService.findById(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, product);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: DocumentProduct = await productsService.create(
      req.body
    );
    return responses.success(res, StatusCodes.OK, newProduct);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const updateProduct = async (req: Request & { body: DocumentProduct }, res: Response) => {
  try {
    const updatedProduct: DocumentProduct = await productsService.update(
      new Types.ObjectId(req.params.id), req.body, req.query
    );
    return responses.success(res, StatusCodes.OK, updatedProduct);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct: DocumentProduct =
      await productsService.deleteProduct(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, deletedProduct);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

export default {
  findAllProducts, findProductsByCar,
  findProductsByType, findProductById, createProduct,
  updateProduct, deleteProduct, findProductsByProvider
};
