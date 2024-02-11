

import './index.less';

import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { LocaleFormatter, useLocale } from '@/locales';
import { formatSearch } from '@/utils/formatSearch';

import { loginAsync } from '../../stores/user.action';
import whiteLogo from '../../assets/logo/whiteLogo.png';
const ForgotPasswordModal= ({ visible, onCancel }) => {
  const { formatMessage } = useLocale();

  const onFinish = (values) => {
    // Handle the logic to send a password reset email
    // You can make an API call or implement your desired behavior here
    console.log('Send password reset email to:', values.email);

    // Close the modal after handling the submission
    onCancel();
  };

  return (
    <Modal
    // closeIcon={}
    closable={false}
      visible={visible}
      title={<p className='text-center font-weight-bold fs-4'>Reset Password</p>}
      onCancel={onCancel}
      footer={null}
    >
      <Form onFinish={onFinish}
      layout='vertical'
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <div className="row">
          <div className="col-md-6">
          {/* <Form.Item> */}
          <Button type="ghost" className='w-100 font-weight-bold '
          onClick={()=>onCancel()}
          >
Cancel
          </Button>
        {/* </Form.Item> */}
          </div>
          <div className="col-md-6">
          <Button type="primary" htmlType="submit" className='w-100 font-weight-bold '>
            Send Reset Link
          </Button>
          </div>
        </div>
     
      </Form>
    </Modal>
  );
};
export default ForgotPasswordModal;
