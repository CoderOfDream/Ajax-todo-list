const url = 'http://localhost:3000/';

const headerType = {
    'Content-Type': 'application/json'
}
const wrap = document.querySelector('.wrap-btn');
const reset = document.querySelector('.reset');

let currentId = null;
const setEditPostState = post => {

    wrap.style.display = 'block';
    author.value = post.author;
    currentId = post.id;
}

function checkFunc(id, check, checkBox, author, sec, minutes, hour) {


    fetch(`${url}posts/${id}`, {
        method: 'PUT',
        headers: headerType,
        body: JSON.stringify({
            author: author,
            check: check,
            sec: sec,
            minutes: minutes,
            hour: hour
        })
    })

        .then(() => {
            getPosts();
            reset.click();
        })
}

function updatePost(author, check, id, sec, minutes, hour) {
    if (id) {

        fetch(`${url}posts/${id}`, {
            method: 'PUT',
            headers: headerType,
            body: JSON.stringify({
                author: author,
                check: check,
                sec: sec,
                minutes: minutes,
                hour: hour
            })
        })

            .then(() => {
                getPosts();
                reset.click();
            })
    }
}

function getPosts() {

    fetch(`${url}posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

        .then(json => json.json())
        .then(posts => {
            const wrapper = document.querySelector('#post-wrapper');
            wrapper.innerHTML = '';

            posts.reverse().forEach(post => {
                const newPost = document.createElement('div');
                newPost.classList.add('newPost');

                const textWrapper = document.createElement('div');
                textWrapper.classList.add('textWrapper');
                newPost.appendChild(textWrapper);

                const checkBox = document.createElement('input');
                checkBox.type = 'checkbox';
                textWrapper.appendChild(checkBox);



                const postContent = document.createElement('p');
                postContent.innerHTML = `${post.id}) ${post.author}`;
                textWrapper.appendChild(postContent);

                const dateText = document.createElement('p');
                dateText.innerHTML = `${post.hour}:${post.minutes}:${post.sec}`;
                dateText.style.color = 'grey';
                textWrapper.appendChild(dateText);

                if (post.check) {
                    checkBox.checked = false;
                    post.check = false;
                    checkBox.onclick = () => checkFunc(post.id, post.check, checkBox, post
                        .author, post.sec, post.minutes, post.hour);

                } else {
                    checkBox.checked = true;
                    post.check = true;
                    postContent.style.textDecoration = 'line-through';
                    checkBox.onclick = () => checkFunc(post.id, post.check, checkBox, post
                        .author, post.sec, post.minutes, post.hour);
                }

                const btnWrapper = document.createElement('div');
                btnWrapper.classList.add('btnWrapper');
                newPost.appendChild(btnWrapper);

                const deleteButton = document.createElement('button');
                deleteButton.setAttribute('type', 'button');
                deleteButton.onclick = () => deletePost(post.id);
                deleteButton.innerHTML = 'Delete';
                deleteButton.classList.add('btn');
                deleteButton.classList.add('btn-danger');
                btnWrapper.appendChild(deleteButton);

                const editButton = document.createElement('button');
                editButton.innerHTML = 'Edit';
                editButton.classList.add('btn');
                editButton.classList.add('btn-info');
                editButton.onclick = () => setEditPostState(post);
                btnWrapper.appendChild(editButton);

                wrapper.appendChild(newPost);
            });
        })

    // const xhr = new XMLHttpRequest();

    // xhr.open('GET', 'http://localhost:3000/posts');
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.send();

    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState !== 4) return;
    //     if (xhr.status !== 200) {
    //         alert(xhr.status);
    //     } else {

    //         const posts = JSON.parse(xhr.responseText);
    // const wrapper = document.querySelector('#post-wrapper');
    // wrapper.innerHTML = '';

    // posts.reverse().forEach(post => {
    //     const newPost = document.createElement('div');
    //     newPost.classList.add('newPost');

    //     const textWrapper = document.createElement('div');
    //     textWrapper.classList.add('textWrapper');
    //     newPost.appendChild(textWrapper);

    //     const checkBox = document.createElement('input');
    //     checkBox.type = 'checkbox';
    //     textWrapper.appendChild(checkBox);



    //     const postContent = document.createElement('p');
    //     postContent.innerHTML = `${post.id}) ${post.author}`;
    //     textWrapper.appendChild(postContent);

    //     const dateText = document.createElement('p');
    //     dateText.innerHTML = `${post.hour}:${post.minutes}:${post.sec}`;
    //     dateText.style.color = 'grey';
    //     textWrapper.appendChild(dateText);

    //     if (post.check) {
    //         checkBox.checked = false;
    //             post.check = false;
    //             checkBox.onclick = () => checkFunc(post.id, post.check, checkBox, post.author,post.sec,post.minutes, post.hour);

    //         } else {
    //             checkBox.checked = true;
    //             post.check = true;
    //             postContent.style.textDecoration = 'line-through';
    //             checkBox.onclick = () => checkFunc(post.id, post.check, checkBox, post.author, post.sec,post.minutes, post.hour);
    //         }
    //     console.log(post.check);


    //     const btnWrapper = document.createElement('div');
    //     btnWrapper.classList.add('btnWrapper');
    //     newPost.appendChild(btnWrapper);

    //     const deleteButton = document.createElement('button');
    //     deleteButton.setAttribute('type', 'button');
    //     deleteButton.onclick = () => deletePost(post.id);
    //     deleteButton.innerHTML = 'Delete';
    //     deleteButton.classList.add('btn');
    //     deleteButton.classList.add('btn-danger');
    //     btnWrapper.appendChild(deleteButton);

    //     const editButton = document.createElement('button');
    //     editButton.innerHTML = 'Edit';
    //     editButton.classList.add('btn');
    //     editButton.classList.add('btn-info');
    //     editButton.onclick = () => setEditPostState(post);
    //     btnWrapper.appendChild(editButton);
    //     wrapper.appendChild(newPost);
    // });
    // }
    // }

}

const isValid = (author) => Boolean(author);

function addPosts(author, check, sec, minutes, hour) {
    if (isValid(author)) {

        fetch(`${url}posts`, {
            method: 'POST',
            headers: headerType,
            body: JSON.stringify({
                author: author,
                check: check,
                sec: sec,
                minutes: minutes,
                hour: hour
            })
        })

            .then(() => {
                getPosts();
                reset.click();
            })
    }
}

function deletePost(id) {

    fetch(`${url}posts/${id}`, {
        method: 'DELETE',
        headers: headerType,
    })

        .then(() => {
            getPosts();
        })
}

getPosts();

reset.onclick = () => {
    wrap.style.display = 'none';
    currendId = null;
}

form.onsubmit = function (event) {
    let check = true;
    let date = new Date(),
        sec = date.getSeconds();
    hour = date.getHours();
    minutes = date.getMinutes();

    event.preventDefault();
    if (wrap.style.display == 'block') {
        updatePost(author.value, check, currendId, sec, minutes, hour)
    } else {

        addPosts(author.value, check, sec, minutes, hour);
    }
}