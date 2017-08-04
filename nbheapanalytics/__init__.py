from notebook.services.config import ConfigManager
from traitlets.config import Configurable
from traitlets import Unicode

def _jupyter_server_extension_paths():
    return [{
        'module': 'nbheapanalytics',
    }]

def _jupyter_nbextension_paths():
    return [
        {
            # Load this on all the pages!
            "section": "common",
            "dest": "nbheapanalytics",
            "src": "static",
            "require": "nbheapanalytics/main"
        }
    ]

class HeapAnalytics(Configurable):
    tracking_id = Unicode(
        None,
        allow_none=True,
        help="""
        The Heap Analytics Trackin ID to use.

        Set to None to disable tracking.
        """,
        config=True
    )

    def setup_config(self):
        # This is apparently a singleton?
        cm = ConfigManager()
        cm.update(
            'common',
            {
                'HeapAnalytics': {
                    'tracking_id': self.tracking_id
                }
            }
        )
        return cm

def load_jupyter_server_extension(nbapp):
    ga = HeapAnalytics(parent=nbapp)
    return ga.setup_config()
