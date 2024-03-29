import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FieldTimeOutlined } from '@ant-design/icons';
import { Button, Card, Carousel, Col, Image, Row, Typography } from 'antd';

import { store } from '../app/store';
import { getAllNews } from '../feature/news/NewsSlice';
const { Title } = Typography;

function NewsHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedNews = useSelector((state) => state.newsReducer.news);

  React.useEffect(() => {
    dispatch(getAllNews());
  }, []);

  return (
    <Col style={{ margin: 'auto', width: '80%', marginBottom: '8rem' }}>
      <Row justify="start" style={{ marginTop: '2rem', marginBottom: '0rem' }}>
        <Col>
          <Title
            style={{
              color: 'black',
              fontSize: '4rem',
              fontWeight: 'bolder',
              textAlign: 'left',
            }}
          >
            News
          </Title>
        </Col>
      </Row>

      {/* carousel */}

      <Row>
        <Col span={24}>
          {storedNews
            ? storedNews.map((news, index) => {
                <div key={index}>
                  <p> {news.content}</p>
                </div>;
              })
            : null}
        </Col>
      </Row>

      {/* list news */}

      <Row style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        {storedNews
          ? storedNews.map((news, index) => (
              <Col span={24} key={index}>
                <Row style={{ marginBottom: '-1.2rem' }} align="middle">
                  <Col span={6}>
                    <div style={{ width: '200px', height: '150px' }}>
                      <Image width={240} src={news.image} />
                    </div>
                  </Col>
                  <Col span={18}>
                    <Card
                      bordered={false}
                      style={{
                        height: 127,
                        backgroundColor: '#faf1e2',
                        marginBottom: '40px',
                      }}
                    >
                      <a
                        onClick={() => navigate(news.id)}
                        style={{
                          color: '#511318',
                          backgroundColor: '#faf1e2',
                          fontSize: '1.3rem',
                          fontWeight: 'bolder',
                          display: 'block',
                          marginBottom: '0.2rem',
                          marginTop: '-0.9rem',
                          border: 'none',
                        }}
                      >
                        {news.title}
                      </a>
                      <div style={{ marginBottom: '0.3rem' }}>
                        <FieldTimeOutlined /> <span> {new Date(news.createat).toLocaleString()} </span>
                      </div>
                      <p>{news.content}</p>
                    </Card>
                  </Col>
                </Row>
              </Col>
            ))
          : null}
      </Row>
    </Col>
  );
}

export default NewsHome;
