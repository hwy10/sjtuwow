# This is title!!!!!

## Simple Doc

### App How to auth

* Open a broswer to the address: 'https://sjtuwow.azurewebsites.net/auth/login',
* Let user complete the auth in the auth page.
* Get the token (cookie) and user's battletag, which are needed in the api call, from the last url.
  Like 'https://sjtuwow.azurewebsites.net/?battletag=Cula%235512&Cookie=sjtuwow%3Ds%253AABiJTa-efepoG4jFiffDKS-ifm9H9Zn2.ZBXNiW%252FeyfuwfkcnszRX%252BrXtvFSyH5B0QZu7bz%252BlMt8'

### How to use apis

```python

# coding=utf-8

# Get battletag (used as user_uuid) from the url.
# Get cookie in the response header['cookie']

import requests

cookie = 'sjtuwow=s%3A7uIt5RB1AmN_P0F2-1nxvCSKcE2nkVoc.pr3lOW3K0pcQ7O' +\
             'nkCxFLhM%2F3XiOjfXTajVe%2BP7nG2%2Bw'

print requests.get(
            'https://sjtuwow.azurewebsites.net/api/v1/events/1',
            headers={
                    'Cookie': cookie
                        
            },
                verify=False

        ).json()
```

## TODO List

* BN Client in JS is needed!
* Restful APIs doc is needed.
* Grunt needed?
* ...

