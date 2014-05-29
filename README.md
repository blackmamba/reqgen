reqgen
======


Description
--------------



This node js based application can be used to test a sitespeed enabled application in QA environment. Developers usually would like to test an application in QA environment before releasing an application, to the production. This application enables testing a page by reloading it n number of times. Just provide the url that requres to be tested, and also the number of time the page should be reloaded. This application combined with Sitespeed in QA (https://wiki.vip.corp.ebay.com/display/RAPTOR/Sitespeed+in+QA+environment), enabled not just generating sitespeed numbers, but also allows developers to visualize the results through the sitespeed dashboard for qa.
This application will be hosted on the Raptor portal soon, but in the meanwhile it is very easy to run it locally.



Setup for running the application locally:
--------------


    - 1) git clone https://github.scm.corp.ebay.com/hubharani/reqgen.git
      2) npm install
      3) cd reqgen
      4) node app.js
      5) open http://localhost:3000 in your browser
      6) enter the url you want to test
      7) enter the number of time you want to reload this page
      8) hit submit!


