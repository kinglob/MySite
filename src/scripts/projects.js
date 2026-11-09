// Project jsons are structured as such:
// - projectnum (unique number of the project)
// - title 
// - desc
// - img (blob img stored as base64 string in json)

const projects = document.getElementById("projects")

function CreatePost(title, desc, img) {
	const project_post = document.createElement("div")
	project_post.classList.add("project")

	const title_h = document.createElement("h1")
	title_h.textContent = title
	project_post.appendChild(title_h)

	const img_img = document.createElement("img")
	img_img.src = img
	project_post.appendChild(img_img)

	const desc_p = document.createElement("p")
	desc_p.textContent = desc
	project_post.appendChild(desc_p)
}

async function QueryProjects() {
	const init_response = await fetch("/api/blog/v1?isinit=1");
	const init_responsetext = await init_response.text();

	var init_result;
	try {
		init_result = JSON.parse(init_responsetext);
	} catch (e) {
		console.error("Server returned invalid JSON:", e);
	}

	if (!init_result.success) console.error("Failed to init:", init_result)

	var project_ids = init_result.data;

	var projectjsons = {};

	for (const id of project_ids) {
		const args = `?ids=${id}`;

		const project_response = await fetch(`/api/blog/v1${args}`);
		const project_responsetext = await project_response.text();

		var project_result;
		try {
			project_result = JSON.parse(project_responsetext);
		} catch (e) {
			console.error("Server sent invalid project JSON:", e);
		}

		if (!project_result.success) console.error("Failed to get project:", e);

		for (const projectjson of project_result.data) {
			projectjsons[projectjson.projectnum] = projectjson;
			console.log(`Recieved post ${projectjson.projectnum}`)
		}
	}
}

QueryProjects().then(projectjsons => {
	// create little project grid thing
	// that you can click on
	//
	// upon clicking on it an entirely
	// new page should be made via JS in
	// this script thing	
	for (const pjson of Object.values(projectjsons)) {
		CreatePost(pjson.title, pjson.desc, pjson.img)
	}
})
