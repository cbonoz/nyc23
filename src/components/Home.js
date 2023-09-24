import React, { useState, } from 'react'
import { Button, Spin, Row, Col } from 'antd';
import { APP_DESC, APP_NAME } from '../constants';
import { useNavigate } from 'react-router';
import logo from './../assets/logo.png'
import { CheckCircleTwoTone } from '@ant-design/icons';

const CHECKLIST_ITEMS = [
  "Create a page in minutes. Monetize your expertise, time, and business using your existing reputation.",
  "Web3backers automatically pulls your existing social media profiles into your page from connected web3 and web2 networks.",
  "No user accounts or vendor agreements required."
];

export const Home = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState()

  return <div className='home-section'>
    <Row className='home-section'>
      <Col span={12}>
        <div className='prompt-section'>
          {/* <img src={logo} className='home-logo'/><br/> */}
          {APP_DESC}

        </div>
        {CHECKLIST_ITEMS.map((item, i) => {
          return (
            <p key={i}>
              <CheckCircleTwoTone twoToneColor="#00aa00" />
              &nbsp;
              {item}
            </p>
          );
        })}
        <div>

        </div>
        <div>
          <Button className='standard-btn' size="large" type="primary" onClick={() => navigate('/create')}>
            Create your backer page
          </Button>
        </div>
      </Col>
      <Col span={12}>
        <img className='hero-image' src={'https://cdn.dribbble.com/users/869467/screenshots/2662113/media/1c9271b1817ba7a3052ebd3dd20de096.gif'} />
      </Col>
    </Row>

  </div>

}