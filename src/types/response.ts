import {BillSchema} from './schema'

export type Pagination = {
    total: number;
    offset: number;
    limit: number;
}

export type GetBillsResponse= {
    bills?: Array<BillSchema>
    pagination?: Pagination
    error?: Object
}

export type GetBillResponse= {
    bill?: BillSchema
    error?: Object
}

export type CreateBillResponse= {
    error?: Object
}
