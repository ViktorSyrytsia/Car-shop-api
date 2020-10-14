import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { DocumentCar } from '../models/car.model';
import responses from '../helpers/responses';
import carsService from '../db/cars.service';

const findAllCars = async (req: Request, res: Response) => {
  try {
    const cars: DocumentCar[] = await carsService.findAll(req.query);
    return responses.success(res, StatusCodes.OK, cars);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const findCarById = async (req: Request, res: Response) => {
  try {
    const car: DocumentCar =
            await carsService.findById(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, car);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const createCar = async (req: Request, res: Response) => {
  try {
    const newCar: DocumentCar = await carsService.create(
            req.body
        );
    return responses.success(res, StatusCodes.OK, newCar);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const updateCar = async (req: Request & { body: DocumentCar }, res: Response) => {
  try {
    const updatedCar: DocumentCar = await carsService.update(
            new Types.ObjectId(req.params.id), req.body
        );
    return responses.success(res, StatusCodes.OK, updatedCar);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    const deletedCar: DocumentCar =
            await carsService.deleteCar(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, deletedCar);
  } catch (error) {
    return responses.fail(res, error);
  }
};

export default {
  findAllCars, findCarById,
  deleteCar, updateCar, createCar
};
