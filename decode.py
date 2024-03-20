import base64
import os
from os.path import join

files = os.listdir('data')

with open(join('data/', files[0]), 'rb') as f:
    encoded = f.read()
    decoded = base64.b64decode(encoded)

try:
    os.mkdir('data_videos')
except:
    print('data_videos already exists')

with open(join('data_videos', files[0] + '.mp4'), 'wb') as f:
    f.write(decoded)
