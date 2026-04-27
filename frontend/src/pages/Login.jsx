import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaGoogle } from 'react-icons/fa';
import { useUserAuth } from '../context/UserAuthContext';
import { SignInButton, SignedOut } from "@clerk/clerk-react";
import { Form, Input, Button, Typography, Alert, Divider } from 'antd';
import './Login.css';

const { Title, Text } = Typography;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onFinish = async (values) => {
    setLoading(true);
    setError('');
    
    if (isLogin) {
      const res = await login(values.email, values.password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.message);
      }
    } else {
      const res = await register(values.name, values.email, values.password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.message);
      }
    }
    setLoading(false);
  };

  const isClerkEnabled = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && 
                        !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.includes('xxxx');

  return (
    <div className="login-container">
      <div className="login-card fade-in">
        <div className="login-header">
          <Title level={2}>{isLogin ? 'Welcome Back' : 'Create Account'}</Title>
          <Text>{isLogin ? 'Login to manage your bookings and trips' : 'Join us for your next adventure in Ladakh'}</Text>
        </div>

        <div className="auth-options">
          {/* Clerk OAuth Option */}
          {isClerkEnabled && (
            <>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button 
                    block 
                    size="large" 
                    icon={<FaGoogle className="google-icon" />} 
                    className="clerk-auth-btn"
                  >
                    Continue with Google
                  </Button>
                </SignInButton>
              </SignedOut>
              <Divider>OR</Divider>
            </>
          )}

          {/* Manual JWT Option */}
          <Form
            name="auth_form"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="auth-form"
          >
            {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24 }} />}
            
            {!isLogin && (
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your full name!' }]}
              >
                <Input 
                  prefix={<FaUser className="input-icon" />} 
                  placeholder="Full Name" 
                  size="large"
                />
              </Form.Item>
            )}
            
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input 
                prefix={<FaEnvelope className="input-icon" />} 
                placeholder="Email Address" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password 
                prefix={<FaLock className="input-icon" />} 
                placeholder="Password" 
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                size="large" 
                loading={loading}
                className="submit-btn"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="login-footer">
          <Text>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Button type="link" onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
              {isLogin ? 'Sign Up' : 'Login'}
            </Button>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
