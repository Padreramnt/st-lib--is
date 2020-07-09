# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.4]
### Added
- partial number string guard
- export all regexp constants

### Changed
- add number regexp groups for sign, integer, fractonal, base

## [1.0.3]

rollupjs treeshake does not remove unused IIFE calculated constants

### Changed
- `isBrowser` now is the function
- `isNodeJS` now is the function

## [1.0.2]

### Added
- added package script to verify code before updating package version
## Fixed
- readme for `isOneOf`
- readme for `isEqualTo`

## [1.0.1]

### Added
- `and` combinator
- `or` combinator
- `isBrowser` constant
- `isNodeJS` constant

### Fixed
- `isOneOf` type declaration
