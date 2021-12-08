import { ORDER } from '../constants/order';
import { SORT } from '../constants/sort';

export const UserOrderModel = {
  order: {
    allowNull: false,
    isIn: ORDER.USER,
    defaultValue: ORDER.USER.USER_ID,
    userId: ORDER.USER.USER_ID,
    name: ORDER.USER.NAME,
    platform: ORDER.USER.PLATFORM,
    isEnable: ORDER.USER.IS_ENABLED,
    createdAt: ORDER.USER.CREATED_AT,
  },

  sort: {
    allowNull: false,
    isIn: SORT,
    defaultValue: SORT.DESC,
    asc: SORT.ASC,
    desc: SORT.DESC,
  },
};
