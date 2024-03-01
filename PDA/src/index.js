let shaneFetish = document.getElementById('shaneFetish') // button

shaneFetish.addEventListener("click", evt => {
    let shaneDawson = document.getElementById('shaneDawson') // Output div

    fetch('https://api.thecatapi.com/v1/images/search?')
        .then(res => res.json())
        .then(cats => {
            cats.forEach(cat => {
                shaneDawson.innerHTML = `<h3> cat </h3>
                    <img src="${cat.url}" alt="cat" />`
            });
        })

})
