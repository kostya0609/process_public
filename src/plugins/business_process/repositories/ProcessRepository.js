import {BaseRepository} from "./BaseRepository";

export class ProcessRepository extends BaseRepository {
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
            nestedEndpoint: 'get',
        });

        if (!result.success)
            throw new Error(result.message);

        return result.data;
    }

    /**
     * @param {Object} payload
     * @return Promise<any>
     */
    async get_active_stages(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint : 'get-active-stages'
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }


    /**
     * @param {Object} payload
     * @return Promise<any>
     */
    async run(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'run',
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }

    /**
     * @param {Object} payload
     * @return Promise<any>
     */
    async cancellation(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'cancellation',
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }


}
