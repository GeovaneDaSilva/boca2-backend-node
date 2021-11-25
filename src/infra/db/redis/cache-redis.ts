export interface IRedis {
    get: (key: any) => Promise<void>
    set: (key: any, value: any, timeExp: any) => Promise<void>
    del: (key: any) => Promise<void>
    delPrefix: (prefix: any) => Promise<void>
}