import {Card, Collapse, Empty, Flex, Progress, Typography} from 'antd';
import HUApartmentScene from "../../../components/HUApartmentScene/HUApartmentScene.tsx";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ApartmentStore from "../../../store/appartmentStore.ts";
import {observer} from "mobx-react";
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";

const ApartmentDetailsPage = observer(() => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const apartmentId = searchParams.get('apartmentId');
  const eg = searchParams.get('eg');

  function onDeviceClick(index: number) {
    if (selectedCardIndex === index) {
      setSelectedCardIndex(null);
    } else {
      setSelectedCardIndex(index);
    }
  }

  useEffect(() => {
    if (apartmentId && eg) {
      void ApartmentStore.fetchApartmentDevices({apartmentId, eg});
    }
  }, []);

  if(ApartmentStore.isLoading) {
    return null;
  }

  if(!ApartmentStore.isLoading && ApartmentStore.allSerialNumbers.length === 0) {
    return (
      <Flex align='center' justify='center' flex={1}>
        <Empty />
      </Flex>
    )
  }

  return (
    <Flex flex='1' justify='center' align='center'>
      <Flex gap={12} style={{width: '100%', height: '100%'}} vertical align='flex-start'>
        <Typography.Title level={2}>Список устройств</Typography.Title>
        <Flex vertical gap={12} style={{width: '80%', overflowY: 'auto'}}>
          {ApartmentStore.allSerialNumbers?.map((serialNumber, index) => {
            console.log({...ApartmentStore.allDevices});
            console.log('serialNumber', serialNumber)
            return (
              (
                <Flex key={serialNumber} align='flex-start' flex={1} style={{width: '100%'}} gap={12}>
                  <Collapse activeKey={selectedCardIndex ?? undefined}
                            style={{width: '100%', backgroundColor: selectedCardIndex === index ? '#d8ffeb' : undefined}}>
                    <Collapse.Panel
                      collapsible='disabled'
                      showArrow={false}
                      key={index}
                      header={
                        <Flex justify='space-between'>
                          <Typography.Text strong>Устройство {index + 1}</Typography.Text>
                          <Typography.Text type='secondary'>№{serialNumber}</Typography.Text>
                        </Flex>
                      }
                    >
                      <Flex vertical gap={12}>
                        {ApartmentStore.allDevices?.[serialNumber]?.map((item, index) => (
                          <Card key={item.name + index} style={{width: '100%',}}>
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
                    </Collapse.Panel>
                  </Collapse>
                  {selectedCardIndex === index
                    ? <CloseOutlined onClick={() => onDeviceClick(index)}
                                     style={{cursor: 'pointer', fontSize: 24, marginTop: 12}}/>
                    : <SearchOutlined onClick={() => onDeviceClick(index)}
                                      style={{cursor: 'pointer', fontSize: 24, marginTop: 12}}/>
                  }

                </Flex>
              )
            )
          })}
        </Flex>
      </Flex>
      <Flex style={{height: '100%'}}>
        <HUApartmentScene
          selectedDeviceIndex={selectedCardIndex}
          devicesCount={ApartmentStore.allSerialNumbers.length}
        />
      </Flex>
    </Flex>
  );
});

export default ApartmentDetailsPage;
