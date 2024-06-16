# Demo Video
https://github.com/Sujas-Aggarwal/realtime-app-tour/assets/122120461/0484a533-d8cc-4c20-839b-587a4ac45a88



# Installation
- ```https://github.com/Sujas-Aggarwal/realtime-app-tour.git``` Clone the repository or download the zip file 
- ```cd realtime-app-tour``` to get into the main folder
- Run Live server using Extension or directly open index.js in any browser
- ```cd server``` to get into the server folder
- ```npm install``` to install all the dependencies
- ```node index.js``` to start the server (Make sure your 3000 port is free)
  
# API ENDPOINTS
- To create a new flow/tour, POST on this endpoint -  ```http://localhost:3000/create-flow```
  with body of this format -
```{
    "name": "${flowName}",
    "steps": [
        {
            "element": "#{elementId}",
            "popover": {
                "title": "{title}",
                "description": "{description}"
            }
        },
        {
            "element": ".{elementClass}",
            "popover": {
                "title": "{title}",
                "description": "{description}"
            }
        },
    ]
}
```
Note: There can be as many number of steps as you want

- To trigger a flow, show tour on the site, POST on this endpoint - ```http://localhost:3000/trigger-popup```
  with body of this format  -
```
{
    "flow":"{flowName}"
}
```
  
Credits: The Amazon Frontend Template is from https://github.com/Swap-nil-2003/Amazon-Clone-01

