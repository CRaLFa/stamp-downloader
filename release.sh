#!/bin/bash

set -eu

main () {
	(( $# < 1 )) && {
		echo "Usage: $(basename "$0") <version>" >&2
		return
	}
	cd "$(dirname "$(realpath "$0")")"
	local version="$1"
	local zip_name="stamp-downloader-${version}.zip"
	(cd dist/ && zip -r "../$zip_name" .)
	gh release create "v${version}" "$zip_name" --generate-notes
}

main "$@"
