# sssf-socket

## Getting Started
to start run `npm start` to start the project. And open [this link](http://localhost:3000) to start chatting

## Difference between namespaces and room
Namespaces allows assigning different paths or endpoints to the client. It introduce a seperation of layers in the  application. The default namespace is name '/' or root namespace.    

Room however is an channel that client can join and leave. It is a server-only concept which mean the users have no idea which room is available. Clients in each room will be able to send and recieve information only in that room
