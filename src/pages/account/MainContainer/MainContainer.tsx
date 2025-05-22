import { Button, Flex, Segmented, Space, Switch, Typography } from 'antd';
import {
  HomeOutlined,
  MoonOutlined,
  QuestionCircleOutlined,
  SlidersOutlined,
  SunOutlined,
  ThunderboltTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { SegmentedLabeledOption } from 'rc-segmented';
import cls from './MainContainer.module.css';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import ConfigStore from '../../../store/configStore.ts';

const segmentedConfig: SegmentedLabeledOption<string>[] = [
  {
    label: (
      <Space>
        <HomeOutlined />
        Главная
      </Space>
    ),
    value: '',
    disabled: false,
  },
  {
    label: (
      <Space>
        <SlidersOutlined />
        Настройки
      </Space>
    ),
    value: 'configuration',
    disabled: false,
  },
  {
    label: (
      <Space>
        <QuestionCircleOutlined />
        Помощь
      </Space>
    ),
    value: 'help',
    disabled: false,
  },
];

function MainContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSelection, setCurrentSelection] = useState<string>(segmentedConfig[0].value);

  useEffect(() => {
    setCurrentSelection(
      segmentedConfig.toReversed().find((segment) => location.pathname.includes(segment.value))
        ?.value ?? segmentedConfig[0].value,
    );
  }, [location]);

  return (
    <>
      <Flex justify='space-between' align='center'>
        <Space>
          <Typography.Title>Alpha</Typography.Title>
          {ConfigStore.isWorking && <ThunderboltTwoTone />}
        </Space>

        <Space size='large'>
          <Switch
            onChange={checked => {
              ConfigStore.changeTheme(checked ? 'dark' : 'light');
            }}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            checked={ConfigStore.theme === 'dark'}
          />
          <Button
            onClick={() => navigate('settings')}
            type='text'
            icon={<UserOutlined style={{ fontSize: 24 }} />}
          />
        </Space>
      </Flex>

      <Segmented<string>
        block
        options={segmentedConfig}
        onChange={(value) => navigate(value)}
        defaultValue={currentSelection}
        value={currentSelection}
      />
      <div className={cls.mainContainer}>
        <Outlet />
      </div>
    </>
  );
}

export default observer(MainContainer);