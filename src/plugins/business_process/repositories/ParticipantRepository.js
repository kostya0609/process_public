import {BaseRepository} from "./BaseRepository";

export class ParticipantRepository extends BaseRepository {
    constructor() {
        super('processes/participants');
    }

    /**
     * @param {Object} payload
     * @return Promise<any>
     */
    async attach(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'attach',
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }

    /**
     * @param {Object} payload
     * @return Promise<any>
     */
    async detach(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'detach',
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }

    /**
     * @param {Object} payload
     * @return Promise<any>
     */
    async decide(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'decide',
        });

        if (!result.success)
            throw new Error(result.message);

        return result.data;
    }

    async uploadDecideFiles(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'upload-decide-files',
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }

    /**
     * @param {Object} payload
     * @return Promise<any>
     */
    async getActiveParticipant(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'get-active-participant',
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }

}
