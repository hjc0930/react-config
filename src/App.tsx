import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import classNames from 'classnames';
import styles from './app.less';

const commentData = [
  {
    key: 0,
    key2: 2,
    key3: 3,
    key4: 4,
    key5: 5,
    key6: 6,
  },
  {
    key: 1,
    key2: 2,
    key3: 3,
    key4: 4,
    key5: 5,
    key6: 6,
  },
  {
    key: 2,
    key2: 2,
    key3: 3,
    key4: 4,
    key5: 5,
    key6: 6,
  },
  {
    key: 3,
    key2: 2,
    key3: 3,
    key4: 4,
    key5: 5,
    key6: 6,
  },
  {
    key: 4,
    key2: 2,
    key3: 3,
    key4: 4,
    key5: 5,
    key6: 6,
  },
]

const columnData = {
  key: 5,
  key2: 2,
  key3: 3,
  key4: 4,
  key5: 5,
  key6: 6,
}
const columnData2 = {
  key: 5,
  key2: 123123123,
  key3: 3,
  key4: 4,
  key5: 5,
  key6: 6,
}
const columnData3 = {
  key: 5,
  key2: 12414142,
  key3: 3,
  key4: 4,
  key5: 5,
  key6: 6,
}
function App() {
  const [dataSource, setDataSource] = useState([...commentData, columnData]);
  const [current, setCurrent] = useState<0 | 1 | 2 | 3 | undefined>(undefined);
  const [count, setCount] = useState<number>();

  useEffect(() => {
    switch (current) {
      case 2:
        setDataSource([...commentData, columnData2]);
        break;
      case 3:
        setDataSource([...commentData, columnData3])
        break;
      default:
        setDataSource([...commentData, columnData])

    }
  }, [current])

  const columns: ColumnsType<any> = [
    {
      title: '',
      dataIndex: 'key'
    },
    {
      title: '赠送积分',
      dataIndex: 'key2'
    },
    {
      title: '产品数据下载',
      dataIndex: 'key3'
    },
    {
      title: '评论数据下载',
      dataIndex: 'key4'
    },
    {
      title: '免费查看所有插件数据',
      dataIndex: 'key5'
    },
    {
      title: '免费查看所有动态详情数据',
      dataIndex: 'key6'
    },
  ]
  return (
    <>
      <input type="text" />
      <span>{dayjs(Number('1660813575068')).format('YYYY-MM-DD HH:mm:ss')}</span>
      <br />
      {/* <span>{moment(1660813575068).format('YYYY-MM-DD HH:mm:ss')}</span> */}
      <div className={styles.gridWrap}>
        {[0, 1, 2, 3].map((item) => (
          <div key={item}>
            {item}
          </div>
        ))}
      </div>
      <Table
        columns={columns}
        className={classNames(
          { [styles.tableVipColumn]: current === 0 },
          { [styles.tableVipColumnLast]: current !== undefined && current !== 0 })
        }
        bordered
        sticky
        pagination={false}
        rowKey="key"
        dataSource={dataSource}
      />
    </>
  )
}

export default App;