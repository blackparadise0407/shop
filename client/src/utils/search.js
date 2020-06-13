import axios from 'axios';

const resources = {};

const makeRequestCreator = () => {
    let cancel;

    return async query => {
        if (cancel) {
            cancel.cancel();
        }

        cancel = axios.CancelToken.source();
        try {
            if (resources[query]) {
                return resources[query]
            }
            const res = await axios(query, { cancelToken: cancel.token })
            const results = res.data.results;
            resources[query] = results;
            return results;
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log("Request was canceled");
            } else {
                console.log(err);
            }
        }
    }
};
export const search = makeRequestCreator();