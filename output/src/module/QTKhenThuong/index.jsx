import Loadable from 'react-loadable';
import Loading from '../../view/common/Loading.jsx';
import qtKhenThuong from './redux.js'

export default {
    redux: {
        qtKhenThuong
    },
    routes: [
        {
            path: '/user/qua-trinh/khen-thuong/upload',
            component: Loadable({
                loading: Loading,
                loader: () => import('./importPage.jsx')
            })
        },
        {
            path: '/user/qua-trinh/khen-thuong',
            component: Loadable({
                loading: Loading,
                loader: () => import('./page.jsx')
            })
        }
    ],
};