core.config.style_map
=====================

.. automodule:: core.config.style_map
   :members:
   :private-members:
   :undoc-members:
   :show-inheritance:

.. py:currentmodule:: core.config.style_map

Style mappings
--------------

.. py:data:: STYLE_ALIASES

   Mapping from internal style keys (used in JSON/export) to Korean display
   names shown in the generator UI.

   This is the primary source of truth for style naming across the system.

.. py:data:: REVERSE_ALIASES

   Reverse lookup mapping from Korean display names back to internal style keys.

   This is derived from :py:data:`STYLE_ALIASES`.

.. py:data:: STYLE_LIST

   Ordered list of Korean display names used to populate UI dropdown menus.

   This is derived from :py:data:`STYLE_ALIASES` and preserves the insertion
   order of that dictionary.