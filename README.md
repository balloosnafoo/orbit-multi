# Multiplayer Orbit Game

## Description

This is a multiplayer version of my orbit game, and is built using a node/express
backend and socket.io to sync up clients. Currently does not work on Safari, but
works on Chrome and Firefox.

## Development Goals

- [X] Allows multiple players to create objects within the same space.
- [X] Maintains synchronicity over time by periodically synchronizing from server
      side information.
- [ ] Has a competitive goal :P

## State of the Game

Though the game runs mostly on the client side (in an admittedly non-hack-proof
manner), synchronicity across browsers is maintained by periodically using data
about the game state to update the positions of active moons. There may still
be some issues related to making sure that collisions are reflected across all
clients, this needs to be tested.

I haven't quite figured out the game design, but my intention is to have each
successful revolution of a moon that you've generated earn you x number of points.
Successive moon creation will result in moons whose size reflect your current
points, as well as consuming some of them. Moons that collide with significantly
smaller moons will not be affected by them.
