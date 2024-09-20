import Channel from "../models/Channel";

export async function createChannel(name: string, members: any, id: string) {
  const NewChannel = await Channel.create({ name, members, admin: id });
  return NewChannel
}
