# Url Shortner

## Installation

  ### Prerequisite
  * you should have `node`, `react` and `mongodb` installed in your system
### Installation steps
* Clone project from git using `git clone git@github.com:shivkumar5/url-shortner.git`

## Running the projects

* Move to server directory to start server
* type `npm start` after navigating to server dir
* Type `yarn start` in parent directory to start client

## Work Flow
* on homepage we can enter url and get the shorl url for the same.
* Click on "Configure expiry date and time" to configure expiry date & time and then enter date and time.
* Click on "Make short url password protected" to make short url password protected. After that enter username and password for the url.
* Click on "All urls" to get all the urls
* Click on "Shorten New Url" in all urls page to short new urls


* We can find logs for all the request inside `/server/log` dir
* After opening short url which is password protected it will ask username and password, if we have entered the username and password one time it won't ask next time in same window.