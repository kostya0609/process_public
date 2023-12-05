import {BaseRepository} from "./BaseRepository";

export class MeetingRepository extends BaseRepository {
    constructor() {
        super('meetings');
    }

    /**
     * @param {Object} payload
     * @return Promise<any>
     */
    async list(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint : 'list'
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }

    /**
     * @param {Object} payload
     * @return Promise<any>
     */
    async getNeedAction(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint : 'need-action'
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }

    async getCountNeedActions(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint : 'need-action-count'
        });

        if (!result.success)
            throw new Error(result.message);

        return result.data;
    }

    /**
     * @param {Object} payload
     * @return Promise<any>
     */
    async add(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint : 'add'
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }

    /**
     * @param {TGetProcess} payload
     * @return Promise<any>
     */
    async get(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint : 'get'
        });

        if (!result.success)
            throw new Error(result.message);

        return result.data;
    }

    /**
     * @param {TUpdateProcess} payload
     * @return Promise<any>
     */
    async edit(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint : 'edit'
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }

    /**
     * @param {TUpdateProcess} payload
     * @return Promise<any>
     */
    async delete(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint : 'delete'
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }

}

