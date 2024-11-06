+++
date = '2024-11-06T07:27:06+05:00'
draft = false
title = 'How to configure Git'

tags = ["github", "signatures"]
categories = ["tutorials", "git"]

[cover]
image = "/assets/images/git_logo.jpg"
alt = "Git logo"
relative = false
+++

# About Git and Remote Code Repositories

Git was designed to enable versioning of the source code. You can use it to store and modify your code reliably in a local or a remote repository. It allows you to collaborate with others and revert changes if you need to do so. The main advantage of using Git it shows how the source code changed and the descriptions and comments left by developers.

Remote code repositories such as Github and GitLab allow you to conveniently share your code with others. Depending on your needs you might want to verify your identity you create new commits. Both Github and GitLab allow you to do so by utilizing signed commits. We will focus on Github in this article.

# About Verified/Signed commits

By default, whenever you push a commit to a remote Github repository it does not know a true identity attached to the commit. This might, potentially, make it harder for other users and your collaborators verify your identity. 

![Unverified commits](/assets/images/git_unverified_commits.png)

Other changes applied through the Github's web interface and pull requests are verified using a verified signature managed by Github.

![Github signed commit](/assets/images/github_signed_commit.png)

Depending on your needs you might want to use your own signature to verify your commits and other changes such as merge requests.

![Git verified commits](/assets/images/git_verified_commits.png)

This can be configured by notifying Github about the *identity* or a *GPG key* attached to your commits.

![Git user signed commit](/assets/images/git_user_signed_commit.png)

[**Learn more**](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)