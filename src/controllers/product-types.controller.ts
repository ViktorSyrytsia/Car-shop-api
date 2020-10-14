import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { DocumentProductType } from '../models/product-type.model';
import responses from '../helpers/responses';
import productTypesService from '../db/product-types.service';
import { checkError } from '../helpers/check-error';

const findAllProductTypes = async (req: Request, res: Response) => {
  try {
    const productTypes: DocumentProductType[] = await productTypesService.findAll(req.query);
    return responses.success(res, StatusCodes.OK, productTypes);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const findProductTypeById = async (req: Request, res: Response) => {
  try {
    const productType: DocumentProductType =
      await productTypesService.findById(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, productType);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const createProductType = async (req: Request, res: Response) => {
  try {
    const newProductType: DocumentProductType = await productTypesService.create(
      req.body
    );
    return responses.success(res, StatusCodes.OK, newProductType);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const updateProductType = async (req: Request & { body: DocumentProductType }, res: Response) => {
  try {
    const updatedProductType: DocumentProductType = await productTypesService.update(
      new Types.ObjectId(req.params.id), req.body
    );
    return responses.success(res, StatusCodes.OK, updatedProductType);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const deleteProductType = async (req: Request, res: Response) => {
  try {
    const deletedProductType: DocumentProductType =
      await productTypesService.deleteProductType(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, deletedProductType);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

export default {
  findAllProductTypes, findProductTypeById,
  deleteProductType, updateProductType, createProductType
};
