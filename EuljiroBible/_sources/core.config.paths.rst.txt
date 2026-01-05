core.config.paths
=================

.. automodule:: core.config.paths
   :members:
   :private-members:
   :undoc-members:
   :show-inheritance:

.. py:currentmodule:: core.config.paths

Path constants
--------------

.. py:data:: BASE_DIR

   Absolute path to the project root directory (or the executable directory when frozen).

.. py:data:: RESOURCE_DIR

   Base directory for bundled resources.
   When frozen (PyInstaller), this points to the extracted resource directory (``sys._MEIPASS``);
   otherwise it is the same as ``BASE_DIR``.

.. py:data:: ICON_DIR

   Icon resource directory.
   On Windows, uses ``.../gui/resources/icons`` (``.ico``); on other systems, uses
   ``.../gui/resources/svg`` (``.svg``).

Project data and JSON directories
--------------------------------

.. py:data:: BIBLE_DATA_DIR

   Directory containing Bible version JSON data files (typically ``data/``).

.. py:data:: JSON_DIR

   Directory containing JSON configs and settings (typically ``json/``).

.. py:data:: BIBLE_NAME_DIR

   Directory containing Bible name/version alias JSON files (typically ``json/bible/``).

.. py:data:: TRANSLATION_DIR

   Directory containing translation JSON files (typically ``json/translations/``).

Icon file
---------

.. py:data:: ICON_FILE

   Application icon file path.
   On Windows this is typically ``thepck.ico``; on other systems ``thepck.svg``.

Logs and settings
-----------------

.. py:data:: SETTINGS_FILE

   Main application settings JSON file (typically ``json/settings.json``).

.. py:data:: LOG_FILE

   Runtime error log file path (typically ``BASE_DIR/error_log.txt``).

.. py:data:: MEMORY_LOG_FILE

   Memory diagnostics log file path (typically ``BASE_DIR/memory_log.txt``).

Bible alias/config files
------------------------

.. py:data:: ALIASES_VERSION_FILE

   GUI Bible version alias mapping JSON file.

.. py:data:: ALIASES_VERSION_CLI_FILE

   CLI Bible version alias mapping JSON file
   (simplified aliases for CLI parsing).

.. py:data:: ALIASES_BOOK_FILE

   Book name alias mapping JSON file.

.. py:data:: STANDARD_BOOK_FILE

   Canonical book list JSON file used as the standard reference.

.. py:data:: SORT_ORDER_FILE

   Custom book sort order JSON file.