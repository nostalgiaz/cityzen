from cityzen import settings
import pusher
import json

pusher.app_id = settings.pusher_app_id
pusher.key = settings.pusher_key
pusher.secret = settings.pusher_secret

p = pusher.Pusher()

def send_push_notification(data):

    import pdb;pdb.set_trace()
    p['cityzen'].trigger('message', json.loads(data))

