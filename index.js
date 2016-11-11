

function getRepositories() {
  event.preventDefault()
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)

  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>' + '<li> - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>' ).join('')}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {

  const name = el.dataset.repo
  const username = document.getElementById("username").value

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);

  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits')
  req.send()
}

function displayCommits(event, data){

  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.committer.name + '</strong>' +commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repo
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`)
  req.send()
}

function displayBranches(event, data){
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(b => `<li>${b.name}</li>`).join('')}</ul>`
  document.getElementById("details").innerHTML = branchList
}
