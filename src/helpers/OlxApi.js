import Cookies from "js-cookie";
import qs from 'qs'


const BASEAPI = 'http://alunos.b7web.com.br:501'

const apiFetchPost = async(endpoint, body) => {
    if(!body.token) {
        const token = Cookies.get('token');
        if(token) {
            body.token = token
        }
    }

    const result = await fetch(`${BASEAPI}${endpoint}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const json = await result.json();

    if(json.notallowed) {
        window.location.href = '/signin'
        return;
    }

    return json;
}
const apiFetchGet = async(endpoint, body = []) => {
    if(!body.token) {
        const token = Cookies.get('token');
        if(token) {
            body.token = token
        }
    }

    const result = await fetch(`${BASEAPI}${endpoint}?${qs.stringify(body)}`);

    const json = await result.json();

    if(json.notallowed) {
        window.location.href = '/signin'
        return;
    }

    return json;
}
const apiFetchFile = async (endpoint, body) => {
    if(!body.token) {
        const token = Cookies.get('token');
        if(token) {
            body.append('token', token)
        }
    }

    const result = await fetch(`${BASEAPI}${endpoint}`, {
        method: 'POST',
        body
    });

    const json = await result.json();

    if(json.notallowed) {
        //window.location.href = '/signin'
        return;
    }

    return json;
}

const OlxAPI = {
    login: async(email, password) => {
        const json = await apiFetchPost(
            '/user/signin',
            {email, password}
        );

        return json
    },

    register: async (name, email, password, stateLoc) => {
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state:stateLoc}
        );
        return json;
    },

    getStates: async () => {
        const json = await apiFetchGet('/states');

        return json.states;
    },

    getCategories: async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    },

    getAds: async ( options ) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },

    getAd: async (id, otherAds = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            {id, other: otherAds}
        )
        return json;
    },

    addAd: async (data) => {
        const json = await apiFetchFile(
            '/ad/add',
            data
        );
        return json;
    }
}

export default () => OlxAPI