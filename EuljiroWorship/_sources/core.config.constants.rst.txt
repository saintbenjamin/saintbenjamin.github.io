core.config.constants
=====================

.. automodule:: core.config.constants
   :members:
   :private-members:
   :undoc-members:
   :show-inheritance:

.. py:currentmodule:: core.config.constants

Global constants
----------------

.. py:data:: MAX_CHARS

   Maximum character width used when wrapping or grouping text in
   emergency caption and verse interruptor workflows.

   This constant is primarily used by the verse interruptor module to:

   - Wrap long Bible verse lines into multiple slides
   - Group free-form emergency message lines into readable chunks

   The value represents an approximate visual character budget and may
   be adjusted in the future or overridden by user-configurable settings.