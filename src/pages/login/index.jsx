import { FC, useState } from 'react';

import './index.less';

import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { LocaleFormatter, useLocale } from '@/locales';
import { formatSearch } from '@/utils/formatSearch';

import { loginAsync } from '../../stores/user.action';
import whiteLogo from '../../assets/logo/whiteLogo.png'
// import { login } from 'react-feather';
import ForgotPasswordModal from "./ForgotPasswordModal"
import { EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';

const initialValues= {
  username: 'guest',
  password: 'guest',
  // remember: true
};

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);

  const onForgotPasswordClick = () => {
    setForgotPasswordModalVisible(true);
  };

  const onCancelForgotPassword = () => {
    setForgotPasswordModalVisible(false);
  };

  const onFinished = async (form) => {
    const res = dispatch(await loginAsync(form));

    if (!!res) {
      const search = formatSearch(location.search);
      const from = search.from || { pathname: '/' };

      navigate(from);
    }
  };

  return (
    <div className="login-page">
      <div className="container-fluid">

<div className="row  row-reverse-mobile   align-items-center">
  <div className="col-md-8 bgLogin">
<img src={whiteLogo} height={200} alt="" />
  </div>
  <div className="col-md-4">

      <Form
      layout='vertical'
      onFinish={onFinished} className="login-page-form" >
        <h1 className='mb-4'>Login</h1>
        <p className=' font-weight-bold mb-4 welcome-text'>Welcome Back!</p>
          <Form.Item
          
          label="Email"
            name="email"
            rules={[
              {
                required: true,
                // message: formatMessage({
                //   id: 'gloabal.tips.enterUsernameMessage',
                // }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'gloabal.tips.username',
              })}
            />
          </Form.Item>
          <Form.Item
  label="Password"
  name="password"
  rules={[
    {
      required: true,
      message: formatMessage({
        id: 'gloabal.tips.enterPasswordMessage',
      }),
    },
  ]}
>
  <Input.Password
    placeholder={formatMessage({
      id: 'gloabal.tips.password',
    })}
    iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
  />
</Form.Item>
        <div className="d-flex justify-content-between align-items-center">

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>
            <LocaleFormatter id="gloabal.tips.rememberUser" />
          </Checkbox>
        </Form.Item>
        <p className='text-primary font-weight-medium cursor-pointer'
        onClick={onForgotPasswordClick}
        >Forgot Password?</p>
        </div>
        <Form.Item>
          <Button htmlType="submit" type="primary" className="">
          <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mr-2 feather feather-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>  <LocaleFormatter id="gloabal.tips.login" />
          </Button>
        </Form.Item>
      </Form>
  </div>
      </div>
</div>
<ForgotPasswordModal
        visible={forgotPasswordModalVisible}
        onCancel={onCancelForgotPassword}
      />
    </div>
  );
};

export default LoginForm;
