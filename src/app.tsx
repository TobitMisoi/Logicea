import { AvatarDropdown,AvatarName,Footer } from '@/components';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { Space } from 'antd';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
const loginPath = '/user/login';

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      // const msg: any = await queryCurrentUser({
      //   skipErrorHandler: true,
      // });
      return {
        name: 'Tobit Misoi',
        avatar:
          'data:image/jpeg;base64,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',
        userid: '1',
        email: 'kipkiruitobitmisoi@gmail.com',
        signature: 'TK',
        title: 'Frontend Engineer',
        group: '',
        tags: [],
        notifyCount: 12,
        unreadCount: 11,
        country: 'Kenya',
        access: 'admin',
        geographic: {
          city: {
            label: 'Nairobi',
            key: '330100',
          },
        },
        address: 'Nairobi, Kenya',
        phone: '0759267967',
      };
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

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
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
      if (
        (!initialState?.currentUser && location.pathname !== loginPath) ||
        !localStorage.getItem('logicea_token')
      ) {
        history.push(`${loginPath}?redirect=${location.pathname}`);
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
        <div style={{ height: 'fit-content' }}>Logicea</div>
      </Space>
    ),
    ...initialState?.settings,
  };
};

export const request = {
  ...errorConfig,
};
