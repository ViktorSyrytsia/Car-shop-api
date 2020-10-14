import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { DocumentProvider } from '../models/provider.model';
import providerService from '../db/provider.service';
import responses from '../helpers/responses';

const findAllProviders = async (req: Request, res: Response) => {
  try {
    const providers: DocumentProvider[] = await providerService.findAll(req.query);
    return responses.success(res, StatusCodes.OK, providers);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const findProviderById = async (req: Request, res: Response) => {
  try {
    const provider: DocumentProvider =
      await providerService.findById(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, provider);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const createProvider = async (req: Request, res: Response) => {
  try {
    const newProvider: DocumentProvider = await providerService.create(
      req.body
    );
    return responses.success(res, StatusCodes.OK, newProvider);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const updateProvider = async (req: Request & { body: DocumentProvider }, res: Response) => {
  try {
    const updatedProvider: DocumentProvider = await providerService.update(
      new Types.ObjectId(req.params.id), req.body
    );
    return responses.success(res, StatusCodes.OK, updatedProvider);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const deleteProvider = async (req: Request, res: Response) => {
  try {
    const deletedProvider: DocumentProvider =
      await providerService.deleteProvider(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, deletedProvider);
  } catch (error) {
    return responses.fail(res, error);
  }
};

export default {
  findAllProviders, findProviderById,
  deleteProvider, updateProvider, createProvider
};
