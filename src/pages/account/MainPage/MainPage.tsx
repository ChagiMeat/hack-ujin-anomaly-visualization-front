import {Card, Flex, Typography} from 'antd';
import {observer} from 'mobx-react';
import {PieChartOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

interface Apatment {
  apartmentId: number;
  eg: string;
}

const APARTMENTS_LIST: Apatment[] = [
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

function MainPage() {
  const navigate = useNavigate();

  return (
    <Flex vertical gap={12} justify='center' align='start' flex='1'>
      <Typography.Title level={2}>Список апартаментов</Typography.Title>
      {APARTMENTS_LIST.map(apartment => (
        <Card style={{width: '100%'}} key={apartment.eg}>
          <Flex justify='space-between'>
            <Flex vertical>
              <Typography.Text strong>Квартира №{apartment.apartmentId}</Typography.Text>
              <Typography.Text type='secondary'>{apartment.eg}</Typography.Text>
            </Flex>

            <PieChartOutlined style={{cursor: 'pointer', fontSize: 24}} onClick={() => navigate(`/account/apartment-details?apartmentId=${apartment.apartmentId}&eg=${apartment.eg}`)}/>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}

export default observer(MainPage);
