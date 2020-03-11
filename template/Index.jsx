import Loadable from 'react-loadable';
import Loading from '../../view/common/Loading.jsx';
import {lowerCamel} from './Redux.jsx'

export default {{
    redux: {{
        {lowerCamel}
    }},
    routes: [
        {{
            path: '/user/{url}/upload',
            component: Loadable({{
                loading: Loading,
                loader: () => import('./ImportPage.jsx')
            }})
        }},
        {{
            path: '/user/{url}',
            component: Loadable({{
                loading: Loading,
                loader: () => import('./Page.jsx')
            }})
        }}
    ],
}};