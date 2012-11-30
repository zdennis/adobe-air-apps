# cli-notify

cli-notify (command line notify) is a command line utility that can be used to send you an on-screen notification.
It allows you to set the text and the color of the text.

Example:

    cli-notify --text="Tests passed!" --color="#00FF00"

## Running in development

This is an Adobe AIR application that is being developed using [Middleman](http://middlemanapp.com/). At minimum you need to have Ruby, RubyGems, and Bundler installed. With that you can run `bundle` in the project root to make sure you have middleman and its dependencies all set up.

Next, it's expected that you have the Adobe AIR SDK downloaded and set up so the `adl` command is in your PATH.

With Middleman and AIR SDK ready to go you can run `bin/run` to run the application in development. This will use middleman to build the `source/` directory into `build/` and then will use `adl` to launch the application.

`bin/run` needs to be run from the project root.

## Building

`bin/package-app` can be used to package the Adobe AIR app as a standalone Mac application which doesn't require any one to have Adobe AIR installed.

It requires that you have a certificate file with the file extension `.pfx` in the project root. It will attempt to sign the application with that certificate. For more information on creating a self-signed certificate see http://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7f74.html

`bin/package-app` needs to be run from the project root.