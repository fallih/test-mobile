let page = 0;
let loading = false;

document.addEventListener("DOMContentLoaded", () => {
    applyTheme(localStorage.getItem("theme") || "system");

    document.getElementById("themeSelector").addEventListener("change", e => {
        localStorage.setItem("theme", e.target.value);
        applyTheme(e.target.value);
    });

    loadPost();

    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
            loadPost();
        }
    });

    document.getElementById("filterDate").addEventListener("change", e => {
        const date = e.target.value;

        document.getElementById("postContainer").innerHTML ="";
        page = 1;
        loadPost(date);
    });
});

function applyTheme(theme) {
    if (theme === "system") {
        document.documentElement.removeAttribute("data-theme", theme);
    }else{
        document.documentElement.setAttribute("data-theme", theme)
    }
}

async function loadPost(date = "") {
    loading = true;

    document.getElementById("loading").style.display = "block";

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`);
   const posts = await res.json();

posts.forEach(post => {
    if (!document.getElementById(`post-${post.id}`)) {
        const div = document.createElement("div");
        div.id = `post-${post.id}`;
        div.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        document.getElementById("postContainer").appendChild(div);
    }
});


    page++;
    loading = false;

    document.getElementById("loading").style.display = "none";
}
