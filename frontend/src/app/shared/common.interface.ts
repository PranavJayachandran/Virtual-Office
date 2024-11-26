export interface User{
    userId?: string;
    userName: string;
    password: string;
}
export interface Room{
    id: string;
    ownerId: string;
    memberIds: RoomMember[]
}
export interface RoomMember{
    userId: string;
    x: string;
    y: string;
    direction: string
}