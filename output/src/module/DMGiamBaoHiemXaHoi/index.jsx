import Loadable from 'react-loadable';
import Loading from '../../view/common/Loading.jsx';
import dmGiamBaoHiemXaHoi from './redux.js'

export default {
    redux: {
        dmGiamBaoHiemXaHoi
    },
    routes: [
        {
            path: '/user/danh-muc/giam-bao-hiem-xa-hoi/upload',
            component: Loadable({
                loading: Loading,
                loader: () => import('./importPage.jsx')
            })
        },
        {
            path: '/user/danh-muc/giam-bao-hiem-xa-hoi',
            component: Loadable({
                loading: Loading,
                loader: () => import('./page.jsx')
            })
        }
    ],
};