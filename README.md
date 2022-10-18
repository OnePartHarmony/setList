# setList Project Plan

## Project Links

<https://setlist.fly.dev/>

<https://github.com/OnePartHarmony/setList>

## Overview

A full-stack web app for music ensembles to manage repertoire and setlists

## Technologies Used
Javascript
-NodeJS
-Express
-LiquidJS
MonogoDB
-Mongoose
Html5
CSS

## Instructions
Install dependencies from package.json by running npm install.


### using app
1. Signup and login
2. Click New Group
3. Name your group and add other members by email address so they will be added to the group when they make an account later.
4. View group and work as group
5. Make songs and setlist, add songs to setlist
6. Reorder setlists by dragging
7. Add notes to lists and songs for other group members to read

### seed by running npm seed
This deletes all collections then creates one user with two groups and 16 songs:

User:
{username: "JohnLennon", emailAddress: "john@123.com", img: "https://i.imgur.com/khLCaib.jpg", password: await bcrypt.hash("123", await bcrypt.genSalt(10))}

Groups: 
{name: "Plastic Ono Band", members: ["john@123.com", "yoko@123.com"], img: "https://i.imgur.com/IWTzL3F.jpg", owner: user.id}

{name: "The Beatles", members: ["john@123.com", "paul@123.com", "george@123.com", "ringo@123.com"], img: "https://i.imgur.com/HIrepx1.jpg", owner: user.id}

First Group Songs:

{name: "Power to the People", description: "The song was written by Lennon in response to an interview he gave to Tariq Ali and Robin Blackburn, published in Red Mole (8-22 March 1971).", soloist: "John Lennon", key: "D", sharp: false, flat: false, minor: false, minutes: 3, seconds: 15, owner: group.id},

{name: "Working Class Hero", description: "Stridently political, the song is a commentary on the difference between social classes. According to Lennon, it is about working class people being processed into the middle classes, into the 'machine'.", soloist: "John Lennon", key: "G", sharp: false, flat: false, minor: false, minutes: 3, seconds: 48, owner: group.id},

{name: "Mother", description: "The lyrics of 'Mother' address both of Lennon's parents, each of whom abandoned him in his childhood. His father, Alf, left the family when John was an infant. His mother, Julia, did not live with her son, although they had a good relationship; she was hit and killed in a car accident on 15 July 1958 by an off-duty policeman named Eric Clague, when Lennon was 17. In one of his last concerts, Lennon stated that the song was not just about his parents, but was rather 'about 99% of the parents, alive or half dead'.", soloist: "John Lennon", key: "C", sharp: false, flat: false, minor: false, minutes: 5, seconds: 34, owner: group.id}

Second Group Songs:

{name: "All You Need is Love", soloist: "John Lennon", key: "G", sharp: false, flat: false, minor: false, minutes: 3, seconds: 57, owner: group.id},

{name: "Strawberry Fields Forever", description: "Lennon based the song on his childhood memories of playing in the garden of Strawberry Field, a Salvation Army children's home in Liverpool.", soloist: "John Lennon", key: "B", sharp: false, flat: true, minor: false, minutes: 4, seconds: 7, owner: group.id},

{name: "Hey Jude", description: "The writing and recording of 'Hey Jude' coincided with a period of upheaval in the Beatles. The ballad evolved from 'Hey Jules', a song McCartney wrote to comfort John Lennon's young son Julian, after Lennon had left his wife for the Japanese artist Yoko Ono. The lyrics espouse a positive outlook on a sad situation, while also encouraging 'Jude' to pursue his opportunities to find love. After the fourth verse, the song shifts to a coda featuring a 'Na-na-na na' refrain that lasts for over four minutes.", soloist: "Paul McCartney", key: "F", sharp: false, flat: false, minor: false, minutes: 7, seconds: 11, owner: group.id},

{name: "Blackbird", description: "When discussing the song, McCartney has said that the lyrics were inspired by hearing the call of a blackbird in Rishikesh, India, and alternatively by racial tension in the United States.", soloist: "Paul McCartney", key: "G", sharp: false, flat: false, minor: false, minutes: 2, seconds: 19, owner: group.id},

{name: "Let It Be", description: "At the time, it had the highest debut on the Billboard Hot 100, beginning its chart run at number 6 and eventually reaching the top. It was the Beatles' final single before McCartney announced his departure from the band.", soloist: "Paul McCartney", key: "C", sharp: false, flat: false, minor: false, minutes: 4, seconds: 3, owner: group.id},

{name: "Here Comes the Sun", description: "Harrison wrote the song in early 1969 at the country house of his friend Eric Clapton, where Harrison had chosen to play truant for the day to avoid attending a meeting at the Beatles' Apple Corps organisation. The lyrics reflect his relief at the arrival of spring and the temporary respite he was experiencing from the band's business affairs.", soloist: "George Harrison", key: "A", sharp: false, flat: false, minor: false, minutes: 3, seconds: 6, owner: group.id},

{name: "Eleanor Rigby", description: "With a double string quartet arrangement by George Martin and lyrics providing a narrative on loneliness, it broke sharply with popular music conventions, both musically and lyrically. The song topped singles charts in Australia, Belgium, Canada and New Zealand.", soloist: "Paul McCartney", key: "E", sharp: false, flat: false, minor: true, minutes: 2, seconds: 8, owner: group.id},

{name: "She Loves You", description: "The single set and surpassed several sales records in the United Kingdom charts, and set a record in the United States as one of the five Beatles songs that held the top five positions in the charts simultaneously, on 4 April 1964. It remains the band's best-selling single in the United Kingdom and the top-selling single of the 1960s there by any artist.", soloist: "Paul McCartney and John Lennon", key: "G", sharp: false, flat: false, minor: false, minutes: 2, seconds: 22, owner: group.id},

{name: "Come Together", description: "In July 1969, during sessions for the Beatles' album Abbey Road, Lennon used the phrase 'come together' from the Leary campaign song to compose a new song for the album", soloist: "John Lennon", key: "D", sharp: false, flat: false, minor: true, minutes: 4, seconds: 19, owner: group.id},

{name: "Yesterday", description: "A melancholy ballad about the break-up of a relationship. The singer nostalgically laments for yesterday when he and his love were together, before she left because of something he said.", soloist: "Paul McCartney", key: "F", sharp: false, flat: false, minor: false, minutes: 2, seconds: 3, owner: group.id},

{name: "I Want to Hold Your Hand", soloist: "Paul McCartney and John Lennon", key: "G", sharp: false, flat: false, minor: false, minutes: 2, seconds: 27, owner: group.id},

{name: "Ticket to Ride", description: "McCartney said the title referred to 'a British Railways ticket to the town of Ryde on the Isle of Wight', and Lennon said it described cards indicating a clean bill of health carried by Hamburg prostitutes in the 1960s.", soloist: "John Lennon", key: "A", sharp: false, flat: false, minor: false, minutes: 3, seconds: 10, owner: group.id},

{name: "Yellow Submarine", description: "Written as a children's song by Paul McCartney and John Lennon, it was drummer Ringo Starr's vocal spot on the album. The single went to number one on charts in the United Kingdom and several other European countries, and in Australia, Canada and New Zealand. It won an Ivor Novello Award for the highest certified sales of any single written by a British songwriter and issued in the UK in 1966. In the US, the song peaked at number two on the Billboard Hot 100 chart.", soloist: "Ringo Starr", key: "F", sharp: true, flat: false, minor: false, minutes: 2, seconds: 38, owner: group.id},

{name: "Help!", description: 'During an interview with Playboy in 1980, Lennon recounted: "The whole Beatles thing was just beyond comprehension. I was subconsciously crying out for help".', soloist: "John Lennon", key: "A", sharp: false, flat: false, minor: false, minutes: 2, seconds: 19, owner: group.id}





## User Stories

### MVP

- As a user I want the ability to make an account
- As a user I want the ability to log in
- As a user I want the ability to log out
- As a user I want the ability to create a group
- As a user I want the ability to add members to my group
- As a user I want the ability to view a list of the groups I am in
- As a user I want the ability to create an object for a song that my group performs
- As a user I want the ability to view all of the songs my group knows
- As a user I want the ability to view lead vocalist/soloist for each song
- As a user I want the ability to view the length of a song
- As a user I want the ability to delete songs
- As a user I want the ability to edit songs

### Completed Stretch Goals
- As a user I want the ability to create setlists of songs within one group
- As a user I want the ability to view all of my setlists
- As a user I want the ability to delete setlists
- As a user I want the ability to edit setlists
- As a user I want the ability to see how much time a set will take to perform
- As a user I want the ability to rearrange setlist order

### Future Goals
- As a user I want the ability to add notes for speaking between songs in setlist
- As a user I want the ability to search for songs and setlists by keywords
- As a user I want the ability to see songs in setlist color-coded by tempo or other category



## Wireframes

### MVP
![home page, signup, login](/images/wireframes/homeAndLogin.png)
![groups views](/images/wireframes/groupsView.png)
![songs view](/images/wireframes/SongsView.png)

### Stretch Goals
![setlist and new patter views](/images/wireframes/SetlistAndPatterViews.png)

## Entity Relationships

### MVP
![Entity Relationships](/images/wireframes/MVPrelationships.png)

### Stretch Goals
![Entity Relationships](/images/wireframes/stretchRelationships.png)

## Seed Data
I will seed the database with a user, then using that user ID as owner, I'll seed a group and all of their songs, and a set list if the stretch goals are met.


## Schedule for the Week

#### Monday: Schema and models, basic setup of files, installations
#### Tuesday: Controllers
#### Wednesday: Views
#### Thursday: start styling / reassess how far I've gotten and reduce or add details, plan for Friday
#### Friday: execute new plan
#### Sunday: finishing details / submit project. 
