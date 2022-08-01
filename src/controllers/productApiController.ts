import { NextFunction, Request, Response } from 'express';
import logger from '../core/logger';
import { Product } from '../models/product';

const productApiController = {
  listing: (req: Request, res: Response, next: NextFunction): void => {
    logger.info('retrieving product listing');
    let size: number = Number(req.query.size);
    if (Number.isNaN(size)) {
      size = 10;
    }
    if (size <= 0) {
      size = 10;
    } else if (size > 100) {
      size = 100;
    }
    let page: number = Number(req.query.page);
    if (Number.isNaN(page)) {
      page = 1;
    }
    if (page <= 0) {
      page = 1;
    }
    Product.findAndCountAll({
      offset: (page - 1) * size,
      limit: size,
      order: [['id', 'DESC']],
    })
      .then((result) => {
        if (result.rows) {
          res.status(200).json(result.rows);
        } else {
          res.status(200).json([]);
        }
      })
      .catch((err) => {
        logger.error(JSON.stringify(err));
        res.status(422).json({
          status: false,
          message: 'Fail retrieving data!',
          error: err,
        });
      });
  },

  retrieveByCode: (req: Request, res: Response, next: NextFunction): void => {
    console.log(req.params);
    Product.findByPk(parseInt(req.params.code))
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res
          .status(401)
          .json({ status: false, message: 'Fail retrieving data!', error: err })
      );
    res.status(422).json({
      status: false,
      message: 'not implemented',
    });
  },

  createProduct: (req: Request, res: Response, next: NextFunction): void => {
    // FIXME
    res.status(422).json({
      status: false,
      message: 'not implemented',
    });
  },

  updateProduct: (req: Request, res: Response, next: NextFunction): void => {
    // FIXME
    res.status(422).json({
      status: false,
      message: 'not implemented',
    });
  },

  deleteProduct: (req: Request, res: Response, next: NextFunction): void => {
    // FIXME
    res.status(422).json({
      status: false,
      message: 'not implemented',
    });
  },
};

export default productApiController;
