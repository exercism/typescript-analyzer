# Changelog

## 0.3.0

Sync with `javascript-analyzer`

- Updated to v3 specification
- Fixed Dockerfile
- Use @exercism/static-analysis
- Add workflows
- Add prettier
- Add plugin/import for eslint
- Reimplement analyzers using new library
- Use .meta/config.json when its available
- Change to compile using babel
- Change relative paths to module paths for cleaner imports
- Change analyzer folders to include practice/concept
- Add e2e test for CI

## 0.2.0

Sync with `javascript-analyzer`

- Per https://github.com/exercism/automated-mentoring-support/issues/53, merge "approve_as_optimal" and "approve_with_comment" into a single status "approve", and rename the "disapprove_with_comment" status to "disapprove".
- Switch to template output by default (changing the run flag from templates to noTemplates).
- Change `--noTemplates` output to use `%{tag}` for tagged template variables, instead of `%<tag>s`.
- Add `--pretty` output to pretty print the generated output, off by default.
- Add linting

## 0.1.1

Fixes the build and prepare step of the Docker-based image

## 0.1.0

:baby: initial release
