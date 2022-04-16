/** @format */

import {dataSource} from '../config'
import { Bill } from "../entity/bill";
import { GetBillsResponse, CreateBillResponse, GetBillResponse } from "../types/response";
import { CreateBillRequestBody } from "../types/request"

export const getBills = async ({limit,offset}: { limit?: number, offset?: number }): Promise<GetBillsResponse> => {
  const billsRepo = dataSource.getRepository(Bill)
  .createQueryBuilder("bill").skip(offset || 0).take(limit || 10);
  try{
    const bills = await billsRepo.getMany();
    const totalbills = await billsRepo.getCount();
  
    return {
      bills,
      pagination:{
        total:totalbills,
        offset,
        limit
      }
    }
  }catch(e){
    return {
      error: e
    }
  }
};

export const getBillById = async ({billId}: { billId: number}): Promise<GetBillResponse> => {


  try{
    const bill = await dataSource
    .getRepository(Bill)
    .createQueryBuilder("bill")
    .where("bill.billId = :billId", { billId})
    .getOne()
  
    return {
      bill
    }
  }catch(e){
    return {
      error: e
    }
  }
};

export const getBillByGuestId = async ({guestId}: { guestId: number}): Promise<GetBillResponse> => {


  try{
    const bill = await dataSource
    .getRepository(Bill)
    .createQueryBuilder("bill")
    .where("bill.guestId = :guestId", { guestId})
    .getOne()
  
    return {
      bill
    }
  }catch(e){
    return {
      error: e
    }
  }
};


export const updateBillById = async ({billId,body}: { billId: number; body: CreateBillRequestBody }): Promise<GetBillResponse> => {


  try{
     await dataSource
    .createQueryBuilder()
    .update(Bill)
    .set({...body,lastUpdatedDate: new Date().toISOString().slice(0, 19).replace('T', ' ')})
    .where("billId = :billId", { billId}).execute()

     const updatedBill = await dataSource
                      .getRepository(Bill)
                      .createQueryBuilder('bill').where("bill.billId = :billId",{billId}).getOne();         
                         
    return {
      bill:updatedBill
    }
  }catch(e){
    return {
      error: e
    }
  }
};

export const deleteBillById = async ({billId}: { billId: number}): Promise<GetBillResponse> => {
  try{
    const billToBeDeleted = await dataSource
    .getRepository(Bill)
    .createQueryBuilder('bill').where("bill.billId = :billId",{billId}).getOne();
     await dataSource
    .createQueryBuilder()
    .delete()
    .from(Bill)
    .where("billId = :billId", { billId}).execute()
  
    return {
      bill:billToBeDeleted
    }
  }catch(e){
    return {
      error: e
    }
  }
};


export const createBill = async (req: CreateBillRequestBody) : Promise<CreateBillResponse> => {

  try{
  const bill = new Bill()
  bill.guestId = req.guestId
  bill.createdBy = req.createdBy
  bill.paidDate = req.paidDate
  bill.paidAmount = req.paidAmount
  bill.createdDate = req.createdDate

  await dataSource.manager.save(bill)
  }catch(e){
    return {
      error: e
    }
  }
}



