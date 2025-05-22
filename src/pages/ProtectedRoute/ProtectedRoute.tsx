import { PropsWithChildren, useEffect, useState } from 'react';

import UserStore from '../../store/userStore.ts';
import { Navigate } from 'react-router';
import TBLoadingBar from '../../components/TBLoadingBar/TBLoadingBar.tsx';
import { observer } from 'mobx-react';

const ProtectedRoute = observer(function ({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    UserStore.checkAuth().then(() => setLoading(false));
  }, []);

  const isAuth = UserStore.isAuth;

  if (loading) {
    return <TBLoadingBar />;
  }

  if (!isAuth) {
    return <Navigate to={'/login'} />;
  }

  return <>{children}</>;
});

export default ProtectedRoute;
