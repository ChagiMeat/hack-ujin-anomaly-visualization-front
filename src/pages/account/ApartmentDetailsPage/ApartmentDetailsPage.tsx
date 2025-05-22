import {Card, Flex, Progress, Typography} from 'antd';
import HUApartmentScene from "../../../components/HUApartmentScene/HUApartmentScene.tsx";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import ApartmentStore from "../../../store/appartmentStore.ts";
import {observer} from "mobx-react";

const ApartmentDetailsPage = observer(() => {
  const [searchParams] = useSearchParams();
  const apartmentId = searchParams.get('apartmentId');
  const eg = searchParams.get('eg');

  useEffect(() => {
    if(apartmentId && eg) {
      void ApartmentStore.fetchApartmentDevices({apartmentId, eg});
    }
  }, []);

  return (
    <Flex flex='1' justify='center' align='center'>
      <Flex gap={12} style={{width: '100%', height: '100%'}} vertical align='flex-start'>
        <Typography.Title level={2}>Список устройств</Typography.Title>
        <Flex vertical gap={12} style={{ width: '80%', overflowY: 'auto'}}>
          {ApartmentStore.allDevicesInfo.map(item => (
            <Card style={{width: '100%'}}>
              <Flex justify='space-between'>
                <Flex vertical>
                  <Typography.Text strong>{item.signal_label}</Typography.Text>
                  <Typography.Text type='secondary'>{item.name}</Typography.Text>
                </Flex>
                <Progress
                  strokeWidth={12}
                  size={60}
                  strokeColor={ApartmentStore.getIntencityColor(item.intensity)}
                  type="circle"
                  percent={(Number(item.intensity) / 10) * 100}
                  format={(percent) => `${Number(percent).toFixed(2)}`}
                />
              </Flex>
            </Card>
          ))}
        </Flex>
      </Flex>
      <Flex style={{height: '100%'}}>
        <HUApartmentScene/>
      </Flex>
    </Flex>
  );
});

export default ApartmentDetailsPage;
