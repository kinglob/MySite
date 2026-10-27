const gitview = "gitview"
async function UpdateGitView() {
	const gitviewquery = await fetch("/api/gitview/v1")
	const response = await gitviewquery.text()

	console.log("Got gitviewquery response:", response)
}

UpdateGitView()
