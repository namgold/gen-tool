import Loadable from 'react-loadable';
import Loading from '../../view/common/Loading.jsx';
import dmKhuVuc from './redux.js'

export default {
    redux: {
        dmKhuVuc
    },
    routes: [
        {
            path: '/user/danh-muc/khu-vuc/upload',
            component: Loadable({
                loading: Loading,
                loader: () => import('./importPage.jsx')
            })
        },
        {
            path: '/user/danh-muc/khu-vuc',
            component: Loadable({
                loading: Loading,
                loader: () => import('./page.jsx')
            })
        }
    ],
};