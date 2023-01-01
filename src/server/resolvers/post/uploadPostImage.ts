import { Arg, ClassType, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { verifyAuth } from '~/server/middlewares';
import { UploadImageResponse } from '~/server/types/responses/post/';
import status from 'http-status';
import cloudinaryUploader from '~/helpers/cloudinaryUploader';
const uploadPostImage = (Base: ClassType) => {
  @Resolver()
  class uploadPostImage extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello create image';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => UploadImageResponse)
    async uploadPostImage(@Arg('imageBase64') imageBase64: string): Promise<UploadImageResponse> {
      const { uploadImage } = cloudinaryUploader('posts');

      const imageUrl = await uploadImage(imageBase64);
      if (!imageUrl) {
        return {
          code: status.BAD_REQUEST,
          success: true,
          message: 'Image Not Created',
          imageUrl: ''
        };
      }
      return {
        code: status.CREATED,
        success: true,
        imageUrl
      };
    }
  }
  return uploadPostImage;
};

export default uploadPostImage;
