import { Group } from "./Group"

export interface User
{
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    isAvailable:boolean
    role:string,
    group?: Group | null
    createdAt:string
}