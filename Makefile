.PHONY: default jshint s3sync

default:
	@echo "No default rule"

jshint:
	find {.,demo} -name "*.js" -maxdepth 1 -exec jshint {} \;	

s3:
	s3cmd sync -P --delete-removed --exclude={.git/*,node_modules/*} . s3://www.jsvine.com/vinejs/

vine.min.js: vine.js
	uglifyjs < vine.js > vine.min.js
