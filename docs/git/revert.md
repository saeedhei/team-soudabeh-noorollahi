
# How to Revert a Merged Pull Request on GitHub

Sometimes, a Pull Request (PR) gets merged into the `main` branch, but later it turns out that those changes should be undone. Fortunately, GitHub and Git provide straightforward ways to revert merged PRs safely.

---

## When Should You Revert a PR?

- The PR introduced bugs or broke existing functionality.
- The changes no longer align with product goals.
- A better implementation is planned.
- You merged it accidentally or prematurely.

---

## Method 1: Using GitHub's Revert Button

If the PR has already been merged:

1. Go to the merged Pull Request page on GitHub.
2. Click the **"Revert"** button (available only for merged PRs).
3. GitHub will automatically create a **new PR** that undoes the changes from the original PR.
4. Submit and merge this new PR like usual.

> This is the safest and cleanest method — no command line needed.

---

## Method 2: Reverting via Git Command Line

If you prefer doing it locally or need more control:

### Revert a single commit (the PR was a single commit):

```
git revert <commit-hash>
git push origin main
```

### Revert multiple commits (e.g. a PR with several commits):

```
git revert --no-commit <oldest-commit>^..<newest-commit>
git commit -m "Revert PR #XX: Description of change"
git push origin main
```

You can find commit hashes using `git log` or from the PR page on GitHub.

---

## Syncing Your Local Branch With the Reverted Changes

If someone else reverted the PR and merged it into `main`, and your local `main` is outdated:

### Step-by-step:

```
git checkout main
git pull origin main
```

If you're working on a fork and the upstream repo had the revert:

```
git remote add upstream https://github.com/ORIGINAL_USER/REPO_NAME.git
git fetch upstream
git checkout main
git merge upstream/main
```

Or to force-reset your main to upstream:

```
git reset --hard upstream/main
```

> ⚠️ Be cautious! This will discard all local changes on the `main` branch.

---

## Best Practices

- Always double-check your PR before merging.
- Use descriptive PR titles and commit messages.
- Prefer `revert` over `force-push` when undoing changes — it keeps history clean.
- Communicate with your team when reverting shared work.

---

## References

- GitHub Docs: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/reverting-a-pull-request
- Git Docs: https://git-scm.com/docs/git-revert


