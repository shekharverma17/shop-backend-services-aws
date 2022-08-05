export interface DBServicesInterface {
    connect: () => void,
    query: () => Promise<any>
}