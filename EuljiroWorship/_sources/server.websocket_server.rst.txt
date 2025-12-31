server.websocket_server
=======================

WebSocket Server
----------------

This module implements an aiohttp-based WebSocket server for real-time
broadcasting of slide data to overlay clients.

It is designed to be robust in live worship environments and includes:

- Heartbeat handling (ping / pong)
- Broadcast fan-out to multiple clients
- Automatic cleanup of disconnected or faulty ("zombie") clients
- Graceful shutdown with proper socket closure

The server listens on ``/ws`` and expects incoming messages to be JSON
representations of slide data, which are then forwarded to all connected
clients.

Module Reference
----------------

.. automodule:: server.websocket_server
   :members:
   :undoc-members:
   :show-inheritance:
   :special-members: __main__