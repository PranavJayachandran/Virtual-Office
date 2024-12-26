export interface User{
    userId?: string;
    userName: string;
    password: string;
}
export interface Room{
    roomId: string;
    ownerId: string;
    userIds: RoomMember[]
}
export interface RoomMember{
    userId: string;
    x: number;
    y: number;
    direction: string
}