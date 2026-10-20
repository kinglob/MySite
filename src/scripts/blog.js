async function LoadBlogPage() {
  const init_response = await fetch("/api/blog/v1?isinit=1");

  const initresponsetext = await init_response.text();
  console.log(`Init Response Text: ${initresponsetext}`);
  console.log(`Init Response Status: ${init_response.status}`);

  var initresult
  try {
    initresult = JSON.parse(initresponsetext);
  } catch (e) {
    console.error("Server returned invalid JSON:", e);
  };


  if (!initresult.success) console.error("Failed to init!", initresult);


  var post_ids = initresult.data;
  const maxcallcount = 10;

  var postjsons = {};

  for (const id of post_ids) {
    const args = `?ids=${id}`;
    const post_response = await fetch(`/api/blog/v1${args}`);
    const postresponsetext = await post_response.text();
    var postresult;

    try {
      postresult = JSON.parse(postresponsetext);
    } catch (e) {
      console.error("Server sent invalid post JSON:", e);
    };

    if (!postresult.success) console.error("Failed to get post:", postresult);

    for (const postjson of postresult.data) {
      postjsons[postjson.postnum] = postjson;
      console.log(`Recieved post ${postjson.postnum}`)
    };
  }

  return postjsons
}

LoadBlogPage().then(postjsons => {
  console.log(`Recieved all post JSONs: ${postjsons}`);
	const blogpost_container = document.getElementById("blog_posts");

	for (const postjson of Object.values(postjsons)) {
    const postdiv = document.createElement("div");
    postdiv.id = "post";
    
    const title = document.createElement("h1");
    title.textContent = postjson.title;
    
    const body = document.createElement("p");
    body.textContent = postjson.body;

    postdiv.appendChild(title);
    postdiv.appendChild(body);
    blogpost_container.appendChild(postdiv);
    console.log(`Rendered post ${postjson.postnum}`);
  };
});

// blog posts have:
// - "title"
// - "body"
// - "postnum"
// render postjsons blog.html later
