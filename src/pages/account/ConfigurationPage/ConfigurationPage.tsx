import { Button, Flex, Input, InputNumber, Select, Space, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Colors } from '../../../consts.ts';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ConfigurationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  function handleSave() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }

  return (
    <Flex vertical justify="space-between" align="stretch" flex="1">
      <Space direction="vertical" size="large">
        <Space style={{ width: '100%' }} direction="vertical">
          <Typography.Text>Авторизационный токен "42[...</Typography.Text>
          <Input.TextArea autoSize variant="filled" placeholder='Авторизационный токен "42[...' />
        </Space>

        <Space direction="vertical">
          <Space>
            <InputNumber<number> variant="filled" controls min={0} defaultValue={3} />
            <Typography.Text>
              Минимальный импульс&nbsp;
              <Link to="/account/help">
                <QuestionCircleOutlined />
              </Link>
            </Typography.Text>
          </Space>

          <Space>
            <InputNumber<number> variant="filled" controls min={0} defaultValue={4} />
            <Typography.Text>
              Минимальный разрыв&nbsp;
              <Link to="/account/help">
                <QuestionCircleOutlined />
              </Link>
            </Typography.Text>
          </Space>

          <Space>
            <InputNumber<number> variant="filled" controls min={0} defaultValue={5} />
            <Typography.Text>
              Интервал, сек.&nbsp;
              <Link to="/account/help">
                <QuestionCircleOutlined />
              </Link>
            </Typography.Text>
          </Space>
        </Space>

        <Space>
          <Space.Compact>
            <Select
              defaultValue="EURRUB"
              options={[
                { value: 'EURRUB', label: 'EURRUB' },
                { value: 'USDRUB', label: 'USDRUB' },
                { value: 'BTSUSDT', label: 'BTSUSDT' },
              ]}
            />
            <Input variant="filled" placeholder="Текущая пара" />
          </Space.Compact>
          <Typography.Text>
            Пара&nbsp;
            <Link to="/account/help">
              <QuestionCircleOutlined />
            </Link>
          </Typography.Text>
        </Space>

        <Typography.Text type="secondary">
          <ExclamationCircleOutlined style={{ color: Colors.Warning }} />
          &nbsp; Пояснения к параметрам конфигурации находятся на вкладке&nbsp;
          <Link to={'/account/help'}>помощь</Link>
        </Typography.Text>
      </Space>

      <Space direction="vertical">
        <Button block type="primary" loading={loading} onClick={handleSave}>
          Сохранить
        </Button>
        <Button block type="text" onClick={() => navigate('/account')}>
          Отмена
        </Button>
      </Space>
    </Flex>
  );
}
