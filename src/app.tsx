import { AvatarDropdown,AvatarName,Footer } from '@/components';
import { currentUser as queryCurrentUser } from '@/services/logicea/api';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { Space } from 'antd';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg: any = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data?.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  console.log(initialState);
  return {
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: undefined,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    locale: undefined,
    menuHeaderRender: () => (
      <Space
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 2.06999V0.0499878C6.99 0.249988 5.16 1.04999 3.68 2.25999L5.1 3.68999C6.21 2.82999 7.54 2.24999 9 2.06999ZM16.32 2.25999C14.84 1.04999 13.01 0.249988 11 0.0499878V2.06999C12.46 2.24999 13.79 2.82999 14.9 3.68999L16.32 2.25999ZM17.93 8.99999H19.95C19.75 6.98999 18.95 5.15999 17.74 3.67999L16.31 5.09999C17.17 6.20999 17.75 7.53999 17.93 8.99999ZM3.69 5.09999L2.26 3.67999C1.05 5.15999 0.250003 6.98999 0.0500031 8.99999H2.07C2.25 7.53999 2.83 6.20999 3.69 5.09999ZM2.07 11H0.0500031C0.250003 13.01 1.05 14.84 2.26 16.32L3.69 14.89C2.83 13.79 2.25 12.46 2.07 11ZM13 9.99999C13 8.33999 11.66 6.99999 10 6.99999C8.34 6.99999 7 8.33999 7 9.99999C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 9.99999ZM16.31 14.9L17.74 16.33C18.95 14.85 19.75 13.01 19.95 11.01H17.93C17.75 12.46 17.17 13.79 16.31 14.9ZM11 17.93V19.95C13.01 19.75 14.84 18.95 16.32 17.74L14.89 16.31C13.79 17.17 12.46 17.75 11 17.93ZM3.68 17.74C5.16 18.95 7 19.75 9 19.95V17.93C7.54 17.75 6.21 17.17 5.1 16.31L3.68 17.74Z"
              fill="#323232"
            />
          </svg>
        </div>
        <div style={{  height: 'fit-content' }}>Logicea</div>
      </Space>
    ),

    childrenRender: (children) => {
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

export const request = {
  ...errorConfig,
};
