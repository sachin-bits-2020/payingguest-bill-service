/** @format */

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'Bill' })
export class Bill {
  @PrimaryGeneratedColumn()
  billId: number;

  @Column()
  guestId: number;

  @Column()
  paidAmount: number;

  @Column()
  paidDate: string;

  @Column()
  createdBy: string;

  @Column({ type: 'timestamp', nullable: true })
  createdDate: Date | null;

  
  @Column({nullable: true})
  lastUpdatedBy:  string | null;;

  @Column({ type: 'timestamp', nullable: true })
  lastUpdatedDate: Date | null;
  
}
