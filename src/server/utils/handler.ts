import { BaseResponse } from '../types/responses/common';

export const handler = <T>(callback: () => Promise<T>): Promise<T | BaseResponse> => {
  try {
    return callback();
  } catch (error) {
    return Promise.resolve({
      code: 400,
      success: true,
      message: `Internal Error  ${error}`,
    });
  }
};
