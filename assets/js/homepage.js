var userFormEl = document.querySelector("#user-form");

var nameInputEl = document.querySelector("#username");

var repoContainerEl = document.querySelector("#repos-container");

var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
  event.preventDefault();

  var username = nameInputEl.value.trim();

  if(username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
  console.log(event);
};

var getUserRepos = function(user) {
  //form the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  var response = fetch(apiUrl)
  .then((response)=>{
    if (response.ok) {
    response.json().then((data)=>{
      displayRepos(data, user);
    });
  } else {
    alert("Error: GitHub User Not Found 404");
  }
})
.catch((error)=>{
  //This .catch() is chained with the end of the .end()
  alert("Unable to connect to GitHub");
});

};

let displayRepos = ((repos, searchTerm)=>{
  console.log(repos);
  console.log(searchTerm);

  //clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  //loop over repos
  for (var i = 0; i < repos.length; i++) {
    //format repo name
    let repoName = repos[i].owner.login + "/" + repos[i].name;

    //create a container for each repso
    let repoEl = document.createElement("div")
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    //create a span element to hold repo name
    let titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    //append container
    repoEl.appendChild(titleEl);

    //append container to the dom
    repoContainerEl.appendChild(repoEl);

    //create a status element 
    let statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    //check if current repo has issues or not 
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML = 
      "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    //append to container
    repoEl.appendChild(statusEl);

// check if api returned any repos
if (repos.length === 0) {
  repoContainerEl.textContent = "No repositories found.";
  return;
}
  }
});

userFormEl.addEventListener("submit", formSubmitHandler);

