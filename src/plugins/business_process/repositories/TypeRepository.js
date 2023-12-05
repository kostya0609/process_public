import {BaseRepository} from "./BaseRepository";

export class TypeRepository extends BaseRepository {
    _url = process.env.NODE_ENV == 'production' ? `${window.location.origin}/api/processes/factory` : 'http://192.168.25.227/processes/factory';
    constructor() {
        super('types', 'v1');
    }

    /**
     * @return Promise<any>
     */
    async list() {
        const result = await this._query({
            nestedEndpoint : 'list'
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }
}