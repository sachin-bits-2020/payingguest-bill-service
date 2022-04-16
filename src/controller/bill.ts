import {Request , Response} from 'express'

import { getBills, createBill, getBillById, getBillByGuestId, updateBillById, deleteBillById} from '../service/bill'

export const getBillsController = async (req: Request,res: Response)=>{
 const options = {offset:Number(req.query.offset || 0),limit: Number(req.query.offset || 10)}
    try{
        const billsResponse = await getBills(options);
        return res.status(200).json({
            status: 'OK',
            result: billsResponse
        })
    }catch(error){
        return res.status(500).json({
            status: 'NOK',
            error
        })
    }
}

export const getBillByIdController = async (req: Request,res: Response)=>{
    const options = {billId: Number(req.params.billId)}
       try{
           const billsResponse = await getBillById(options);
           return res.status(200).json({
               status: 'OK',
               result: billsResponse.bill
           })
       }catch(error){
           return res.status(500).json({
               status: 'NOK',
               error
           })
       }
   }

   export const getBillByGuestIdController = async (req: Request,res: Response)=>{
    const options = {guestId: Number(req.params.guestId)}
       try{
           const billsResponse = await getBillByGuestId(options);
           return res.status(200).json({
               status: 'OK',
               result: billsResponse.bill
           })
       }catch(error){
           return res.status(500).json({
               status: 'NOK',
               error
           })
       }
   }   

   export const updateBillByIdController = async (req: Request,res: Response)=>{
    const options = {billId: Number(req.params.billId),body: req.body}
       try{
           const billsResponse = await updateBillById(options as any);
           return res.status(200).json({
               status: 'OK',
               result: billsResponse.bill
           })
       }catch(error){
           return res.status(500).json({
               status: 'NOK',
               error
           })
       }
   }   

   export const deleteBillByIdController = async (req: Request,res: Response)=>{
    const options = {billId: Number(req.params.billId)}
       try{
           const billsResponse = await deleteBillById(options as any);
           return res.status(200).json({
               status: 'OK',
               result: billsResponse.bill
           })
       }catch(error){
           return res.status(500).json({
               status: 'NOK',
               error
           })
       }
   }    

export const createBillController = async (req: Request,res: Response)=>{
    const options = req.body;
       try{
           const {error} = await createBill({...options,createdDate: new Date(req.body.createdDate).toISOString().slice(0, 19).replace('T', ' ')});
           if (error){
               throw error
           }
           return res.status(200).json({
               status: 'OK'
           });
       }catch(error){
           return res.status(500).json({
               status: 'NOK',
               error
           })
       }
   }