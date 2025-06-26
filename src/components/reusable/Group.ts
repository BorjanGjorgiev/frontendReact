import { List } from "antd";
import { User } from "./User";

export interface Group
{
    id:number,
    groupName:string,
    createdAt:string,
    users:User[]
}