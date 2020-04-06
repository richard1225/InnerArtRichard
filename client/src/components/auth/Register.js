import React from 'react'
import { Form, Input, Button, message } from 'antd'
import api from '../../utils/api'
import axios from 'axios'
import './Register.css'

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 36 }
}

const onFinish = values => {
  axios({
    url: api.userRegist,
    method: 'post',
    data: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(
    res => {
      if (res.data.token) {
        message.success('Regist Successful! ')
      }
    },
    err => {
      const resp = err.response.data
      console.log(resp)
      if (resp.errors) {
        resp.errors.map(errItem => {
          message.error(errItem.msg)
        })
      } else if (resp.msg) {
        message.error(resp.msg)
      }
    }
  )
  // axios.post(api.userRegist, values).then(res => {
  //   console.log(res)
  // })
}

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}

const comparePasswSame = (rule, value) => {
  if (value.password === value.passwordConfirm) {
    return Promise.resolve()
  }
  return Promise.reject('passwords are not the same')
}

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  }

  render() {
    return (
      <div className="register-wrapper">
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Input your username' }]}
          >
            <Input placeholder="User name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Input your email' }]}
          >
            <Input type="email" placeholder="Email / Phone number" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Input your password' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: 'Please confirm your password!'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    'The two passwords that you entered do not match!'
                  )
                }
              })
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item {...layout}>
            <div>
              <i className="iconfont icongoogle"></i>
              <i className="iconfont iconfacebook"></i>

              <div>
                Already have an account?{' '}
                <a href="./login" target="_blank">
                  Log in
                </a>
              </div>
            </div>
          </Form.Item>
          <Form.Item {...layout}>
            <Button
              type="primary"
              className="login-form-button"
              shape="round"
              htmlType="submit"
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  handleChange(e) {
    this.setState({ login: e.target.value })
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`)
  }
}

export default Register
