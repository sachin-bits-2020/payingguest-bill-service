import {BillSchema} from './schema'

export type CreateBillRequestBody= Omit<BillSchema,"billId">;
  