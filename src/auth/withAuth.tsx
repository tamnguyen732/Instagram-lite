import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiResponse,
  PreviewData
} from 'next';
import { clearAllCookies } from '~/helpers/cookie';
import { wrapper } from '~/redux/store';
import { initializeApollo } from '~/lib/ApolloCient';
import { AddParameters } from '~/types/utils';
import { ROUTES } from '~/constants/routes';
import { StoreDispatch } from '~/redux/types/store';
import { ParsedUrlQuery } from 'querystring';
import { BaseUserFragment, GetSessionDocument, GetSessionQuery } from '~/types/generated';
import { authAction } from '~/redux/slices/authSlice';

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
    const { req, res, resolvedUrl } = ctx;

    const { access_token, refresh_token } = req.cookies;
    const isMissingToken = !access_token || !refresh_token;
    const redirectToLogin = () => ({
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false
      }
    });

    const removeSession = () => {
      clearAllCookies(res as NextApiResponse);
      return redirectToLogin();
    };

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
        const { user } = getSession;
        dispatch(authAction.setCurrentUser(user as BaseUserFragment));
        dispatch(authAction.setIsLoggedIn(true));
      } catch (error) {
        console.log(error);
        return removeSession();
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

// export const withRoute: WithPageProps = (options) => (callback) =>
//   wrapper.getServerSideProps(({ dispatch }) => async (ctx) => {
//     const { req, res, resolvedUrl } = ctx;

//     const { isProtected } = options;
//     const { access_token, refresh_token, prev_route } = req.cookies;
//     const isMissingToken = !access_token || !refresh_token;

//     const redirectToLogin = () => ({
//       redirect: {
//         destination: ROUTES.LOGIN,
//         permanent: false
//       }
//     });

//     const removeSession = () => {
//       clearAllCookies(res as NextApiResponse);

//       return redirectToLogin();
//     };

//     if (isMissingToken) {
//       clearAllCookies(res as NextApiResponse);

//       if (isProtected) return redirectToLogin();
//     }

//     // Redirect back if try to login when authenticated
//     if (!isProtected && !isMissingToken)
//       return {
//         redirect: {
//           destination: prev_route ?? ROUTES.HOME,
//           permanent: false
//         }
//       };

//     if (isProtected) {
//       const client = initializeApollo({ headers: ctx.req.headers });

//       try {
//         const {
//           data: { getSession }
//         } = await client.query<GetSessionQuery>({
//           query: GetSessionDocument
//         });

//         const { success, user, accessToken } = getSession;

//         // Invalid token
//         if (!success) return removeSession();

//         if (user) dispatch(true);
//       } catch (error) {
//         return removeSession();
//       }
//     }

//     if (!callback)
//       return {
//         props: {}
//       } as any;

//     const result = await callback(ctx, dispatch);

//     if ('props' in result)
//       return {
//         ...result,
//         props: {
//           ...result.props
//         }
//       };

//     return {
//       ...result,
//       props: {}
//     };
//   });
