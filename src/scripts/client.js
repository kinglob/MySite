const repo_name = "MySite"
const repo_owner = "kinglob"
async function GetCommitCount() {
	try {
		const url = `https://github.com/${repo_owner}/${repo_name}`
		const response_commits = await fetch(url + "/commits?per_page=1")

		if (!response_commits.ok) console.error("Failed with status:", response_commits.status);

		const linkHeader = response_commits.headers.get("link");
		if (!linkHeader) {
			const commits = await response_commits.json();
			return commits.length;
		}

		const match = linkHeader.match(/&page=(\d+)>;\s*rel="last"/);
		if (match) {
			return parseInt(match[1], 10);
		};
			
		return 0;
	} catch(e) {
		console.log("Failed to fetch commit count:", e);
		return 0;
	}
}

function UpdateGitView(commitcount, pullreqcount, currbranch) {
	/*
	const gitview_list = document.getElementById("gitview_list");

	const commit_label = document.createElement("p");
	commit_label.textContent = `Commits: {commitcount}`;

	gitview_list.appendChild(commit_label);
	*/
}

GetCommitCount().then(commitcount => {
	UpdateGitView(commitcount);
});
