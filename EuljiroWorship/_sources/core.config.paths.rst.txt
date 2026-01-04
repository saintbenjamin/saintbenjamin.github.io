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

   Absolute path to the project root directory.

.. py:data:: STORE_DIR

   Directory for slide output and backup files (under ``BASE_DIR/store``).

.. py:data:: SETTING_DIR

   Directory for JSON configs and settings (under ``BASE_DIR/json``).

.. py:data:: ICON_DIR

   Directory for SVG icon assets (under ``BASE_DIR/assets/svg``).

Emergency overlay path
----------------------

.. py:data:: VERSE_FILE

   Emergency verse output file path (typically ``BASE_DIR/verse_output.txt``).  
   Written by the emergency caption flow and monitored by helper processes.

Settings files
--------------

.. py:data:: SETTING_FILE

   Main application settings JSON file (typically ``json/settings.json``).

.. py:data:: SETTING_LAST_OPEN_FILE

   JSON file storing the last opened path/session info
   (typically ``json/settings_last_path.json``).

Slide output and backup
-----------------------

.. py:data:: SLIDE_FILE

   Main slide output JSON file written for overlay display
   (typically ``store/slide_output.json``).

.. py:data:: SLIDE_BACKUP_FILE

   Backup of the previous slide output used for restoration after emergency mode
   (typically ``store/slide_output_backup.json``).

Bible data directories
----------------------

.. py:data:: BIBLE_DATA_DIR

   Directory containing Bible version JSON data files (typically ``data/``).

.. py:data:: JSON_DIR

   Directory containing JSON configs
   (same physical location as ``SETTING_DIR``).

.. py:data:: BIBLE_NAME_DIR

   Directory containing Bible name/version alias JSON files
   (typically ``json/bible/``).

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