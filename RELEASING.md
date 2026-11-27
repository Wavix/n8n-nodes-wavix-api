# Releasing

How to publish a new version of `n8n-nodes-wavix-api`.

## When to release

Release when there is a set of changes a user can notice, not after every merge.

Each release costs our users something:

- n8n verifies each npm version separately. n8n Cloud users see a new version only after n8n approves it.
- Updates are manual. An instance owner or admin updates the node in **Settings** → **Community nodes**.
- n8n shows only the version number. The changelog and the GitHub release are where users read what changed.

A merge to `main` does not publish. Only a version tag does.

## Versions

The package follows [semantic versioning](https://semver.org/):

- **Patch** (`0.2.1`): a fix, with no change to fields or output.
- **Minor** (`0.3.0`): a new operation or field. Saved workflows keep working.
- **Major** (`1.0.0`): a change that can break a saved workflow. Avoid it: put the new behaviour behind a new node version instead, so workflows saved on the old version keep running.

Tags have no `v` prefix: `0.2.0`, not `v0.2.0`.

## Before you release

1. Every change for the release is merged to `main`, and CI passes.
2. `README.md` matches what the node does, including the version history.
3. Send SMS and Get SMS pass an end-to-end test on a local n8n instance.
4. A workflow saved on the previous version still runs.

## Release steps

Run these on an up-to-date `main` with a clean working tree. Replace `0.2.0` with the new version.

1. Set the version:

   ```bash
   npm version 0.2.0 --no-git-tag-version
   ```

2. In `CHANGELOG.md`, move the entries under **Unreleased** to a new `0.2.0` section with today's date.

3. Commit, tag and push:

   ```bash
   git commit -am "version: update to 0.2.0"
   git tag 0.2.0
   git push origin main 0.2.0
   ```

4. The tag starts the **Publish to NPM** workflow. It checks that the tag matches `package.json`, runs lint and build, and publishes to npm with provenance. Check that the run passes.

5. Create the GitHub release from the tag, with the changelog section as its notes:

   ```bash
   gh release create 0.2.0 --title 0.2.0 --notes "<the 0.2.0 section of CHANGELOG.md>"
   ```

Don't use `npm run release` yet. With the installed `@n8n/node-cli` (0.20.0) it also publishes from your machine, without provenance. n8n requires publishing from GitHub Actions with provenance.

## After the release

1. Check that the version on [npm](https://www.npmjs.com/package/n8n-nodes-wavix-api) shows a provenance statement.
2. In the n8n Creator Portal, check that the new version is in review, and follow it until n8n approves it.
3. Update the node on an n8n Cloud instance and run Send SMS and Get SMS.

## Changelog

Add a line to **Unreleased** in `CHANGELOG.md` in the same pull request as the change. Write it for a person who uses the node: say what changed for them, not which files changed. A change users can't notice, such as a CI fix, needs no entry.

## If a publish fails

npm never accepts the same version twice. If the workflow fails before the publish step, fix the problem, delete the tag, and tag again. If it fails after npm accepted the version, release the fix as the next patch version.
