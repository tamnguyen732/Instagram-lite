import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiResponse,
  PreviewData
} from 'next';
import { clearAllCookies, setCookie } from '~/helpers/cookie';
import { wrapper } from '~/redux/store';
import { initializeApollo } from '~/lib/ApolloCient';
import { AddParameters } from '~/types/utils';
import { ROUTES } from '~/constants/routes';
import { StoreDispatch } from '~/redux/types/store';
import { ParsedUrlQuery } from 'querystring';
import { GetSessionDocument, GetSessionQuery, UserFragment } from '~/types/generated';
import { authAction } from '~/redux/slices/authSlice';
import { COOKIE_NAMES } from '~/constants';
import { generateToken } from '~/helpers/token';

interface protectOption {
  isProtected: boolean;
}

type WithAuthProps = <P extends Record<string, unknown> = Record<string, unknown>>(
  options: protectOption,
  callback?: AddParameters<GetServerSideProps<P>, [dispatch: StoreDispatch]>
) => (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => Promise<GetServerSidePropsResult<P>>;

export const withAuth: WithAuthProps = ({ isProtected }, callback) =>
  wrapper.getServerSideProps(({ dispatch }) => async (ctx) => {
    const { req, res } = ctx;

    const { access_token, refresh_token } = req.cookies;
    const isMissingToken = !access_token || !refresh_token;
    const redirectToLogin = () => ({
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false
      }
    });

    if (isMissingToken) {
      clearAllCookies(res as NextApiResponse);
      if (isProtected) return redirectToLogin();
    }
    if (!isProtected && !isMissingToken) {
      return {
        redirect: {
          destination: ROUTES.HOME,
          permanent: true
        }
      };
    }

    if (isProtected) {
      const client = initializeApollo({ headers: ctx.req.headers });
      try {
        const {
          data: { getSession }
        } = await client.query<GetSessionQuery>({
          query: GetSessionDocument
        });
        const { user, accessToken, success } = getSession;

        if (success && accessToken) {
          if (user) {
            const newAccessToken = generateToken('accessToken', user);
            setCookie(res as NextApiResponse, [
              { key: COOKIE_NAMES.ACCESS_TOKEN, value: newAccessToken! }
            ]);
          }
        }
        if (user) {
          console.log(user);
          dispatch(authAction.setCurrentUser(user as UserFragment));
          dispatch(authAction.setIsLoggedIn(true));
        }
      } catch (error) {
        console.log('error', error);
      }
    }
    if (!callback)
      return {
        props: {}
      } as any;

    const result = await callback(ctx, dispatch);

    return {
      ...result,
      props: {}
    };
  });
