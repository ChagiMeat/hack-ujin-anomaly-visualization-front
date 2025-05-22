import cls from './TBLoadingBar.module.css';
import { LoadingOutlined } from '@ant-design/icons';

export default function TBLoadingBar() {
  return (
    <div className={cls.wrapper}>
      <LoadingOutlined className={cls.icon} size={32} />
    </div>
  );
}
