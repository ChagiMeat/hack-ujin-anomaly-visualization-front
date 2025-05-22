import {Button, Flex, Segmented, Space, Switch, Typography} from 'antd';
import {
  HomeOutlined,
  LineChartOutlined,
  LoadingOutlined,
  MoonOutlined,
  SunOutlined,
  ThunderboltTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import {Outlet, useLocation, useNavigate} from 'react-router';
import {SegmentedLabeledOption} from 'rc-segmented';
import cls from './MainContainer.module.css';
import {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import ConfigStore from '../../../store/configStore.ts';
import ApartmentStore from "../../../store/appartmentStore.ts";

const segmentedConfig: SegmentedLabeledOption<string>[] = [
  {
    label: (
      <Space>
        <HomeOutlined/>
        Главная
      </Space>
    ),
    value: '',
    disabled: false,
  },
  {
    label: (
      <Space>
        <LineChartOutlined/>
        Детализация
      </Space>
    ),
    value: 'apartment-details',
    disabled: true,
  },
];

function MainContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSelection, setCurrentSelection] = useState<string>(segmentedConfig[0].value);
  const [isLoadingGlobal, setIsLoadingGlobal] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSelection(
      segmentedConfig.toReversed().find((segment) => location.pathname.includes(segment.value))
        ?.value ?? segmentedConfig[0].value,
    );
  }, [location]);

  useEffect(() => {
    const isLoading = ApartmentStore.isLoading;
    setIsLoadingGlobal(isLoading);
  }, [ApartmentStore.isLoading]);

  return (
    <>
      <Flex justify='space-between' align='center'>
        <Space>
          <Typography.Title>Личный кабинет UJIN</Typography.Title>
          {ConfigStore.isWorking && <ThunderboltTwoTone/>}
          {isLoadingGlobal && <LoadingOutlined style={{fontSize: 32}} size={32}/>}
        </Space>

        <Space size='large'>
          <Switch
            onChange={checked => {
              ConfigStore.changeTheme(checked ? 'dark' : 'light');
            }}
            checkedChildren={<MoonOutlined/>}
            unCheckedChildren={<SunOutlined/>}
            checked={ConfigStore.theme === 'dark'}
          />
          <Button
            onClick={() => navigate('settings')}
            type='text'
            icon={<UserOutlined style={{fontSize: 24}}/>}
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
        <Outlet/>
      </div>
    </>
  );
}

export default observer(MainContainer);