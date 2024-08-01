export interface IBodyHandler {
    /**
     * process the inner procedure for the body property of an entity
     * @param body string that contains the body structure 
     */
    processAsync(body?: string): Promise<void>;
}