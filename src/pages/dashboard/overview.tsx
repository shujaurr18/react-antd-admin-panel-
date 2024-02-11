import type { ColProps } from 'antd/es/col';
import type { FC } from 'react';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Badge, Card, Col, Progress, Row, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';

import { useLocale } from '@/locales';

import { ReactComponent as CaretDownIcon } from './assets/caret-down.svg';
import { ReactComponent as CaretUpIcon } from './assets/caret-up.svg';


// const data = [
//   { name: 'Jan', value: 100 },
//   { name: 'Feb', value: 60 },
//   { name: 'Mar', value: 20 },
//   { name: 'Apr', value: -20 },
//   { name: 'May', value: -60 },
//   { name: 'Jun', value: -10 },
//   { name: 'Jul', value: 0 },
//   { name: 'Aug', value: 100 },
//   { name: 'Sep', value: 60 },
//   { name: 'Oct', value: 20 },
//   { name: 'Nov', value: -20 },
//   { name: 'Dec', value: -60 },
// ];
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: -3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: -2000,
    pv: -9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: -1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: -3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
// const data = [
//   {
//     name: 'Jan',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Feb',
//     uv: -3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Mar',
//     uv: -2000,
//     pv: -9800,
//     amt: 2290,
//   },
//   {
//     name: 'Apr',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'May',
//     uv: -1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Jun',
//     uv: 2390,
//     pv: -3800,
//     amt: 2500,
//   },
//   {
//     name: 'Aug',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: 'Sep',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];
const lines = [
  {
    type: 'monotone',
    dataKey: 'value',
    stroke: '#8884d8',
    activeDot: { r: 8 },
  },
];
const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

interface ColCardProps {
  metaName: string;
  metaCount: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  loading: boolean;
}

const ColCard: FC<ColCardProps> = ({ metaName, metaCount, body, footer, loading }) => {
  return (
    <Col {...wrapperCol}>
      <Card loading={loading} className="overview" bordered={false} style={{height:300}}>
        <div className="overview-header border-bottom  ">
          <div className="fs-3 font-weight-medium ">{metaName}</div>
          <div className="text-primary fs-2 font-weight-medium">{metaCount}</div>
          <div className="font-weight-medium pb-3">Secondary text</div>

          
        </div>
        <div className="overview-body pt-3">{body}</div>
        {/* <div className="overview-footer">{footer}</div> */}
      </Card>
    </Col>
  );
};

interface TrendProps {
  wow: string;
  dod: string;
  style?: React.CSSProperties;
}

const Trend: FC<TrendProps> = ({ wow, dod, style = {} }) => {
  const { formatMessage } = useLocale();

  return (
    <div className="trend" style={style}>
      <div className="trend-item">
        <span className="trend-item-label">{formatMessage({ id: 'app.dashboard.overview.wowChange' })}</span>
        <span className="trend-item-text">{wow}</span>
        <CaretUpIcon color="#f5222d" />
      </div>
      <div className="trend-item">
        <span className="trend-item-label">{formatMessage({ id: 'app.dashboard.overview.dodChange' })}</span>
        <span className="trend-item-text">{dod}</span>
        <CaretDownIcon color="#52c41a" />
      </div>
    </div>
  );
};

const CustomTooltip: FC<any> = ({ active, payload, label }) =>
  active && (
    <div className="customTooltip">
      <span className="customTooltip-title">
        <Badge color={payload[0].fill} /> {label} : {payload[0].value}
      </span>
    </div>
  );

interface FieldProps {
  name: string;
  number: string;
}

const Field: FC<FieldProps> = ({ name, number }) => (
  <div className="field">
    <span className="field-label">{name}</span>
    <span className="field-number">{number} </span>
  </div>
);

const Overview: FC<{ loading: boolean }> = ({ loading }) => {
  const { formatMessage } = useLocale();

  return (
    <Row gutter={[12, 12]} className="mb-2">
       <ColCard
        loading={loading}
        metaName={formatMessage({ id: 'app.dashboard.overview.payments' })}
        // css={{fontSize:172}}
        metaCount="6560"
        body={
          <ResponsiveContainer width="100%" height="100%">
          <BarChart
          height={300}
          width={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        }
        // footer={<Field name={formatMessage({ id: 'app.dashboard.overview.conversionRate' })} number="60%" />}
      />
      {/* <ColCard
        loading={loading}
        metaName={formatMessage({ id: 'app.dashboard.overview.totalSales' })}
        metaCount="¥ 126,560"
        body={<Trend wow="12%" dod="12%" />}
        footer={<Field name={formatMessage({ id: 'app.dashboard.overview.dailySales' })} number="￥12,423" />}
      /> */}
      {/* <ColCard
        loading={loading}
        metaName={formatMessage({ id: 'app.dashboard.overview.visits' })}
        metaCount="8846"
        body={
          <ResponsiveContainer>
            <AreaChart data={data}>
              <XAxis dataKey="name" hide />
              <RTooltip content={<CustomTooltip />} />
              <Area strokeOpacity={0} type="monotone" dataKey="number" fill="#8E65D3" />
            </AreaChart>
          </ResponsiveContainer>
        }
        footer={<Field name={formatMessage({ id: 'app.dashboard.overview.dailySales' })} number="1234" />}
      /> */}


      {/* <ColCard
        loading={loading}
        metaName={formatMessage({ id: 'app.dashboard.overview.operationalEffect' })}
        metaCount="8846"
        body={<Progress strokeColor="#58BFC1" percent={85} />}
        footer={<Trend style={{ position: 'inherit' }} wow="12%" dod="12%" />}
      /> */}
    </Row>
  );
};

export default Overview;
