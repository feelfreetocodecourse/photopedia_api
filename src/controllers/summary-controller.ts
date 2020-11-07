import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user";
import { OrderModel } from "../models/order";
const { HOST } = process.env;

async function getSaleSummary() {
  const summary = await OrderModel.aggregate()
    .match({
      orderStatus: "Success",
    })
    .group({
      _id: "$picture",
      count: {
        $sum: 1,
      },
      totalSale: {
        $sum: "$price",
      },
    })
    .lookup({
      from: "pictures",
      localField: "_id",
      foreignField: "_id",
      as: "picture",
    })
    .project({
      _id: 0,
      totalSale: 1,
      count: 1,
      "picture._id": 1,
      "picture.title": 1,
      "picture.thumbnail": 1,
    });

  return summary.map((e) => {
    const picture = e.picture[0];

    picture.thumbnail = `${HOST}/api/file/thumbnail/${picture._id}`;
    e.picture = picture;
    return e;
  });
}

export async function summary(request: Request, response: Response) {
  const saleSummary = await getSaleSummary();
  const totalUsers = await UserModel.find().countDocuments();
  const totalOrders = await OrderModel.find({
    orderStatus: "Success",
  }).countDocuments();
  response.json({
    summary: {
      saleSummary,
      totalUsers,
      totalOrders,
    },
  });
}
