export type BillSchema= {
    billId: number;
    guestId: number;
    paidAmount: number;
    paidDate: string;
    createdBy: string;
    createdDate: Date;
    lastUpdatedBy: string;
    lastUpdatedDate: Date;
  }