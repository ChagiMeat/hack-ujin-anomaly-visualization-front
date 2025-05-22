import { Button, Flex, Space, Typography } from 'antd';
import { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Colors } from '../../../consts.ts';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import ConfigStore from '../../../store/configStore.ts';

function MainPage() {
  const [active, setActive] = useState<boolean>(ConfigStore.isWorking);
  const [loading, setLoading] = useState<boolean>(false);

  function handleStartButton() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActive((prevState) => {
        ConfigStore.isWorking = !prevState;
        return !prevState;
      });
    }, 700);
  }

  return (
    <Flex vertical justify='center' align='center' flex='1'>
      <Space direction='vertical' align='center' size='middle'>
        <Button
          loading={loading}
          onClick={handleStartButton}
          type='primary'
          size='large'
          danger={active}
        >
          {!active ? 'Запуск' : 'Отмена'}
        </Button>
        <Typography.Text type='secondary'>
          <ExclamationCircleOutlined style={{ color: Colors.Warning }} />
          &nbsp; Перед запуском бота проверьте&nbsp;
          <Link to={'/account/configuration'}>настройки</Link>
        </Typography.Text>
      </Space>
    </Flex>
  );
}

export default observer(MainPage);
