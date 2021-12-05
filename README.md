

# GroupChat
	

## Application description: 

GroupChat is a group chat system that allows users from anywhere to communciate about whatever their hearts desire. What makes this chat different from other chats is that this chat does not require a username nor a password to login. Users are first logged in with a guest account that is already generated for them. IF they want to make their own username, they can. By simply just filling out an input form located on top of the group chat. This is quite a useful feature because other messaging apps like facebook messenger, whatsApp, and instagram all require a login to use and that creates a lot of friction because users would have to create an account then go to their emails to confirm their account information and then login. In my opinion, that seems quite ludicrious and time consuming, but with this application the user is not required to make an account and they start using it right away. So, there is ease, no friction, and its convenient for anyone to use. The application also has other features such as assigning a group chat name for their chat. When the user first enters the chat theree is a default chat name for the chat. But Users can change the name of the the chat like how they can change their usernames. 
But will current users will be able to see changes implemented made by other users. The answer is yes, changes made by users that are in the site will be displayed by other users in real time. So there is no waiting for updates or having to refresh the page. Thats what make this chat quite unique in that way. But what if there are too many messages posted by other users,there is a solution for that too. Each user that is on the site, is able to clear the chat history so users wouldn't have to worry about chats being too long or full of nonsense. 

This product is still in its beta form and their will be additional features added in the future. 

## Features
- Users are able to send messages to one another
- Messages will be updated live on the chat rooms
- No login required, a username will be provided for first time users
- Users are allowed to customize their own usernames
- Users are provided with a default chat name but can customize them if they wish to.
- Users are able to clear chats

	
## Application
![image](https://user-images.githubusercontent.com/53666501/144756153-2e36e177-cd56-40fe-9158-464f676d2678.png)

## Technologies:

Project is created with

  - React.js [Frontend framework],
  - Javascript  [Frontend language],
  - Ruby  [Backend language],
  - Ruby on rails  [Backend framework]
  
  
  
  
## General approach


My general approach to programming this groupchat was first testing whether messages would  even display on the page. I did this by first creating a message model/table in the database and setting a message attribute. After completed those steps, I went to my database seed file and wrote a message-array object with some random message values. I then configured my routes for a get request directed to a method in the message controller that just fetches all the messages in the database. Then in the frontend I created a standard site with a navbar and a div where all the seeded messages would be stored. I then fetched the messages via a get ajax request and stored the response value in a react state object that I created. I called the react state object messages and used the map method to extract the objects data and load it onto my webpage and found it indeed worked. This completed my step one of the program and then I started working on step two of my process which is creating new message records in the database and load them onto the database. I started by first adding a new method in the messages controller called create and declared an instance variable. I set the value of that variable to create a new record in the after the post request returns a params containing teh new message value. I then added a conditional stating if the message saves render the create jbuilder json response other wise render the message errors. 

I then configured the routes to direct to this controller and made a function making an ajax request to this route.
I then created a standard form with a onsubmit calling this function and input getting the new message value. For the response of the ajax, I console log the reponse to check whether the function would return a reponse. Once I fired this function in the frontend, I recieved a response getting the appropriate json response. I then set this json response to another state variable that I created and rendered it in the view by calling the fetchMessages function that I called earlier. This recieves all the newly created messages in the backend but also the messages in general. I then started working on the last part of my project which was creating a default username and a default group chat name that can be customizable. 

I first created the models for group and added two new columns called username and groupName. I then went to my seed data and added a new group object and added the new columns to the already created message object. I then migrated all the changes and checked in db:browser to see if all the changes were migrated. I also made sure to check that there was only one record of groupchat because for this project I just only wanted there to be one group chat that everyone can use. Multiple groupchats would be a feature that will be implemented later and it would be built off of the groupChat model. I then repeated the first steps of my approach for the newly created group model and tested if it works. I then console logged response for the group object and the message username object to check if it works and I then rendered it on the dom via react jsx methods. But the problem was the application was not remembering states and everytime I reloaded the page the username and the group chat name would dissappear. I also check on other users computer by uploading the project to heroku to see if it did the same thing and it did. So, I did some searching around and found a package called universal cookie that allowes to set and get cookies for values in the application. For both state values that contained the user object and grouop object value, I set a cookie on each of them and set a conditional in teh react constructor that if either of the values come back undefined, put a default value otherwise get the cookie value. It then worked, the application was able to save the state of the newly created groupchat name and username. But there was still another problem where messages made by other users were not rendering on other user's computers. 

I was stuck on what to do because in order to provide actual live updates, one would need to use a websocket and that seemed way too complicated to figure out. So, instead of doing that I set a interval function for both the fetch messages and fetch group funcitons to fire every three seconds to see if there are any updates to the backend. And that worked, I tested teh application on two seperate computers and I was able to send a message from one computer and it would show up on the other. The last part of my process was to create a clear message button that clears all the messages made in the database. I made a standard delete request and a method in the messages controller and made a route directing to the delete method. After that was done I made another function in the frontend called deleteAllMessages and assigned that function to button. The button makes a call to the backed, if there any messages in the database, clear all of them. This pretty much concludes the functionality of my application. I then did some changes with the css and commited all my changes to Github.
  
  
  
	
## Installation instructions:

In your terminal 
```bash
git clone 'https://github.com/thoque579/capstone.git'
```

Install Yarn
```bash
npm install --global yarn
```

Install Bundle
```bash
bundle install
```

Install Universal Cookie
```bash
npm install universal-cookie
```

## User stories







## Wireframes

![image](https://user-images.githubusercontent.com/53666501/144756380-88cd13b3-f630-4a2b-a2f9-072c25369d4b.png)


## Unsolved problems/hurdles

## Problem #1:

When I was first starting this project, I was having a hard time figuring out on how to implement a guest account feature and a login feature because I didn't understand how to make a login system without implementing tokens and cookies. So, I was stuck till I decided to throw that idea all together because it seemed to coomplicated. Instead I decided to make a maessage table with a username column added to it. I then seeded the data with some initial values for the username as the guest account and used that username column to reference the messages instead of making a whole user model with validations and adding a conditional to figure out whether the new user is a guest account or an actual user. The initial feature is something that I'll implement in the future but for now this is what I am working.

## Problem #2:
There is still an unsolved issue regarding getting live message updates with this application. I used a set interval function to fire another function just fetches any new messages from the database. In my opinion, this seems like a really strange way to recieve live message updates, but figuring out how to use and implement websockets seemed too complicated to use. So, I used this approach instead of the websocket approach. Once I do figure out how websocket works I am hoping for the future I am able to use that instead of a set interval function because its cleaner and less buggy than using a set interval function.

## Problem #3:

While I was close to finishing this project, I encountered another problem where the username was not saving after I reloaded the page and that made sense because I didn't implement a real signup/login with assigning a token system. So, I was stuck and did some digging in teh interenet on what can I do. I installed a package known as universal cookie which allowed me to set and get cookies from the users computer and save their information onto the website. This was a big fix for me because it allowed me to save the users infomration such as their username without having to making more model associations and changes to my database.

