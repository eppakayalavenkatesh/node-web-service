console.log('javascript file is loading');

fetch("https://jsonplaceholder.typicode.com/users").then((response) => {
    // console.log(response.json());
    response.json().then((data) => {
        console.log(data);
    })
})

fetch("http://localhost:3000/products?id=#").then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log('please check the url');
        }else{
            console.log(data.user);
        }
    })
})

const formObj = document.querySelector('form')
const Formid = document.querySelector('input')

formObj.addEventListener('click' , (event) => {
    console.log('event is called');
    event.preventDefault()
    fetch("http://localhost:3000/products?id=" + Formid.value ).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log("please check the url", data.error);
          document.getElementById('title-user').textContent = data.error
        } else {
          console.log(data.user);
          document.getElementById("title-user").textContent = data.user.title
        }
      });
    });
})



