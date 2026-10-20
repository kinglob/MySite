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
  post_ids.forEach(async (id) => {
    const args = `?ids=${id}`
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
  })

  return postjsons
}

LoadBlogPage().then((postjsons) => {
  console.log(`Recieved all post jsons! | ${postjsons}`);
	const blogpost_container = document.getElementById("blog_posts");

	for (const postjson of Object.values(postjsons)) {};
});

// blog posts have:
// - "title"
// - "body"
// - "potsnum"
// render postjsons blog.html later
