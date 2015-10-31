# This is title!!!!!

## Simple Doc

### App How to auth

    - Open a broswer to the address: 'https://sjtuwow.azurewebsites.net/auth/login',
    - Let user complete the auth in the auth page.
    - Get the token (cookie) and user's battletag, which are needed in the api call, from the last url.

### How to use apis

    ```
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

    - BN Client in JS is needed!
    - Restful APIs doc is needed.
    - Grunt needed?
    - ...

