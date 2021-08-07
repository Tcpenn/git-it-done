var getUserRepos = function(user) {
  //forma the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make request to the url
    fetch(apiUrl).then(function(response){
      response.json().then(function(data) {
        console.log(data);
      
    });
  });
};
  getUserRepos("microsoft");
  