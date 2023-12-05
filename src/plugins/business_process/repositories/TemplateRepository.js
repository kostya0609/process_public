import {BaseRepository} from "./BaseRepository";

export class TemplateRepository extends BaseRepository {
    _url = process.env.NODE_ENV == 'production' ? `${window.location.origin}/api/processes/factory` : 'http://192.168.25.227/processes/factory';

    constructor() {
        super('processes');
    }


    /**
     * @param {Object} payload
     * @return Promise<any>
     */
    async get(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint : 'get'
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }


}
