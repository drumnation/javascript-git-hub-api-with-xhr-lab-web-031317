function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + r.owner.login + r.owner.url + r.html_url + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById("username").value
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  const username = document.getElementById("username").value
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/` + name + '/commits')
  req.send()
}

function displayCommits() {
  const commitsData = JSON.parse(this.responseText)
  const commitsList = `<ul>${commitsData.map(commit => '<li><strong>' + commit.commit.author.name + " " + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  const username = document.getElementById("username").value
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/` + name + '/branches')
}

function displayBranches() {
  const branchesData = JSON.parse(this.responseText)
  const branchesList = `<ul>${branchesData.map(branch => '<li><strong>' + branch.name + '</strong> - ' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
