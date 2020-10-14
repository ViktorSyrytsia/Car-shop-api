import { CreateQuery, Types, UpdateQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import { DocumentCar, carModel } from '../models/car.model';
import queryUpgrade from '../helpers/query-upgrade';

const findAll = async (requestQuery: any): Promise<DocumentCar[]> => {
  const mongoQuery = new queryUpgrade(carModel.find(), requestQuery)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  return await mongoQuery.query;
};

const findById = async (id: Types.ObjectId): Promise<DocumentCar> => {
  const car = await carModel.findById(id);
  if (!car) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'Car not found');
  }
  return car;
};

const create = async (car: CreateQuery<DocumentCar>): Promise<DocumentCar> => {
  try {
    return await carModel.create(car);
  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const update = async (id: Types.ObjectId, body: UpdateQuery<DocumentCar>)
  : Promise<DocumentCar> => {
  const car = await carModel
    .findByIdAndUpdate(
      { _id: id }, { updatedAt: Date.now(), ...body },
      { new: true, useFindAndModify: false }
    );
  if (!car) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'Car not found');
  }
  return car;
};

const deleteCar = async (id: Types.ObjectId): Promise<DocumentCar> => {
  const car = await carModel.findByIdAndDelete(id);
  if (!car) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'Car not found');
  }
  return car;
};

export default {
  findAll, create, update, deleteCar, findById
};
