/* Step 1: using axios, send a GET request to the following URL
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

// axios.get('https://api.github.com/users/YeetOrBeYate')
//   .then((res) => {
//     console.log(res);
//   })

/* Step 2: Inspect and study the data coming back, this is YOUR
   github info! You will need to understand the structure of this
   data in order to use it to build your component function

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function,
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either
          follow this link in your browser https://api.github.com/users/<Your github name>/followers
          , manually find some other users' github handles, or use the list found
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.

          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function makePerson(person){
  const card = document.createElement('div'),
        image = document.createElement('img'),
        cardInfo = document.createElement('div'),
        name = document.createElement('h3'),
        userName = document.createElement('p'),
        location = document.createElement('p'),
        profile = document.createElement('p'),
          address = document.createElement('a'),
        followers = document.createElement('p'),
        following = document.createElement('p'),
        bio = document.createElement('p'),
        calender = document.createElement('div');
//adding classes
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('username');
  calender.classList.add('calender');
//adding info
  image.src = person.avatar_url;
  name.innerText = person.name;
  userName.innerText = person.login;
  location.innerText = person.location;
  address.innerText = person.html_url;
  address.href = person.html_url;
  bio.innerText = person.bio;
  followers.innerText = `Followers: ${person.followers}`;
  following.innerText = `Following: ${person.following}`;
  calender.innerText = `${person.login}`;
  calender.id = `card-${person.login}`;
  
//appending
  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  cardInfo.appendChild(calender);
  profile.appendChild(address);
  return card;
}
const entry = document.querySelector('.cards');

axios.get('https://api.github.com/users/YeetOrBeYate')
  .then((res) => {
    let kyle = res;
    entry.appendChild(makePerson(kyle.data))
    new GitHubCalendar(document.getElementById(`card-${res.data.login}`), res.data.login, {responsive: true});
  console.log(res.data.login);
    

    //here im making another api call to kyle's followers
    axios.get(kyle.data.followers_url)
    .then((res)=>{
      let people = res;

      //here I'm just repeating the first api call for the array of followers I now have and am appending them after Kyle
      people.data.forEach((fr)=>{
          axios.get(`https://api.github.com/users/${fr.login}`)
            .then((res)=>{
              entry.appendChild(makePerson(res.data))
              new GitHubCalendar(document.getElementById(`card-${res.data.login}`), res.data.login, {responsive: true});
              
            })
        })
    })
})

const yeet = document.querySelectorAll('.calender');
console.log(yeet);







/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
