import Loadable from 'react-loadable';
import Loading from '../../view/common/Loading.jsx';
import {lowerCamel} from './redux.js'

export default {{
    redux: {{
        {lowerCamel}
    }},
    routes: [
        {{
            path: '/user/{url}/upload',
            component: Loadable({{
                loading: Loading,
                loader: () => import('./importPage.jsx')
            }})
        }},
        {{
            path: '/user/{url}',
            component: Loadable({{
                loading: Loading,
                loader: () => import('./page.jsx')
            }})
        }}
    ],
}};