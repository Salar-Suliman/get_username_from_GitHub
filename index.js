class Repository {
  constructor (username, listElement){
   // our DOM Nodes
    this.username = username;
    this.listElement = listElement;
    this.repositories = fetch(`https://api.github.com/users/${this.username}/repos`);// promise from fetch

    // calling render here is save as in the render function we wait for
    // this.repositories to be resolved
    //console.log(this.repositories)
    this.render();

  }
    
 
  render() {
    this.repositories
      .then(data => data.json())
      .then(data => {
        if (data.status >= 400) {
          this.failureTemplate(data);
        } else {
          //  status code is smaller than 400 display via successTemplate
         
          this.listElement.innerHTML = this.successTemplate(data);
        }
      })
      .catch(err => {
         // we catch here if fetch didn't work
        this.failureTemplate('fetch did not work');
      })
  };
// we create a new instance on every click
  successTemplate(data) {
    return `
      <h2>${this.username}</h2>
      <ul>
        ${data.map(item => {
            return `<li>${item.name}</li>`
          }).join('')}
      </ul>
    `
  }

  failureTemplate(data) {
    return new Error('No repos for that user');
  }
}



const searchButton = document.getElementById('searchButton');


searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const searchInput = document.getElementById('searchInput').value;
  return new Repository(searchInput, document.getElementById('listuser'));
});
