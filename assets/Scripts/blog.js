const blogPosts = [
    {
        title: "My First Blog Post",
        date: "April 26, 2025",
        content: "Welcome to my portfolio blog! Here I'll share coding tips, design ideas, and updates on my personal projects."
    },
    {
        title: "Building My First Website",
        date: "March 15, 2025",
        content: "I learned so much creating my first full website from scratch. Flexbox is life-changing!"
    },
    {
        title: "Favorite JavaScript Tricks",
        date: "February 28, 2025",
        content: "Here are a few of my favorite JS tricks: array destructuring, optional chaining, template literals, and more."
    }
];

function displayBlogPosts() {
    const blogContainer = document.getElementById('blogContainer');
    let blogHTML = '';

    blogPosts.forEach(post => {
        blogHTML += `
        <article class="blog-post">
            <h2>${post.title}</h2>
            <p class="date">${post.date}</p>
            <p>${post.content}</p>
        </article>
        `;
    });

    blogContainer.innerHTML = blogHTML;
}

// Run when page loads
displayBlogPosts();