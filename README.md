# nodejs-sw-h2push-demo

This demos h2push with Service Worker (SW). I created this demo to figure out what happens if the SW tries to fetch a resource that is already in browser cache (here pushed by the origin serer). 

The index.html has has three buttons.  One to fetch image that has been pushed, one to fetch image that has not been pushed (the GET should go to Origin) and one to fetch the image which is cached in SW.

You should open the developers tools to see the effect of h2push and SW. 

And USE YOUR OWN Key and Cert...

#TO-DOs

* In the current code once the demo is run all the resources are stored in the SW cache hence to repeat  the demo you need to uninstall the SW and  clear browsing data  

# Resources 

* For good details on SW -- 1) https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers, 2) http://www.html5rocks.com/en/tutorials/service-worker/introduction/

*  For nodejs HTTP2 server https://github.com/molnarg/node-http2


