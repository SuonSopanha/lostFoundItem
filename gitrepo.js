const { Octokit } = require('octokit');

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

async function uploadImageToGitHubRepo({ owner, repo, path, message, content }) {
  try {
    // Upload image to a GitHub repository
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content,
      encoding: 'base64'
    });

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Error uploading image');
  }
}

module.exports = { uploadImageToGitHubRepo };