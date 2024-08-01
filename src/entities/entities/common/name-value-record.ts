import { Expose } from "class-transformer";

export class NameValueRecord {
    @Expose({name: 'name'})
    public Name?: string;

    @Expose({name: 'value'})
    public Value?: string;
}