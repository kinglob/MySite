
const init_response = await fetch("/api/blog/v1?isinit=1");
const result = await init_response.json();
if (!result.success) console.error("Failed to init!");


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

// render postjsons blog.html later