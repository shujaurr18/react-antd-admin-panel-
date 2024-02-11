import { FC, useState } from 'react';

import { LogoutOutlined, RightOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Layout, Modal, theme as antTheme, Tooltip } from 'antd';
import { createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createFromIconfontCN } from '@ant-design/icons';

import Avator from '@/assets/header/avator.jpeg';
import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg';
import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';
import { ReactComponent as MoonSvg } from '@/assets/header/moon.svg';
import { ReactComponent as SunSvg } from '@/assets/header/sun.svg';
import { ReactComponent as ZhCnSvg } from '@/assets/header/zh_CN.svg';
import AntdSvg from '@/assets/logo/antd.svg';
import ReactSvg from '@/assets/logo/blackLogo.png';
import { LocaleFormatter, useLocale } from '@/locales';
import { setGlobalState } from '@/stores/global.store';
import { setUserItem } from '@/stores/user.store';

import { logoutAsync } from '../../stores/user.action';
import HeaderNoticeComponent from './notice';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { logged, locale, device } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.global);
  const navigate = useNavigate();
  const token = antTheme.useToken();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);


  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
        const res = Boolean(await dispatch(logoutAsync()));

        res && navigate('/login');

        return;
    }
  };

  const toLogin = () => {
    navigate('/login');
  };

  const selectLocale = ({ key }: { key: any }) => {
    dispatch(setUserItem({ locale: key }));
    localStorage.setItem('locale', key);
  };

  const onChangeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    dispatch(
      setGlobalState({
        theme: newTheme,
      }),
    );
  };

  return (
    <Header className="layout-page-header bg-2" style={{ backgroundColor: token.token.colorBgContainer }}>
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 250 }}>
          <img src={ReactSvg} alt="" style={{ marginRight: collapsed ? '2px' : '20px' }} />
          {/* <img src={AntdSvg} alt="" /> */}
          <span className='text-capitalize font-weight-medium'>

<RightOutlined className='font-weight-medium' style={{width:12,position:'relative',top:2}}  />      {window.location.pathname.replace(/\//g, '')}
</span>
        </div>
      )}
      <div className="layout-page-header-main">
        <div >

          {/* <span id="sidebar-trigger">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span> */}
        </div>
        <div className="actions">
      
      
          <HeaderNoticeComponent />
          {/* <Dropdown
            menu={{
              onClick: info => selectLocale(info),
              items: [
                {
                  key: 'zh_CN',
                  icon: <ZhCnSvg />,
                  disabled: locale === 'zh_CN',
                  label: '简体中文',
                },
                {
                  key: 'en_US',
                  icon: <EnUsSvg />,
                  disabled: locale === 'en_US',
                  label: 'English',
                },
              ],
            }}
          >
            <span>
              <LanguageSvg id="language-change" />
            </span>
          </Dropdown> */}

          {logged ? (
                 <span className="notice rotateIcon" id="notice-center"
                 
                 onClick={()=>setLogoutModalVisible(true)}
                 >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                 {/* <BellFilled style={{width:15}} /> */}
               </span>
            // <Dropdown
            //   menu={{
            //     items: [
            //       {
            //         key: '1',
            //         icon: <UserOutlined />,
            //         label: (
            //           <span onClick={() => navigate('/dashboard')}>
            //             <LocaleFormatter id="header.avator.account" />
            //           </span>
            //         ),
            //       },
            //       {
            //         key: '2',
            //         icon: <LogoutOutlined />,
            //         label: (
            //           <span onClick={() => onActionClick('logout')}>
            //             <LocaleFormatter id="header.avator.logout" />
            //           </span>
            //         ),
            //       },
            //     ],
            //   }}
            // >
            //   <span className="user-action">
            //     <img src={Avator} className="user-avator" alt="avator" />
            //   </span>
            // </Dropdown>
          ) : (
            <span style={{ cursor: 'pointer' }} onClick={toLogin}>
              {formatMessage({ id: 'gloabal.tips.login' })}
            </span>
          )}
        </div>
      </div>
      <Modal
        // title=""
        visible={logoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        closable={false}
        title={<p className='text-center font-weight-bold fs-4'>Are you sure?</p>}
        footer={null}
        width={300}
      >
        <div className="d-flex gap-4">

         <Button type='ghost' className='font-weight-medium w-100'  onClick={() => setLogoutModalVisible(false)}>
            Cancel
          </Button>
          <Button   className="btn-danger w-100 " onClick={() => onActionClick('logout')}>
            Logout
          </Button>
        </div>
      </Modal>
    </Header>
  );
};

export default HeaderComponent;
