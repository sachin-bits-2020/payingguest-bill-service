import {Router} from 'express'

import {getBillsController,createBillController, getBillByIdController, getBillByGuestIdController,updateBillByIdController, deleteBillByIdController} from '../controller/bill'

const router = Router()

router.route('/bill')
        .get(getBillsController)
        .post(createBillController)

router.route('/bill/:billId')
.get(getBillByIdController)
.patch(updateBillByIdController)        
.delete(deleteBillByIdController) 

router.route('/bill/guest/:guestId')
.get(getBillByGuestIdController)

export default router