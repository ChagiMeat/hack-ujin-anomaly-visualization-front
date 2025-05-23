import {Card, Flex, Progress, Typography} from 'antd';
import {observer} from 'mobx-react';
import {PieChartOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import AppartmentStore from "../../../store/appartmentStore.ts";
import ApartmentStore from "../../../store/appartmentStore.ts";

export interface ApartmentI {
  apartmentId: number;
  eg: string;
}

const APARTMENTS_LIST: ApartmentI[] = [
  {
    apartmentId: 2118,
    eg: '490ae3a8-1a8f-426f-b21b-04fe8e8483de',
  },
  {
    apartmentId: 2119,
    eg: '6f843503-5dc6-4222-a111-aaab4b97e39d',
  },
  {
    apartmentId: 2120,
    eg: '06ed9754-0be8-4d04-be8e-69689a888ca8',
  },
  {
    apartmentId: 2121,
    eg: 'c54855b4-ee02-46fc-8b4e-8a90804ef2b5',
  },
  {
    apartmentId: 2122,
    eg: '2fc4f90a-346d-4d1c-aebc-6ff45a9c3136',
  }
];

const MainPage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    void AppartmentStore.fetchStatusesMap(APARTMENTS_LIST);
  }, []);

  return (
    <Flex vertical gap={12} justify='center' align='start' flex='1'>
      <Typography.Title level={2}>Список апартаментов</Typography.Title>
      {APARTMENTS_LIST.map(apartment => {
        const status = AppartmentStore.statusesMap.get(apartment.apartmentId)
        const intensity = status ?? 0
        return (

          <Card style={{width: '100%'}} key={apartment.eg}>
            <Flex justify='space-between'>
              <Flex vertical>
                <Typography.Text strong>Квартира №{apartment.apartmentId}</Typography.Text>
                <Typography.Text type='secondary'>{apartment.eg}</Typography.Text>
              </Flex>

              <Flex gap={50}>
                {status &&
                    <Flex justify='center' align='center' gap={12}>
                        <Progress
                            strokeWidth={10}
                            size={40}
                            strokeColor={ApartmentStore.getIntencityColor(intensity)}
                            type="circle"
                            percent={(intensity / 10) * 100}
                            format={(percent) => `${Number(percent).toFixed(1)}`}
                        />
                        <Typography.Text type='secondary'>Максимальное<br/> показание</Typography.Text>
                    </Flex>
                }

                <PieChartOutlined style={{cursor: 'pointer', fontSize: 24}}
                                  onClick={() => navigate(`/account/apartment-details?apartmentId=${apartment.apartmentId}&eg=${apartment.eg}`)}/>
              </Flex>
            </Flex>
          </Card>
        )
      })}
    </Flex>
  );
})

export default MainPage;