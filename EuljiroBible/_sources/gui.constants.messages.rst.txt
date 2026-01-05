gui.constants.messages
======================

.. automodule:: gui.constants.messages
   :members:
   :private-members:
   :undoc-members:
   :show-inheritance:

.. py:currentmodule:: gui.constants.messages

Error message constants
-----------------------

.. py:data:: ERROR_MESSAGES

   Centralized dictionary of user-facing error and warning messages used
   throughout the EuljiroBible GUI.

   This mapping is intended to:
   
   - Ensure consistent wording and tone across all dialogs and message boxes
   - Avoid hard-coded strings scattered across GUI modules
   - Serve as a single point of modification for future localization (i18n)
   - Separate presentation text from application logic

   Each key represents a semantic error or warning condition, while the
   corresponding value is the message string shown to the user. Some messages
   support runtime formatting via ``str.format`` (e.g. ``{path}``).

   Typical usage::

       from gui.constants.messages import ERROR_MESSAGES
       msg = ERROR_MESSAGES["settings_load"]

   Defined messages include (non-exhaustive):

   - ``pyside6_missing``:
     Displayed when PySide6 is not installed and the GUI cannot be started.

   - ``wsl_display``:
     Shown when running under WSL without a configured X server or DISPLAY.

   - ``settings_load`` / ``settings_save``:
     Warnings related to loading or saving application settings.

   - ``critical_error``:
     Generic fatal error message directing the user to the error log file.

   - ``bible_data_missing``:
     Error raised when the Bible data directory does not exist.

   - ``bible_files_missing``:
     Error raised when no Bible JSON files are found in the expected directory.

   - ``POLL_INTERVAL_INVALID_TITLE`` /
     ``POLL_INTERVAL_INVALID_MSG``:
     Title and body strings used for polling interval input validation dialogs.