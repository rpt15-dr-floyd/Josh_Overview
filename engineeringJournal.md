# Engineering Journal

## Tues Oct 1st

#### Adding CRUD operations POST
###### Edits in index.js in db folder:
- commented out Stephen's mongodb connection on lines 7-11 in index.js in db folder
- wrote new function called makeNewGameOverview that saves newGame info
- Oops, Stephen already had a POST function named 'save'
- Commented out my code, using Stephen's save function

#### Adding CRUD Operations Delete, Put
- db function called 'updateGameOverview' for PUT
- db function called 'deleteGameOverview' for DELETE

###### Edits in index.js in server folder:
- added CRUD OPERATIONs Delete, Put, Post in server index file
- Tested with Postman
- Works!

## Wed Oct 2nd
- Can't get sql to work
- Set up OH to fix sql 
- Decided with TM Alex it was a problem my bash_profile and that was affecting mysql command path
- Computer froze, just re-started
- My bash_profile file doesn't seem to be working? Can't use any commands now
- Now instead of just mysql command not working...no command will work...vim, cat, ls, cd...
- Terminal broken ): wat do
- Can't commit because vim command won't work
- Need to get on the road to Santa Barbara for job, will fix later

## Thurs Oct 3rd
- Using Lizzy's laptop now instead of my computer, will fix my terminal on my computer later (might have to reinstall MacOS?)
- Wish I commited more often ): 
- Re-doing my commits

Decided on Postgres - was easier to get working with commandline than sql
- Used https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/ to get Postgres installed (via homebrew)

Important commands to remember for later:
- to start instance of Postgres, ran command ```brew services start postgresql```
- default Postgres values: 
```port default: "5432", user default: "elizabethschmitt" ```

Postgres index.js setup
- import/require pg and assign to Pool. "pools" your data with ```const Pool = require('pg').Pool```
- 

Postgres functions
- saveToPostgres function saves gameInfo to postgres database table