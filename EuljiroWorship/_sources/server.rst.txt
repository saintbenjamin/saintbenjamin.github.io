server
======

Server Components
-----------------

This package contains server-side components for EuljiroWorship,
responsible for real-time communication with overlay clients.

Currently, it provides an aiohttp-based WebSocket server that broadcasts
slide data to all connected clients during worship services.

Submodules
----------

.. toctree::
   :maxdepth: 1

   server.websocket_server