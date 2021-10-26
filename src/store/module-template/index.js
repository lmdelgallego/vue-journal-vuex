
import state from './state';
import * as actions from './actions';
import * as getter from './getter';
import * as mutations from './mutations';

const myCustomModule = {
    namespace: true,
    actions,
    getter,
    mutations,
    state
}

export default myCustomModule;

