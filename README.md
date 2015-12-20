# Multiplayer Orbit Game

## Description

This is a multiplayer version of my orbit game, and is built using a node/express
backend and socket.io to sync up clients.

## Development Goals

- [X] Allows multiple players to create objects within the same space.
- [ ] Maintains synchronicity over time
- [ ] Has a competitive goal :P

## State of the Game

Currently, I haven't worked out the function that maintains synchronicity between
clients, so the longer a session goes, the more likely you are to incur slight
but growing discrepancies in the state of the game. Additionally, joining a session
after some bodies have already been created causes some immediate issues. If all
active sessions close the server will reset the game state, and opening all
participating clients before creating bodies will allow you to participate in
a consistent space (for a while).

I haven't quite figured out the game design, but my intention is to have each
successful revolution of a moon that you've generated earn you x number of points.
Successive moon creation will result in moons whose size reflect your current
points, as well as consuming some of them. Moons that collide with significantly
smaller moons will not be affected by them.
