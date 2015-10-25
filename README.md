# This is title!!!!!

## How to auth apis
``
    # coding=utf-8

    import requests

    # Get battletag (used as user_uuid) from the url.
    # Get cookie in the response header['cookie']

    cookie = 'sjtuwow=s%3A7uIt5RB1AmN_P0F2-1nxvCSKcE2nkVoc.pr3lOW3K0pcQ7O' +\
                 'nkCxFLhM%2F3XiOjfXTajVe%2BP7nG2%2Bw'

    print requests.get(
                'https://sjtuwow.azurewebsites.net/api/v1/events/1',
                headers={
                        'Cookie': cookie
                            
                },
                    verify=False

            ).json()
``



## TODO List

- Split web pages (views) into an independent project. The backend should only care about restful apis. For eample, the 40X & 50X response will be restful instead of a page.
- JS & CSS in public should be organized by some frameworks, like bowser, AngularJS, Less or others.
- BN Client in JS is needed!
- User system should by designed.
- Restful APIs doc is needed.
- Grunt needed?
- ...

