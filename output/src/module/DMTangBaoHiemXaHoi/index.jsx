import Loadable from 'react-loadable';
import Loading from '../../view/common/Loading.jsx';
import dmTangBaoHiemXaHoi from './redux.js'

export default {
    redux: {
        dmTangBaoHiemXaHoi
    },
    routes: [
        {
            path: '/user/danh-muc/tang-bao-hiem-xa-hoi/upload',
            component: Loadable({
                loading: Loading,
                loader: () => import('./importPage.jsx')
            })
        },
        {
            path: '/user/danh-muc/tang-bao-hiem-xa-hoi',
            component: Loadable({
                loading: Loading,
                loader: () => import('./page.jsx')
            })
        }
    ],
};