async function LoadBlogPage() {
  const init_response = await fetch("/api/blog/v1?isinit=1");

  const responsetext = await init_response.text();
  console.log(`Init Response Text: ${responsetext}`);
  console.log(`Init Response Status: ${init_response.status}`);

  var result
  try {
    result = JSON.parse(responsetext);
  } catch (e) {
    console.error("Server returned invalid JSON:", e);
  };


  if (!result.success) {
    console.error("Failed to init!", result);
  };


  var post_ids = result.data;
  const maxcallcount = 10;

  var postjsons = {};
  post_ids.forEach(async (id) => {
    const args = `?ids=${postsrequested}`
    const post = await fetch(`/api/blog/v1${args}`);
    const result = await post.json();
    if (!result.success) return;
      
    for (var i = 0; i < result.data.length; i++) {
      postjsons[result.data[i].postnum] = result.data[i];
      console.log(`Recieved post ${result.data[i].postnum}`)
    };
  })

  return postjsons
}

LoadBlogPage().then((postjsons) => {
  console.log(`Recieved all post jsons! | ${postjsons}`);
	const blogpost_container = document.getElementById("blog_posts");

	for (const postjson of Object.values(postjson)) {};
});

// blog posts have:
// - "title"
// - "body"
// - "potsnum"
// render postjsons blog.html later
